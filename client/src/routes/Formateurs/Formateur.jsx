import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTeacher } from "../../utils/data";

export default function FormateurPage() {
  const params = useParams();
  const [formateurs, setFormateurs] = useState([]);

  useEffect(
    fetchTeacher(parseInt(params, 10)).then((res) => {
      setFormateurs(res);
    })
  );
  return <h1>Formateur</h1>;
}
