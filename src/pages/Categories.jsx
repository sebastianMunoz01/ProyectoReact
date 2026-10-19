import Link from "../components/atoms/Link";
import ListItem from "../components/atoms/ListItem";
function Categories({ categorias }) {
  return (
    <>
      <h1>Categorías</h1>
      <ul className="list-group">
        {categorias.map((categoria) => (
          <ListItem className="list-group-item" key={categoria}>
            <Link to={"/categorias/" + categoria}>{categoria}</Link>
          </ListItem>
        ))}
      </ul>
    </>
  );
}
export default Categories;