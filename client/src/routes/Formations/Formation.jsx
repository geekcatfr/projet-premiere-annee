import PropTypes from "prop-types";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFormation } from "../../utils/data";
import "./Formations.css";

export default function Formation() {
  const params = useParams();
  const [formation, setFormation] = useState([]);

  useEffect(() => {
    fetchFormation(parseInt(params.formationId, 10)).then((f) =>
      setFormation(f)
    );
  }, []);

  return (
    <div>
      <h1>{formation.title}</h1>
      <p>
        {formation.content === "None"
          ? "Il n'y a aucun contenu dans cette section pour le moment."
          : formation.content}
      </p>
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
      <div className="rating-form">
        <input type="number" />
        <input type="submit" />
      </div>
      <p>
        (Note moyenne de {rating} étoiles avec {nbrPeopleRating} votants)
      </p>
    </>
  );
}
FormationRating.propsType = {
  rating: PropTypes.string.isRequired,
  nbrPeopleRating: PropTypes.string.isRequired,
};
