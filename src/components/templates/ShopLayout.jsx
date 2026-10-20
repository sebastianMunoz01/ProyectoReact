import NavBar from '../organisms/Navbar';

function ShopLayout({ children, usuario, cantidad, salir, mensaje }) {
  return (
    <>
      <NavBar
        usuario={usuario}
        cantidad={cantidad}
        salir={salir}
      />

      <main className="container py-4">
        {mensaje !== '' && (
          <p role="status" className="alert alert-info">
            {mensaje}
          </p>
        )}

        {children}
      </main>

      <footer className="text-center p-4">
        Pawchi Blind Boxes 2026
      </footer>
    </>
  );
}

export default ShopLayout;