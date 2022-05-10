import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PropTypes } from "prop-types";
import { fetchTeacher, getTeacherFormations } from "../../utils/data";
import "./Formateur.css";
import { FormationBox } from "../../components/FormationGrid/FormationGrid";

export default function FormateurPage() {
  const params = useParams();
  const [formateur, setFormateur] = useState([]);
  const [coursesTeacher, setCoursesTeacher] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const teacherId = parseInt(params.formateurId, 10);
    fetchTeacher(teacherId).then((res) => {
      setFormateur(res);
      getTeacherFormations(teacherId).then(
        (res) => setCoursesTeacher(res),
        (err) => setError(err)
      );
    });
  }, []);
  return (
    <div>
      <h1>
        {formateur.firstName} {formateur.lastName}
      </h1>
      <p>Formations de ce formateur : {coursesTeacher.length}</p>
      <FormationGrid formations={coursesTeacher} />
    </div>
  );
}

function FormationGrid({ formations }) {
  return (
    <>
      <h2>Formations de ce formateur</h2>
      <ul className="formation-grid">
        {formations.map((formation) => (
          <li key={formation.id} className="formation-box">
            <Link to={`/formations/${formation.id}`}>
              <FormationBox
                title={formation.title}
                description={formation.description}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

FormationGrid.propTypes = {
  formations: PropTypes.object.isRequired,
};

const formationRow = () => ({});
