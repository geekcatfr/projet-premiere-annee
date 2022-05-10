import PropTypes from "prop-types";
import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  fetchFormation,
  fetchTeachers,
  updateFormationGrade,
} from "../../utils/data";
import "./Formations.css";

export default function Formation() {
  const params = useParams();
  const [formation, setFormation] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchFormation(parseInt(params.formationId, 10)).then((f) => {
      setFormation(f);
      const teacherId = f.teacher;
      const teacherUrl = `http://localhost:8000/teachers/${teacherId}`;
      fetch(teacherUrl)
        .then((res) => res.json())
        .then((res) => {
          setTeacher(res);
          setIsLoaded(true);
        });
    });
  }, []);
  if (!isLoaded) {
    return <p>Chargement des données en cours...</p>;
  }
  return (
    <div>
      <h1>{formation.title}</h1>
      <Link to={`/teacher/${teacher.id}`}>
        Formateur : {teacher.firstName} {teacher.lastName}
      </Link>

      <div className="aboutFormationWrapper">
        <h2>A propos</h2>
        <p>
          {formation.content === "None" ? (
            "Il n'y a aucun contenu dans cette section pour le moment."
          ) : (
            <ReactMarkdown>{formation.content}</ReactMarkdown>
          )}
        </p>
      </div>
      <FormationDates dates={formation.dates} />
      <FormationRating
        formationId={parseInt(params.formationId, 10)}
        rating={formation.rating}
        nbrPeopleRating={formation.nbrPeopleRating}
      />
    </div>
  );
}

function FormationRating(props) {
  const { formationId, rating, nbrPeopleRating } = props;
  const [userGrade, setUserGrade] = useState(5);
  const handleSendRating = () => {
    updateFormationGrade(formationId, userGrade);
  };
  return (
    <>
      <h2>Evaluation</h2>
      <div className="rating-form">
        <input
          onChange={(e) => {
            setUserGrade(e.target.value);
          }}
          type="number"
        />
        <input onClick={handleSendRating} value="Envoyer" type="button" />
      </div>
      <p>
        Note moyenne de {rating} étoiles avec {nbrPeopleRating} votants
      </p>
    </>
  );
}
FormationRating.propTypes = {
  formationId: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  nbrPeopleRating: PropTypes.number.isRequired,
};

function FormationDates({ dates }) {
  return (
    <div className="datesList">
      <h2>Date de la prochaine session</h2>
      <ul>
        {dates.map((date) => (
          <li>{date}</li>
        ))}
      </ul>
    </div>
  );
}

FormationDates.propTypes = {
  dates: PropTypes.array.isRequired,
};
