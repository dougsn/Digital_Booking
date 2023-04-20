import { X } from "@phosphor-icons/react";

export const MapModal = ({ local = "Brasil", id, visible, onClose }) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed hiden inset-0 bg-black bg-opacity-20 backdrop-blur-sm overflow-y-auto h-full w-full z-10"
      id={`mapmodal-${id}`} onClick={onClose}
    >
      <div className="absolute right-1 top-1">
        <button className="p-2 bg-green rounded" onClick={onClose}>
          <X size={32} fill="#fff" />
        </button>
      </div>

      <iframe
        src={`https://www.google.com/maps?q=${local}&z=${
          local === "Brasil" ? "5" : "14"
        }&output=embed`}
        style={{
          border: 0,
          width: "100%",
          marginTop: "10vh",
          height: "80vh",
          background: "white",
        }}
        allowFullScreen="true"
        loading="lazy"
        id="map"
        className="max-w-full"
      ></iframe>
    </div>
  );
};
