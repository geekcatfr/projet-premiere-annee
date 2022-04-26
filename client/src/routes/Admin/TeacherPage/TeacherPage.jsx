import { React, useEffect, useState } from "react";

export default function TeacherPage() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/teachers")
      .then((res) => res.json())
      .then((res) => setTeachers);
  });
  return (
    <>
      <h1>Liste d'enseignants</h1>
      <TeachersTable teachers={teachers} />
    </>
  );
}

function TeachersTable({ teachers }) {
  return (
    <table>
      <thead>
        <th>Sélectionner</th>
        <th>Nom</th>
        <th>Prénom</th>
      </thead>
      <tbody>
        <tr>{teachers.map()}</tr>
      </tbody>
    </table>
  );
}
