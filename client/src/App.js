import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from './components/login/Login';
import Guard from './components/guard/Guard';

function Test() {
  return(<p>Test page</p>)
}

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Guard>
          <Home></Home>
        </Guard>
      </Route>

      <Route exact path="/test">
        <Test></Test>
      </Route>

      <Route exact path="/login">
        <Login/>
      </Route>
    </Router>
  );
}

export default App;
