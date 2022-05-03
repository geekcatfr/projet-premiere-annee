import PropTypes from "prop-types";
import { React, useEffect, useState } from "react";

export default function TeacherPage() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/teachers")
      .then((res) => res.json())
      .then((res) => setTeachers(res));
  });
  return (
    <div>
      <h1>Liste d'enseignants</h1>
      <select>
        <option>Sélectionner...</option>
        <option>Supprimer</option>
      </select>
      <TeachersTable teachers={teachers} />
    </div>
  );
}

function TeachersTable({ teachers }) {
  return (
    <table>
      <thead>
        <th>Sélectionner</th>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Actions</th>
      </thead>
      <tbody>
        {teachers.map((teacher) => (
          <tr key={teacher.id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{teacher.firstName}</td>
            <td>{teacher.lastName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
TeachersTable.propsType = {
  teachers: PropTypes.array.isRequired,
};
