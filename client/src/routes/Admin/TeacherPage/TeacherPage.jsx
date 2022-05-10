import PropTypes from "prop-types";
import { React, useEffect, useState } from "react";

export default function TeacherPage() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/teachers")
      .then((res) => res.json())
      .then((res) => setTeachers(res));
  }, []);
  return (
    <div>
      <h1>Liste d&apos;enseignants</h1>
      <select>
        <option>Sélectionner...</option>
        <option>Supprimer</option>
      </select>
      <input type="button" />
      <TeachersTable teachers={teachers} />
    </div>
  );
}

function TeachersTable({ teachers }) {
  const deleteAction = (teacherId) => {
    fetch(`http://localhost:8000/teachers/delete?teacherId=${teacherId}`);
  };
  const TableRows = teachers.map((teacher) => (
    <tr key={teacher.id}>
      <td>
        <input type="checkbox" />
      </td>
      <td>{teacher.firstName}</td>
      <td>{teacher.lastName}</td>
      <td className="actionBox">
        <input type="button" value="Editer" />
        <input
          onClick={deleteAction(teacher.id)}
          type="button"
          value="Supprimer"
        />
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
