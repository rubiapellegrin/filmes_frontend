const Menu = () => (
    <nav className="navbar navbar-expand-lg navbar navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
        < div className="container-fluid" >
            <a className="navbar-brand" href="/">Filmes</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Manutenções
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="/diretores">Diretores</a></li>
                            <li><a className="dropdown-item" href="/filmes">Filmes</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div >
    </nav >
);

export default Menu;