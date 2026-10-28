const AuthPage = ({ mode }) => {
  return <div>{mode === "login" ? "Login" : "Register"}</div>;
};

export default AuthPage;