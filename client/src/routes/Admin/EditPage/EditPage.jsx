import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFormation, fetchTeachers } from "../../../utils/data";
import "./edit.css";

export default function EditPage() {
  const params = useParams();
  const [content, setContent] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFormation(parseInt(params.id, 10)).then((res) => setContent(res));
    fetchTeachers().then(
      (res) => setTeachers(res.teachers),
      (error) => setError(error)
    );
    setIsLoading(false)
  }, []);
  if (isLoading) {
    return (
      <p>Récupération des données...</p>
    )
  }
  if (error) {
    return (
      <p>Les données n'ont pas pu être chargées.</p>
    )
  }
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
        <select>
          {teachers.map((teacher) => (
            <option key={teacher.id}>
              {teacher.firstName} {teacher.lastName}
            </option>
          ))}
        </select>
      </div>
      <input type="submit" />
    </div>
  );
}

function TextArea(props) {
  const { content } = props;
  return (
    <input
      type="text"
      id="content"
      placeholder="Entrez du contenu..."
      value={content}
    />
  );
}
