import { Routes, Route, Outlet, Link } from 'react-router-dom';
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./routes/Login";

function App() {
  return (
    <div className="App">
          <h1>Basic Example</h1>

<p>
  This example demonstrates some of the core features of React Router
  including nested <code>&lt;Route&gt;</code>s,{' '}
  <code>&lt;Outlet&gt;</code>s, <code>&lt;Link&gt;</code>s, and using a
  "*" route (aka "splat route") to render a "not found" page when someone
  visits an unrecognized URL.
</p>
    </div>
  );
}

export default App;
