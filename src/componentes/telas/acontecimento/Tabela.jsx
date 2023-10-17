import { useContext } from "react";
import AcontecimentoContext from "./AcontecimentoContext";
import Alerta from '../../comuns/Alerta';
import { formataMoeda } from "../../comuns/Uteis";

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto }
        = useContext(AcontecimentoContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Acontecimentos</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {listaObjetos.length === 0 && <h1>Nenhum acontecimento encontrado</h1>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">Código</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Endereço</th>
                            <th scope="col">Número da rua</th>
                            <th scope="col">Data do acontecimento</th>
                            <th scope="col">Bairro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>
                                <td align="center">
                                    <button className="btn btn-info"
                                        onClick={() => editarObjeto(objeto.codigo)}
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto.codigo); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.descricao}</td>
                                <td>{objeto.endereco}</td>
                                <td>{objeto.numero_rua}</td>
                                <td>{objeto.data_acontecido}</td>
                                <td>{objeto.bairro_nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Tabela;