import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from '../atoms/Link';
import Button from '../atoms/Button';

function NavBar({ usuario, cantidad, salir }) {
  return (
    <Navbar expand="lg" variant="dark" className="paw-nav">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Pawchi Blind Boxes
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-pawchi" />

        <Navbar.Collapse id="menu-pawchi">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
            <Nav.Link as={Link} to="/categorias">Categorías</Nav.Link>
            <Nav.Link as={Link} to="/ofertas">Ofertas</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/carrito">
              Carrito ({cantidad})
            </Nav.Link>

            {usuario === null ? (
              <>
                <Nav.Link as={Link} to="/login">Ingresar</Nav.Link>
                <Nav.Link as={Link} to="/registro">Registro</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/perfil">
                  {usuario.nombre}
                </Nav.Link>

                {usuario.tipo !== 'Cliente' && (
                  <Nav.Link as={Link} to="/admin">Panel</Nav.Link>
                )}

                <Button variant="light" onClick={salir}>
                  Salir
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;