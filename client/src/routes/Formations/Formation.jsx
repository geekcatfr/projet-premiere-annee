import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFormation } from "../../utils/data";

export default function Formation() {
  const params = useParams();
  const [formation, setFormation] = useState([]);

  useEffect(async () => {
    const f = await fetchFormation(parseInt(params.formationId, 10));
    setFormation(f);
  }, []);

  return (
    <div>
      <h1>{formation.title}</h1>
      <p>
        {formation.content === "None"
          ? formation.content
          : "Il n'y a aucun contenu dans cette section pour le moment."}
      </p>
      <FormationRating
        rating={formation.grade}
        nbrPeopleRating={formation.nbrPeopleRating}
      />
    </div>
  );
}

function FormationRating(props) {
  const { rating, nbrPeopleRating } = props;
  return (
    <>
      <input type="number" />
      /5 (Note moyenne de )
    </>
  );
}
