import React from "react";
import "./edit.css";

export default function EditPage(props) {
  return (
    <div>
      <h1>Editer</h1>
      <div className="title-wrapper">
        <p>Titre du contenu</p>
        <TextArea />
      </div>
      <div>
        <p>Contenu</p>
        <TextArea />
      </div>
      <button type="submit">Envoyer</button>
    </div>
  );
}

function TextArea(props) {
  return (
    <textarea id="content" placeholder="Entrez du contenu...">
      {props.content}
    </textarea>
  );
}
