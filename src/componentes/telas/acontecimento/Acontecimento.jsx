import { useState, useEffect } from "react";
import AcontecimentoContext from "./AcontecimentoContext";
import { getBairroServico }
    from '../../../servicos/BairroServico';
import {
    getAcontecimentoServico, getAcontecimentoServicoPorCodigoAPI,
    deleteAcontecimentoServico, cadastraAcontecimentoServico
}
    from '../../../servicos/AcontecimentoServico'
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Acontecimento() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({ codigo: "", nome: "" });
    const [carregando, setCarregando] = useState(false);
    const [listaBairros, setListaBairros] = useState([]);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: "",
            descricao: "",
            endereco: "",
            numero_rua: "",
            data_acontecido: new Date().toISOString().slice(0, 10),
            bairro: ""
        });
    }

    const editarObjeto = async codigo => {
        try {
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setObjeto(await getAcontecimentoServicoPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraAcontecimentoServico(objeto, metodo);
            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaAcontecimentos();
    }

    const recuperaAcontecimentos = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getAcontecimentoServico());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaBairros = async () => {
        setListaBairros(await getBairroServico());
    }

    const remover = async codigo => {
        try {
            if (window.confirm('Deseja remover este objeto')) {
                let retornoAPI = await deleteAcontecimentoServico(codigo);
                setAlerta({
                    status: retornoAPI.status,
                    message: retornoAPI.message
                });
                recuperaAcontecimentos();
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaAcontecimentos();
        recuperaBairros();
    }, []);

    return (
        <AcontecimentoContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar,
            handleChange, novoObjeto, editarObjeto, listaBairros
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>

            <Form />
        </AcontecimentoContext.Provider>
    )
}

export default WithAuth(Acontecimento);
