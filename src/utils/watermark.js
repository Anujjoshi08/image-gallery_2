export function drawCelebrareWatermark(ctx, x = 20, y = 50) {
  // Shared watermark drawer used by both main thread canvas and worker canvas.
  ctx.font = "40px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Celebrare", x, y);
}

export async function addWatermark(url) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;

  await new Promise(res => (img.onload = res));

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0, 0);
  drawCelebrareWatermark(ctx, 20, 50);

  return canvas.toDataURL("image/png");
}