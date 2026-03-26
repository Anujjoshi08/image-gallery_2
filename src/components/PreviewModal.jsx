import { useEffect, useState } from "react";
import { getPreview, setPreview } from "../utils/previewImageCache";

export default function PreviewModal({ image, onClose }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (!image) return;

    // ✅ Check cache first
    const cached = getPreview(image.id);

    if (cached) {
      setSrc(cached); // load from cache
    } else {
      // ✅ Not cached → use original and store it
      setSrc(image.download_url);
      setPreview(image.id, image.download_url);
    }
  }, [image]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
      onClick={onClose}
    >
      <img
        src={src}
        alt="Preview"
        className="max-h-[90%] rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}