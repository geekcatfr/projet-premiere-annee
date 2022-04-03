import React from "react";
import "./edit.css";

const TextArea = () => (
  <textarea id="content" placeholder="Entrez du contenu..." />
);

export default function EditPage() {
  return (
    <div>
      <h1>Editer</h1>
      <div className="title-wrapper">
        <h2>Titre du contenu</h2>
        <TextArea />
      </div>

      <button type="submit" onClick={console.log("puss")}>
        Envoyer
      </button>
    </div>
  );
}
