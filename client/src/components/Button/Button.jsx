import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { sendNewTeacherReq } from "../../utils/data";

library.add(fas);

export function AddTeacherButton() {
  const [isTeacherBoxToggled, setIsTeacherBoxToggled] = useState(false);
  const toggleTeacherBox = () => {
    setIsTeacherBoxToggled(!isTeacherBoxToggled);
  };
  return (
    <>
      <button
        onClick={toggleTeacherBox}
        className="add_formation_button"
        type="button"
      >
        <FontAwesomeIcon icon="fa-solid fa-user-pen" />
        <span>Ajouter un professeur</span>
      </button>
      {isTeacherBoxToggled ? <AddTeacherBox /> : null}
    </>
  );
}

export function AddTeacherBox() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const handleRequest = () => {
    sendNewTeacherReq(firstName, lastName);
    window.location.reload();
  };

  // TODO
  return (
    <div>
      <h2>Nouveau professeur</h2>
      <div className="formContainer">
        <label htmlFor="firstName">
          Prénom
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            id="firstName"
            name="firstName"
          />
        </label>
        <label htmlFor="lastName">
          Nom
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            id="lastName"
            name="lastName"
          />
        </label>
        <button onClick={handleRequest} type="button">
          Envoyer
        </button>
      </div>
    </div>
  );
}
