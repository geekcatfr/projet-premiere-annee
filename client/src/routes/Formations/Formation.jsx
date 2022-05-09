import PropTypes from "prop-types";
import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { fetchFormation, fetchTeachers } from "../../utils/data";
import "./Formations.css";

export default function Formation() {
  const params = useParams();
  const [formation, setFormation] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchFormation(parseInt(params.formationId, 10)).then((f) => {
      setFormation(f);
      const teacherId = f.teacher;
      const teacherUrl = `http://localhost:8000/teachers/${teacherId}`;
      fetch(teacherUrl)
        .then((res) => res.json())
        .then((res) => {
          setTeacher(res);
        });
    });
  }, []);
  return (
    <div>
      <h1>{formation.title}</h1>
      <Link to={`/formateurs/${teacher.id}`}>
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
      <FormationRating
        rating={formation.rating}
        nbrPeopleRating={formation.nbrPeopleRating}
      />
    </div>
  );
}

function FormationRating(props) {
  const { rating, nbrPeopleRating } = props;
  return (
    <>
      <h2>Evaluation</h2>
      <div className="rating-form">
        <input type="number" />
        <input type="submit" />
      </div>
      <p>
        Note moyenne de {rating} étoiles avec {nbrPeopleRating} votants
      </p>
    </>
  );
}
FormationRating.propTypes = {
  rating: PropTypes.number.isRequired,
  nbrPeopleRating: PropTypes.number.isRequired,
};

function DatesCalendar() {
  return <></>;
}
