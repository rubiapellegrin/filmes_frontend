import { Redirect } from 'react-router-dom';
import config from '../../Config';
import { useState, useEffect } from 'react';

function Cadastrar({ pcodigo, atualizaAlerta, editar }) {

    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", site: ""
    })

    const [redirecionar, setRedirecionar] = useState(false);

    const recuperar = async codigo => {
        await fetch(`${config.enderecoapi}/diretores/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data[0]))
            .catch(err => console.log(err))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {
            try {
                const body = {
                    codigo: objeto.codigo,
                    nome: objeto.nome
                }
                const response = await fetch(config.enderecoapi + "/diretores", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(response => response.json())
                    .then(json => {
                        atualizaAlerta(json.status, json.message)
                    })

            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const body = {
                    nome: objeto.nome
                }
                const response = await fetch(config.enderecoapi + "/diretores", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(response => response.json())
                    .then(json => {
                        atualizaAlerta(json.status, json.message)
                    })

            } catch (err) {
                console.log(err)
            }
        }
        setRedirecionar(true);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value })
    }

    useEffect(() => {
        if (editar) {
            recuperar(pcodigo);
        } else {
            setObjeto({
                codigo: 0,
                nome: ""
            })
        }
    }, []);

    if (redirecionar === true) {
        return <Redirect to="/diretores" />
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Diretor</h2>
            <form id="formulario" onSubmit={acaoCadastrar}>
                <div className="form-group">
                    <label for="txtId">Código</label>
                    <input type="number" className="form-control" id="txtCodigo"
                        value={objeto.codigo}
                        readOnly
                        name="codigo"
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label for="txtNome">Nome</label>
                    <input type="text" className="form-control" id="txtNome"
                        placeholder="Informe o nome"
                        value={objeto.nome}
                        name="nome"
                        required
                        onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-success">
                    Salvar <i className="bi bi-save"></i>
                </button>
            </form>
        </div>
    )

}

export default Cadastrar;
