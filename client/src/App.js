import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Challenge from './components/Challenge';
import Leaderboard from './components/Leaderboard';



function App() {
  return (
    <Router>
      <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/leaderboard" exact component={Leaderboard} />
            <Route path="/challenge" exact component={Challenge} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
