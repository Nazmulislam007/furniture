const loggedInUser =
  typeof window !== "undefined" ? JSON.parse(window.sessionStorage.getItem("user")) : null;

export default loggedInUser;
