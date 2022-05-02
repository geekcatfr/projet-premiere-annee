export async function fetchFormations() {
  const req = await fetch("http://localhost:8000/formations");
  const formations = await req.json();
  return formations;
}

export async function fetchTeachers() {
  const req = await fetch("http://localhost:8000/teachers");
  const teachers = await req.json();
  return teachers;
}

export async function fetchFormation(formationId) {
  const req = await fetch(`http://localhost:8000/formations/${formationId}`);
  const formation = await req.json();
  return formation;
}

export async function sendNewTeacherReq(firstName, lastName) {
  const headers = new Headers({ "Content-Type": "application/json" });

  const req = await fetch("http://localhost:8000/teachers/add", {
    method: "POST",
    headers,
    body: JSON.stringify({ first_name: firstName, last_name: lastName }),
  });
  return req;
}

export const addFormationAction = (formation, teacherId) => {
  fetch("http://localhost:8000/formations/add", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ name: formation, teacher: teacherId }),
  });
};
