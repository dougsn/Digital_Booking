export function Location({
  local = "Brasil",
}) {
  return (
    <>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-dark-purple pl-11 pt-11">
          Localização
        </h1>
        <div className="flex items-center justify-center pt-4 px-11">
          <iframe
            src={`https://www.google.com/maps?q=${local}&z=${
              local === "Brasil" ? "5" : "14"
            }&output=embed`}
            style={{
              border: 0,
              width: "100%",
              background: "white",
            }}
            allowFullScreen={true}
            loading="lazy"
            id="map"
            className="max-w-full h-64 md:h-400"
          ></iframe>
        </div>
      </div>
    </>
  );
}
