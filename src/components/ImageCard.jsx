import { useEffect, useState } from "react";
import { getCachedImage, setCachedImage } from "../utils/imageCache";

export default function ImageCard({
  img,
  onClick,
  onSelect,
  onDownload,
  selected,
}) {
  const [src, setSrc] = useState(null);

  const imageUrl = `https://picsum.photos/id/${img.id}/300/200`;

  useEffect(() => {
    // ✅ Check cache first
    const cached = getCachedImage(img.id);

    if (cached) {
      setSrc(cached);
      return;
    }

    // ❌ Not cached → load image
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      setCachedImage(img.id, imageUrl); // store in cache
      setSrc(imageUrl);
    };
  }, [img.id, imageUrl]);

  return (
    <div className="relative border rounded overflow-hidden hover:shadow-lg transition">

      {/* Checkbox */}
      <input
        type="checkbox"
        checked={selected}
        onChange={onSelect}
        className="absolute top-2 left-2 z-10"
      />

      {/* Image */}
      {src ? (
        <img
          src={src}
          alt=""
          className="w-full h-50 object-cover cursor-pointer"
          onClick={onClick}
        />
      ) : (
        <div className="w-full h-50 flex items-center justify-center bg-gray-200 text-sm">
          Loading...
        </div>
      )}

      {/* Download */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDownload();
        }}
        className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-xs hover:bg-gray-800"
      >
        Download
      </button>
    </div>
  );
}