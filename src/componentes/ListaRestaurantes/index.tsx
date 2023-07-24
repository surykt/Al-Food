import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [paginaAnterior, setPaginaAnterior] = useState("");

  const carregarDados = (url: string) => {
    axios.get<IPaginacao<IRestaurante>>(url).then(resposta => {
      setRestaurantes(resposta.data.results);
      setProximaPagina(resposta.data.next);
      setPaginaAnterior(resposta.data.previous);
    });
    // .catch(erro => {
    //   console.log(erro)
    // })
  };

  useEffect(() => {
    carregarDados("http://localhost:8000/api/v1/restaurantes/");
  }, []);

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
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
