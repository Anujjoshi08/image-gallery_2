export default function ImageCard({ img, onClick, onSelect, onDownload, selected }) {
  return (
    <div className="relative border rounded overflow-hidden">

      {/* Checkbox */}
      <input
        type="checkbox"
        checked={selected}
        onChange={onSelect}
        className="absolute top-2 left-2 z-10"
      />

      {/* Image */}
      <img
        src={`https://picsum.photos/id/${img.id}/300/200`}
        alt=""
        className="w-full h-50 object-cover cursor-pointer"
        onClick={onClick}
      />

      {/* Download */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDownload();
        }}
        className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-xs"
      >
        Download
      </button>
    </div>
  );
}