import axios from "axios";

const api = axios.create({
  baseURL:
    window.location.host == "localhost:5173"
      ? "http://api.digitalbooking.projetos.app.br"
      : "https://api.digitalbooking.projetos.app.br",
  // baseURL: "http://localhost:5500"
});

export default api;
