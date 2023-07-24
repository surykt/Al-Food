import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function FormularioRestaurante() {
  const [nomeRestaurante, setNomeRestaurante] = useState("");

  function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    axios
      .post("http://localhost:8000/api/v2/restaurantes/", {
        nome: nomeRestaurante,
      })
      .then(() => alert("Restaurante cadastrado com sucesso"));
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={nomeRestaurante}
        onChange={evento => setNomeRestaurante(evento.target.value)}
        label="Nome do Restaurante"
        variant="standard"
      />
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
}
