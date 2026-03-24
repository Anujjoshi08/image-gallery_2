export default function PreviewModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
      onClick={onClose}
    >
      <img
        src={image.download_url}
        alt="Preview"
        className="max-h-[90%]"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}