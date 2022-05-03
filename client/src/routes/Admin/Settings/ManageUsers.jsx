import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getUsers } from "../../../utils/login";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getUsers().then(
      (res) => setUsers(res),
      () => setError(true)
    );
  }, []);
  if (error) {
    return <p>Impossible de charger les données de ce document.</p>;
  }

  return (
    <div>
      <h1>Gérer les utilisateurs</h1>
      <ManageUsersTable users={users} />
    </div>
  );
}

function ManageUsersTable({ users }) {
  return (
    <table>
      <thead>
        <th>Sélectionner</th>
        <th>Nom d'utilisateur</th>
        <th>Administrateur ?</th>
        <th>Actions</th>
      </thead>
      <tbody></tbody>
    </table>
  );
}
ManageUsersTable.propType = {
  users: PropTypes.array.isRequired,
};
