export async function fetchFormations() {
  const req = await fetch("http://localhost:8000/formations");
  const formations = await req.json();
  return formations;
}

export async function fetchFormation(formationId) {
  const req = await fetch(`http://localhost:8000/formations/${formationId}`);
  const formation = await req.json();
  return formation;
}
