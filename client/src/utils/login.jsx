export function checkLoginTokenStorage() {
  if (localStorage.getItem("token") == null) {
    return false;
  }
  return true;
}

export const addNewUser = (username, password, isAdmin) => {
  const headers = new Headers({ "Content-Type": "application/json" });
  fetch("http://localhost:8000/users/add", {
    method: "POST",
    cors: "cors",
    headers,
    body: JSON.stringify({ username, password, isAdmin }),
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
