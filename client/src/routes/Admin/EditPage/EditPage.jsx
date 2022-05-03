import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFormation, fetchTeachers } from "../../../utils/data";
import "./edit.css";

export default function EditPage() {
  const params = useParams();
  const [content, setContent] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formationId = parseInt(params.id, 10)

  const [newName, setNewName] = useState("")
  const [newContent, setNewContent] = useState("")
  const [newTeacher, setNewTeacher] = useState(0)

  useEffect(() => {
    fetchFormation(formationId).then((res) => {
      setContent(res)
      setNewName(res.title)
      setNewContent(res.content)
      setNewTeacher(res.teacher)
    });
    fetchTeachers().then(
      (res) => setTeachers(res),
      (err) => setError(err)
    );
    setIsLoading(false);
  }, []);

  const handleSubmit = () => {
    const headers = new Headers({ "Content-Type": "application/json" });
    fetch(`http://localhost:8000/formations/edit?formation_id=${formationId}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ newName, content: newContent, teacher: newTeacher }),
    });
  };

  if (isLoading) {
    return <p>Récupération des données...</p>;
  }
  if (error) {
    return <p>Les données n&apos;ont pas pu être chargées.</p>;
  }
  return (
    <div>
      <h1>Editer</h1>
      <div className="title-wrapper">
        <h2>Titre du contenu</h2>

        <input
          type="text"
          id="content"
          placeholder="Entrez du contenu..."/>
      </div>
      <div className="descriptionContainer">
        <h2>Description</h2>
        <p>Une description permet </p>
      </div>
      <div>
        <h2>Contenu</h2>
        <textarea
          type="text"
          id="content"
          placeholder="Entrez du contenu..."
          onChange={(e) => setNewContent(e.target.value)}
        >{content.content}</textarea>
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
      <input onClick={handleSubmit} type="submit" />
    </div>
  );
}
