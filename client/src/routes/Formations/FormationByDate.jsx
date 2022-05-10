import React, { useState } from "react";
import { FormationGrid } from "../../components/FormationGrid/FormationGrid";
import { fetchFormations } from "../../utils/data";

export default function FormationByDatePage() {
  const [userDateInput, setuserDateInput] = useState(null);
  const [formationsId, setFormationsId] = useState([]);
  const [formations, setFormations] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const handleDateSearch = () => {
    if (!(userDateInput === "")) {
      fetch(
        `http://localhost:8000/formations/date?formationDate=${userDateInput}`,
        {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          fetchFormations().then((r) => setFormations(r));
          setFormationsId(res.formations);
          setIsDataLoaded(true);
        });
    }
  };
  if (isDataLoaded) {
    return (
      <p>
        {formationsId.map((formation) => (
          <div>{formations.find()}</div>
        ))}
      </p>
    );
  }
  return (
    <div className="formationsByDate">
      <h1>Formations du ???</h1>
      <div className="searchForm">
        <label htmlFor="calendarInput">
          Choississez une date
          <input
            onChange={(e) => setuserDateInput(e.target.value)}
            id="calendarInput"
            type="date"
          />
        </label>
        <input
          onClick={handleDateSearch}
          id="sendData"
          type="button"
          value="Rechercher"
        />
      </div>
    </div>
  );
}
