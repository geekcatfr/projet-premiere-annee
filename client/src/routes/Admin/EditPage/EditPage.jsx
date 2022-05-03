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

  useEffect(() => {
    fetchFormation(parseInt(params.id, 10)).then((res) => setContent(res));
    fetchTeachers().then(
      (res) => setTeachers(res),
      (err) => setError(err)
    );
    setIsLoading(false);
  }, []);

  const handleSubmit = () => {
    const headers = new Headers({ "Content-Type": "application/json" });
    fetch("http://localhost:8000/formations/edit", {
      method: "POST",
      headers,
      body: JSON.stringify(),
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
        <p>Titre du contenu</p>

        <input
          type="text"
          id="content"
          placeholder="Entrez du contenu..."
          value={content.title}
        />
      </div>
      <div>
        <p>Contenu</p>

        <input
          type="text"
          id="content"
          placeholder="Entrez du contenu..."
          value={content.content}
        />
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
