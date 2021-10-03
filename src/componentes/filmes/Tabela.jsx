import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState, useEffect } from 'react';
import Alerta from '../Alerta';
import config from '../../Config';
import { Link } from 'react-router-dom';

function Tabela({ alerta, atualizaAlerta }) {

    const [listaObjetos, setListaObjetos] = useState([]);

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
                    .then(json => atualizaAlerta(json.status, json.message))
                recuperaFilmes();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect(() => {
        recuperaFilmes();
    }, []);

    return (
        <div>
            <h1>Filmes</h1>
            <Link className="btn btn-primary" to="/cadastrarfilme">
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Link>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhuma filme encontrada</h1>}
            {

                listaObjetos.length > 0 && (

                    <table className="table" >
                        <thead>
                            <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Data de lançamento</th>
                                <th scope="col">Diretor</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map(objeto => (
                                <tr key={objeto.codigo}>
                                    <td>{objeto.codigo}</td>
                                    <td>{objeto.nome}</td>
                                    <td>{(new Date(objeto.data_lancamento)).getDate() + "/" + (new Date(objeto.data_lancamento)).getMonth() + "/" + (new Date(objeto.data_lancamento)).getFullYear()}</td>
                                    <td>{objeto.diretor}</td>
                                    <td>
                                        <Link className="btn btn-info"
                                            to={`/editarfilme/${objeto.codigo}`}>
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" title="Remover"
                                            onClick={() => { remover(objeto); }}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
        </div>
    );

}

export default Tabela;