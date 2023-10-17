import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import AcontecimentoContext from './AcontecimentoContext';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import CampoSelect from '../../comuns/CampoSelect';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaBairros }
        = useContext(AcontecimentoContext);

    return (
        <Dialogo id="modalEdicao" titulo="Acontecimento" idformulario="formEdicao"
            acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                name="codigo" value={objeto.codigo}
                handlechange={handleChange}
                requerido={false} readonly={true}
                maximocaracteres={5} />

            <CampoEntrada id="txtDescricao" label="Descrição" tipo="text"
                name="descricao" value={objeto.descricao}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Descrição OK" textoinvalido="Informe a descrição"
                maximocaracteres={240} />
            
            <CampoEntrada id="txtEndereco" label="Endereço" tipo="text"
                name="endereco" value={objeto.endereco}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Endereço OK" textoinvalido="Informe o endereço"
                maximocaracteres={240} />

            <CampoEntrada id="txtNumero_rua" label="Número da rua" tipo="number"
                name="numero_rua" value={objeto.numero_rua}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Número da rua OK" textoinvalido="Informe o número da rua" />

            <CampoEntrada id="txtDataAcontecido" label="Data do acontecimento" tipo="date"
                name="data_acontecido" value={objeto.data_acontecido}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Data OK" textoinvalido="Informe a data do acontecimento" />

            <CampoSelect id="txtBairro" label="Bairro"
                name="bairro" value={objeto.bairro}
                handlechange={handleChange}
                requerido={true}
                textovalido="Bairro OK"
                textoinvalido="Informe o bairro">
                {
                    listaBairros.map((cat) => (
                        <option key={cat.codigo} value={cat.codigo}>
                            {cat.nome}
                        </option>
                    ))
                }
            </CampoSelect>
        </Dialogo>
    )
}

export default Form;
