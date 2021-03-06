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

  const formationId = parseInt(params.id, 10);

  const [newName, setNewName] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTeacher, setNewTeacher] = useState(0);
  const [newDescription, setNewDescription] = useState("");
  const [dates, setDates] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    fetchFormation(formationId).then((res) => {
      setContent(res);
      setNewName(res.title);
      setNewContent(res.content);
      setNewTeacher(res.teacher);
      setNewDescription(res.description);
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
      body: JSON.stringify({
        name: newName,
        content: newContent,
        teacher: newTeacher,
        description: newDescription,
        dates,
      }),
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
          placeholder="Entrez du contenu..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div className="descriptionContainer">
        <h2>Description</h2>
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          id="description"
        />
      </div>
      <div>
        <h2>Contenu</h2>
        <textarea
          type="text"
          id="content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
      </div>
      <div>
        <p>Formateur</p>
        <select
          onChange={(e) => {
            setNewTeacher(e.target.value);
          }}
        >
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.firstName} {teacher.lastName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>Dates</p>
        <ul className="datesList">
          {dates.map((date) => (
            <div className="dateButtonsAction">
              <li>{date}</li>
              <input
                onClick={() => {
                  setDates([...dates].filter((element) => element !== date));
                }}
                value="X"
                type="button"
              />
            </div>
          ))}
        </ul>
        <input
          onChange={(e) => setUserInput(e.target.value)}
          type="datetime-local"
        />
        <input
          onClick={() => {
            setDates([...dates, userInput]);
          }}
          type="button"
          value="Ajouter une date"
        />
      </div>
      <input onClick={handleSubmit} type="submit" />
    </div>
  );
}
