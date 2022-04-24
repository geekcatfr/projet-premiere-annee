import React from "react";
import { useParams } from "react-router-dom";
import { fetchFormation } from "../../utils/data";

export default function Formation() {
  const params = useParams();
  const formation = fetchFormation(parseInt(params.formationId, 10));

  return (
    <>
      <h1>{formation.title}</h1>
      <p>
        {formation.content === "None"
          ? formation.content
          : "Il n'y a aucun contenu dans cette section pour le moment."}
      </p>
    </>
  );
}
