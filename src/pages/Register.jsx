import UserForm from "../components/organisms/UserForm";

function Register({ usuarios, guardarUsuario }) {
  return <UserForm usuarios={usuarios} guardarUsuario={guardarUsuario} />;
}
export default Register;