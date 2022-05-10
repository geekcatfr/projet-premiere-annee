export function checkLoginTokenStorage() {
  if (localStorage.getItem("token") == null) {
    return false;
  }
  return true;
}

export const getUsers = () => {
  const req = fetch("http://localhost:8000/users").then((res) => res.json());
  return req;
};

export const addNewUser = (username, password, isAdmin) => {
  const headers = new Headers({ "Content-Type": "application/json" });
  fetch(`http://localhost:8000/users/add?isAdmin=${isAdmin}`, {
    method: "POST",
    cors: "cors",
    headers,
    body: JSON.stringify({ username, password }),
  });
};

export const deleteUser = (userId) => {
  const headers = new Headers({ "Content-Type": "application/json" });
  fetch("http://localhost:8000/users/delete", {
    method: "POST",
    cors: "cors",
    headers,
    body: JSON.stringify({ userId }),
  });
};
