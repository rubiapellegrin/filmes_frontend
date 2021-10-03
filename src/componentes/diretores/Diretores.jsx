import { useState, useEffect } from 'react';
import Alerta from '../Alerta';
import config from '../../Config';

function Diretor() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: ""
    })

    const recuperaDiretores = async () => {
        await fetch(`${config.enderecoapi}/diretores`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${config.enderecoapi}/diretores/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaDiretores();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

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
                };
                const response = await fetch(config.enderecoapi + '/diretores', {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }).then(response => response.json())
                    .then(json => {
                        //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)                    
                        setAlerta({ status: json.status, message: json.message })
                    });
            } catch (err) {
                console.error(err.message);
            }
        } else {
            try {
                const body = {
                    codigo: objeto.codigo,
                    nome: objeto.nome
                };
                const response = await fetch(config.enderecoapi + '/diretores/', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }).then(response => response.json())
                    .then(json => {
                        //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)                    
                        setAlerta({ status: json.status, message: json.message })
                    });
            } catch (err) {
                console.error(err.message);
            }
        }
        recuperaDiretores();
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaDiretores();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Diretores</h1>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => {
                    setObjeto({
                        codigo: 0,
                        nome: ""
                    });
                    setEditar(false);
                }}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhuma editora encontrada</h1>}
            {listaObjetos.length > 0 && (
                <table className="table table-striped table-hover table-responsive">
                    <thead >
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody >
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>
                                <td align="center">
                                    <button className="btn btn-primary"
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                        onClick={() => {
                                            recuperar(objeto.codigo);
                                            setEditar(true);
                                        }}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Filme</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div> <form id="formulario" onSubmit={acaoCadastrar}>
                            <div className="modal-body">

                                <div className="form-group">
                                    <label htmlFor="txtCodido" className="form-label">
                                        Código
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        className="form-control"
                                        id="txtCodido"
                                        name="codigo"
                                        value={objeto.codigo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txtNome" className="form-label">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="txtNome"
                                        name="nome"
                                        value={objeto.nome}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
                                    Salvar  <i className="bi bi-save"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Diretor;