import {React, useState} from "react";
import { useParams } from "react-router-dom";
import { fetchFormation } from "../../../utils/data";
import "./edit.css";

export default function EditPage(props) {
  const params = useParams()
  const [content, setContent] = useState([]);

  useState(() => fetchFormation(parseInt(params.id, 10)).then(res => setContent(res)))
  return (
    <div>
      <h1>Editer</h1>
      <div className="title-wrapper">
        <p>Titre du contenu</p>
        <TextArea content={content.title} />
      </div>
      <div>
        <p>Contenu</p>
        <TextArea content={content.content} />
      </div>
      <div>
        <p>Formateur</p>
      </div>
      <input type="submit"/>
    </div>
  );
}

function TextArea(props) {
  const {content} = props;
  return (
    <input type="text" id="content" placeholder="Entrez du contenu..." value={content}/>
  );
}
