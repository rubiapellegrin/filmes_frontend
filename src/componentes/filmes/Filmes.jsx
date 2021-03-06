import { useState, useEffect } from 'react';
import Alerta from '../Alerta';
import config from '../../Config';

function Filme() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", data_lancamento: "", diretor: ""
    })

    const recuperaFilmes = async () => {
        await fetch(`${config.enderecoapi}/filmes`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${config.enderecoapi}/filmes/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaFilmes();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    const recuperar = async codigo => {
        await fetch(`${config.enderecoapi}/filmes/${codigo}`)
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
                    nome: objeto.nome,
                    data_lancamento: objeto.data_lancamento,
                    diretor: objeto.diretor
                };
                const response = await fetch(config.enderecoapi + '/filmes', {
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
                    nome: objeto.nome,
                    data_lancamento: objeto.data_lancamento,
                    diretor: objeto.diretor
                };
                const response = await fetch(config.enderecoapi + '/filmes/', {
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
        recuperaFilmes();
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaFilmes();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Filmes</h1>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => {
                    setObjeto({
                        codigo: 0,
                        nome: "",
                        data_lancamento: "",
                        diretor: ""
                    });
                    setEditar(false);
                }}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhuma editora encontrada</h1>}
            {listaObjetos.length > 0 && (
                <table className="table table-striped table-hover table-responsive">
                    <thead>
                        <tr >
                            <th scope="col" style={{ textAlign: 'center' }}>A????es</th>
                            <th scope="col" >C??digo</th>
                            <th scope="col" >Nome</th>
                            <th scope="col" >Data de lan??amento</th>
                            <th scope="col" >Diretor</th>
                            <th scope="col" ></th>
                            <th scope="col" ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>
                                <td align="center">
                                    <button className="btn btn-info"
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
                                <td>{(new Date(objeto.data_lancamento)).getDate() + "/" + ((new Date(objeto.data_lancamento)).getMonth() + 1) + "/" + (new Date(objeto.data_lancamento)).getFullYear()}</td>
                                <td>{objeto.diretor}</td>
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
                                        C??digo
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
                                <div className="form-group">
                                    <label htmlFor="txtData" className="form-label">
                                        Data
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="txtData"
                                        name="data_lancamento"
                                        value={objeto.data_lancamento}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txtDiretor" className="form-label">
                                        Diretor
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="txtDiretor"
                                        name="diretor"
                                        value={objeto.diretor}
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

export default Filme;