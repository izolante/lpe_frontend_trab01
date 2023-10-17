import { getToken } from "../seguranca/Autenticacao";

export const getBairroServico = async () => {
    const response =
        await fetch(`http://localhost:3002/bairro`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": getToken()
                }
            });
    const data = await response.json();
    return data;
}

export const getBairroServicoPorCodigoAPI = async codigo => {
    const response =
        await fetch(`http://localhost:3002/bairro/${codigo}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": getToken()
                }
            });
    const data = await response.json();
    return data;
}

export const deleteBairroServico = async codigo => {
    const response =
        await fetch(`http://localhost:3002/bairro/${codigo}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": getToken()
                }
            });
    const data = await response.json();
    return data;
}


export const cadastraBairroServico = async (objeto, metodo) => {
    const response = await fetch(`http://localhost:3002/bairro`, {
        method: metodo,
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}