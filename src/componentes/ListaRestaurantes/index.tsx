import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios, { AxiosRequestConfig } from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [paginaAnterior, setPaginaAnterior] = useState("");
  const [busca, setBusca] = useState("");

  interface IParametrosBusca {
    ordering?: string;
    search?: string;
  }

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes).then(resposta => {
      setRestaurantes(resposta.data.results);
      setProximaPagina(resposta.data.next);
      setPaginaAnterior(resposta.data.previous);
    });
    // .catch(erro => {
    //   console.log(erro)
    // })
  };

  function buscar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const opcoes = {
      params: {} as IParametrosBusca,
    };
    if (busca) {
      opcoes.params.search = busca;
    }
    carregarDados("http://localhost:8000/api/v1/restaurantes/", opcoes);
  }

  useEffect(() => {
    carregarDados("http://localhost:8000/api/v1/restaurantes/");
  }, []);

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <form onSubmit={buscar}>
        <input
          type="text"
          value={busca}
          onChange={evento => setBusca(evento.target.value)}
        />
        <button type="submit">buscar</button>
      </form>
      {restaurantes?.map(item => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      <div className={style.Button}>
        {
          <button
            className={style.ButtonMenos}
            onClick={() => carregarDados(paginaAnterior)}
            children="<"
            disabled={!paginaAnterior}
          />
        }
        {
          <button
            className={style.ButtonMais}
            onClick={() => carregarDados(proximaPagina)}
            children=">"
            disabled={!proximaPagina}
          />
        }
      </div>
    </section>
  );
};

export default ListaRestaurantes;
