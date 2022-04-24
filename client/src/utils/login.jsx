export function checkLoginTokenStorage() {
  if (localStorage.getItem("token") == null) {
    return false;
  }
  return true;
}
