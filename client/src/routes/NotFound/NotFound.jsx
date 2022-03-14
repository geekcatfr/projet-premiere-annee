import react from "react";
import './NotFound.css'

function NotFound() {
  return (
    <>
    <div className="container">
      <div className="error">
      <h1 className="title">404</h1>
      <p className="access">La page que vous avez demandé n'est pas accessible</p>
      <div className="center">
        <p>Accueil</p>
    </div>
    </div>
    </div>
    </>
    
  );
  
}

export default NotFound;
