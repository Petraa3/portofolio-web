import * as ort from 'onnxruntime-web';

// Daftar 80 Label Resmi COCO Dataset YOLO
export const COCO_CLASSES = [
  'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat',
  'traffic light', 'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat',
  'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe', 'backpack',
  'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 'snowboard', 'sports ball',
  'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard', 'tennis racket',
  'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple',
  'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake',
  'chair', 'couch', 'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop',
  'mouse', 'remote', 'keyboard', 'cell phone', 'microwave', 'oven', 'toaster', 'sink',
  'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear', 'hair drier', 'toothbrush'
];

let session = null;
let isProcessing = false;

// Reusable offscreen canvas & Float32Array untuk mencegah GC lag/memory leak
const offscreenCanvas = document.createElement('canvas');
offscreenCanvas.width = 640;
offscreenCanvas.height = 640;
const offscreenCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });
const float32Data = new Float32Array(1 * 3 * 640 * 640);

export async function loadYoloModel(modelPath = '/models/best.onnx') {
  try {
    ort.env.wasm.numThreads = Math.min(4, navigator.hardwareConcurrency || 2);
    ort.env.wasm.simd = true;

    session = await ort.InferenceSession.create(modelPath, {
      executionProviders: ['webgl', 'wasm'],
      graphOptimizationLevel: 'all'
    });
    console.log('⚡ Model YOLO ONNX Ultra-Fast Ready!');
    return session;
  } catch (err) {
    console.warn('⚠️ WebGL fallback ke WASM CPU:', err);
    session = await ort.InferenceSession.create(modelPath, {
      executionProviders: ['wasm']
    });
    return session;
  }
}

/**
 * Preprocessing Gambar Frame (Format CHW Float32)
 */
function preprocessFast(imageSource) {
  offscreenCtx.drawImage(imageSource, 0, 0, 640, 640);
  const imgData = offscreenCtx.getImageData(0, 0, 640, 640);
  const data = imgData.data;

  const totalPixels = 640 * 640;
  for (let i = 0; i < totalPixels; i++) {
    float32Data[i] = data[i * 4] / 255.0;                   // Channel R
    float32Data[totalPixels + i] = data[i * 4 + 1] / 255.0;   // Channel G
    float32Data[totalPixels * 2 + i] = data[i * 4 + 2] / 255.0; // Channel B
  }

  return new ort.Tensor('float32', float32Data, [1, 3, 640, 640]);
}

/**
 * Menhitung Intersection over Union (IoU) antara dua box
 */
function calculateIoU(box1, box2) {
  const x1 = Math.max(box1.x, box2.x);
  const y1 = Math.max(box1.y, box2.y);
  const x2 = Math.min(box1.x + box1.w, box2.x + box2.w);
  const y2 = Math.min(box1.y + box1.h, box2.y + box2.h);

  const intersection = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  const area1 = box1.w * box1.h;
  const area2 = box2.w * box2.h;
  const union = area1 + area2 - intersection;

  return union === 0 ? 0 : intersection / union;
}

/**
 * Non-Maximum Suppression (NMS) untuk menghilangkan deteksi ganda
 */
function nonMaxSuppression(boxes, iouThreshold = 0.45) {
  boxes.sort((a, b) => b.score - a.score);
  const result = [];

  while (boxes.length > 0) {
    const current = boxes.shift();
    result.push(current);

    boxes = boxes.filter(box => {
      // Jika kelasnya sama, periksa nilai overlap (IoU)
      if (box.classId === current.classId) {
        return calculateIoU(current, box) < iouThreshold;
      }
      return true;
    });
  }

  return result;
}

export async function detectObjects(
  mediaElement, 
  canvasOverlay, 
  confidenceThreshold = 0.35,
  classLabels = COCO_CLASSES
) {
  if (!session || !mediaElement || !canvasOverlay) return;
  if (isProcessing) return; // Skip frame jika inferensi sebelumnya belum selesai
  
  isProcessing = true;

  try {
    const width = mediaElement.videoWidth || mediaElement.width;
    const height = mediaElement.videoHeight || mediaElement.height;

    if (!width || !height) return;

    if (canvasOverlay.width !== width || canvasOverlay.height !== height) {
      canvasOverlay.width = width;
      canvasOverlay.height = height;
    }

    const ctx = canvasOverlay.getContext('2d');

    const tensor = preprocessFast(mediaElement);
    const feeds = { [session.inputNames[0]]: tensor };

    const results = await session.run(feeds);
    const output = results[session.outputNames[0]].data;
    const outputDims = results[session.outputNames[0]].dims;

    ctx.clearRect(0, 0, width, height);

    const numChannels = outputDims[1]; 
    const numClasses = numChannels - 4; 
    const numAnchors = outputDims[2]; 

    let candidateBoxes = [];

    // Extract Kandidat Bounding Box
    for (let i = 0; i < numAnchors; i++) {
      let maxScore = 0;
      let classId = -1;

      for (let c = 0; c < numClasses; c++) {
        const score = output[(4 + c) * numAnchors + i];
        if (score > maxScore) {
          maxScore = score;
          classId = c;
        }
      }

      if (maxScore >= confidenceThreshold) {
        const cx = output[0 * numAnchors + i];
        const cy = output[1 * numAnchors + i];
        const w = output[2 * numAnchors + i];
        const h = output[3 * numAnchors + i];

        const x = ((cx - w / 2) / 640) * width;
        const y = ((cy - h / 2) / 640) * height;
        const boxW = (w / 640) * width;
        const boxH = (h / 640) * height;

        // Pemetaan nama kelas asli (misal: 'cell phone', 'scissors', 'person')
        const labelName = classLabels[classId] || `Object #${classId}`;

        candidateBoxes.push({ 
          x, y, 
          w: boxW, 
          h: boxH, 
          score: maxScore, 
          classId: classId,
          label: labelName 
        });
      }
    }

    // Eliminasi deteksi ganda menggunakan NMS
    const finalBoxes = nonMaxSuppression(candidateBoxes, 0.45);

    // Render Bounding Box & Label Nama Objek
    for (let i = 0; i < finalBoxes.length; i++) {
      const box = finalBoxes[i];
      
      // Bounding Box Frame
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.strokeRect(box.x, box.y, box.w, box.h);

      // Header Tag Label
      ctx.fillStyle = '#10b981';
      const labelText = `${box.label} ${(box.score * 100).toFixed(0)}%`;
      ctx.font = 'bold 12px monospace';
      const textWidth = ctx.measureText(labelText).width;

      ctx.fillRect(box.x, box.y > 22 ? box.y - 22 : box.y, textWidth + 10, 22);
      ctx.fillStyle = '#020617';
      ctx.fillText(labelText, box.x + 5, box.y > 22 ? box.y - 6 : box.y + 15);
    }

  } catch (e) {
    console.error("Inference error:", e);
  } finally {
    isProcessing = false;
  }
}