import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";

export default function AdministraçãoRestaurantes() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http
      .get<IRestaurante[]>("restaurantes/")
      .then(resposta => setRestaurantes(resposta.data));
  }, []);

  function excluir(restauranteExcluido: IRestaurante) {
    http
      .delete<IRestaurante>(`restaurantes/${restauranteExcluido.id}/`)
      .then(() => {
        const listaRestaurantes = restaurantes.filter(
          restaurante => restaurante.id !== restauranteExcluido.id,
        );
        setRestaurantes([...listaRestaurantes]);
      });
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map(restaurante => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                [
                <Link
                  to={`/admin/restaurantes/${restaurante.id}`}
                  children="editar"
                />
                ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(restaurante)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
