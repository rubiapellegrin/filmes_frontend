import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Menu from './componentes/Menu';
import Home from './componentes/Home';
import Diteror from './componentes/diretores/Diretores';
import Filme from './componentes/filmes/Filmes';

function App() {
  return (
    <Router>
      <Menu />
      <Switch>
        <Route exact path="/" render={Home} />
        <Route exact path="/diretores" render={() =>
          <Diteror />
        } />
        <Route exact path="/filmes" render={() =>
          <Filme />
        } />
      </Switch>
    </Router>
  );
}

export default App;
