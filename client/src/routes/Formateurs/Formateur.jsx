import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTeacher } from "../../utils/data";

export default function FormateurPage() {
  const params = useParams();
  const [formateur, setFormateur] = useState([]);

  useEffect(() => {
    fetchTeacher(parseInt(params.formateurId, 10)).then((res) => {
      setFormateur(res);
    });
  }, []);
  return (
    <div>
      <h1>
        {formateur.firstName} {formateur.lastName}
      </h1>
    </div>
  );
}
