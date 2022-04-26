import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFormation } from "../../utils/data";
import "./Formations.css";

export default function Formation() {
  const params = useParams();
  const [formation, setFormation] = useState([]);

  useEffect(async () => {
    const f = await fetchFormation(parseInt(params.formationId, 10));
    setFormation(f);
  }, []);

  console.log(formation);
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
  console.log(rating);
  return (
    <>
      <div className="rating-form">
        <input type="number" />
        <input type="submit" />
      </div>
      <p>
        /5 (Note moyenne de {rating} étoiles avec {nbrPeopleRating} votants)
      </p>
    </>
  );
}
