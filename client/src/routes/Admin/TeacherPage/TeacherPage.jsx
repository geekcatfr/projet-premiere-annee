import PropTypes from "prop-types";
import { React, useEffect, useState } from "react";
import { AddTeacherButton } from "../../../components/Button/Button";

export default function TeacherPage() {
  const [teachers, setTeachers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/teachers")
      .then((res) => res.json())
      .then((res) => {
        setTeachers(res);
        setIsLoaded(true);
      });
  }, []);
  if (!isLoaded) {
    return <p>Chargement des données...</p>;
  }
  return (
    <div>
      <h1>Liste d&apos;enseignants</h1>
      <OptionSelector />
      <AddTeacherButton />
      <TeachersTable teachers={teachers} />
    </div>
  );
}

function OptionSelector() {
  return (
    <div className="optionSelector">
      <select>
        <option>Sélectionner...</option>
        <option>Supprimer</option>
      </select>
      <input type="button" value="Executer" />
    </div>
  );
}

function TeachersTable({ teachers }) {
  const TableRows = teachers.map((teacher) => (
    <tr key={teacher.id}>
      <td>
        <input type="checkbox" />
      </td>
      <td>{teacher.firstName}</td>
      <td>{teacher.lastName}</td>
      <td className="actionBox">
        <input type="button" value="Editer" />
        <DeleteButton teacherId={teacher.id} />
      </td>
    </tr>
  ));
  return (
    <table>
      <thead>
        <th>Sélectionner</th>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Actions</th>
      </thead>
      <tbody>{TableRows}</tbody>
    </table>
  );
}
TeachersTable.propTypes = {
  teachers: PropTypes.array.isRequired,
};

function DeleteButton({ teacherId }) {
  const deleteAction = () => {
    fetch(`http://localhost:8000/teachers/delete/${teacherId}`);
  };
  return <input onClick={deleteAction} type="button" value="Supprimer" />;
}

DeleteButton.propTypes = {
  teacherId: PropTypes.number.isRequired,
};
