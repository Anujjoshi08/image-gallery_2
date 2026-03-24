import { drawCelebrareWatermark } from "../utils/watermark.js";

self.onmessage = async (e) => {
  const url = e.data;

  const response = await fetch(url);
  const blob = await response.blob();

  const bitmap = await createImageBitmap(blob);

  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(bitmap, 0, 0);
  drawCelebrareWatermark(ctx, 20, 50);

  const result = await canvas.convertToBlob();

  self.postMessage(URL.createObjectURL(result));
};