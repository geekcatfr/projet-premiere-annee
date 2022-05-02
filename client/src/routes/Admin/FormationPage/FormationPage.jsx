import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./FormationPage.css";
import PropTypes from 'prop-types';
import { sendNewTeacherReq, addFormationAction } from "../../../utils/data";


library.add(fas);

export default function FormationPage() {
  const [formations, setFormations] = useState([]);
  const [error, setError] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [isTeacherBoxToggled, setIsTeacherBoxToggled] = useState(false);
  const [isFormationBoxToggled, setIsFormationBoxToggled] = useState(false)

  const toggleTeacherBox = () => {
    setIsTeacherBoxToggled(!isTeacherBoxToggled);
  };

  const toggleFormationBox = () => {
    setIsFormationBoxToggled(!isFormationBoxToggled)
  }

  useEffect(() => {
    fetch("http://localhost:8000/teachers")
      .then((res) => res.json())
      .then(
        (res) => setTeachers(res),
        () => {
          setError(true);
        }
      );
    fetch("http://localhost:8000/formations")
      .then((res1) => res1.json())
      .then(
        (res1) => {
          setFormations(res1.formations);
        },
        () => {
          setError(true);
        }
      );
  }, []);

  if (error) {
    return <p>Impossible de charger le contenu de la page</p>;
  }
  return (
    <div>
      <h1>Formations</h1>
      {teachers.length === 0
        ? "Aucun professeur existe actuellement. Commencez par en ajouter un !"
        : "Vous pouvez ajouter des formations"}
      <button
        onClick={toggleFormationBox}
        className="add_formation_button"
        type="button"
      >
        <FontAwesomeIcon icon="fa-solid fa-plus" />
        <span>Ajouter une formation</span>
      </button>
      <button
        onClick={toggleTeacherBox}
        className="add_formation_button"
        type="button"
      >
        <FontAwesomeIcon icon="fa-solid fa-user-pen" />
        <span>Ajouter un professeur</span>
      </button>
      {isFormationBoxToggled ? <AddFormationBox teachers={teachers}/> : null}
      {isTeacherBoxToggled ? <AddTeacherBox /> : null}
      <FormationTable formations={formations} />
    </div>
  );
}

function AddTeacherBox() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const handleRequest = () => {
    sendNewTeacherReq(firstName, lastName);
  };

  // TODO
  return (
    <div>
      <h2>Nouveau professeur</h2>
      <form onSubmit={handleRequest}>
        <label htmlFor="firstName">Prénom</label>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          id="firstName"
          name="firstName"
        />
        <label htmlFor="lastName">Nom</label>
        <input
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          id="lastName"
          name="lastName"
        />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
}

function AddFormationBox({teachers}) {
  const [formationName, setFormationName] = useState(null)
  const [teacherId, setTeacherId] = useState(null)

  const handleRequest = () => {
    addFormationAction(formationName, teacherId)
  }
  return (
    <>
      <h2>Ajouter une nouvelle formation</h2>
      <form onSubmit={handleRequest}>
        <label id="teacherName">Nom du professeur</label>
        <input type="text" id="teacherName" name="teacherName"/>
        <select>
        {teachers.map((teacher) => (
          <option key={teacher.id}>{teacher.firstName} {teacher.lastName}</option>
        ))}
        </select>
      </form>
    </>
  )
}

function FormationTable(props) {
  const { formations } = props;
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>Titre</th>
        </tr>
      </thead>
      <tbody>
        {formations.map((formation) => (
          <FormationRow
            key={formation.id}
            formationId={formation.id}
            title={formation.title}
          />
        ))}
      </tbody>
    </table>
  );
}
FormationTable.propTypes = {
  formations: PropTypes.array.isRequired
}

function FormationRow(props) {
  const [selected, setIsSelected] = useState(false);
  const { formationId, title } = props;

  const deleteRequest = () => {
    fetch(`http://localhost:8000/formations/delete/${formationId}`);
    window.location.reload();
  };

  return (
    <tr className="formation-row">
      <td className="checkbox">
        <input type="checkbox" onChange={() => setIsSelected(!selected)} />
      </td>

      <td>
        <p className="formation-title">{title}</p>
        <ul className="formation-actions">
          <li>
            <Link to={`edit/${formationId}`}>Editer</Link>
          </li>
          <li>
            <button type="button" onClick={deleteRequest}>
              Supprimer
            </button>
          </li>
        </ul>
      </td>
    </tr>
  );
}
FormationRow.propTypes = {formationId: PropTypes.number.isRequired, title: PropTypes.string.isRequired}