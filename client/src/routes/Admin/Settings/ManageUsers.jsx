import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { deleteUser, getUsers } from "../../../utils/login";

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
  const handleDeleteReq = (userId) => {
    deleteUser(userId);
  };
  return (
    <table>
      <thead>
        <th>Sélectionner</th>
        <th>Nom d&apos;utilisateur</th>
        <th>Administrateur ?</th>
        <th>Actions</th>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{user.username}</td>
            <td>{user.admin}</td>
            <td>
              <input type="button" value="Editer" />
              <input
                onClick={handleDeleteReq(user.id)}
                type="button"
                value="Supprimer"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
ManageUsersTable.propTypes = {
  users: PropTypes.array.isRequired,
};
