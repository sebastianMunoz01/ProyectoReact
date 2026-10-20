import Text from '../components/atoms/Text';
import Image from '../components/atoms/Image';
import Link from '../components/atoms/Link';
import ProductGrid from '../components/organisms/ProductGrid';

function Home({ productos, agregarAlCarrito }) {
  return (
    <>
      <section className="hero row align-items-center mb-4">
        <div className="col-md-6">
          <Text variant="h1">
            Pequeñas cajas, grandes sorpresas
          </Text>

          <Text>
            Descubre los personajes de Pawchi y comienza tu colección.
          </Text>

          <Link to="/catalogo" className="btn btn-primary">
            Ver catálogo
          </Link>
        </div>

        <div className="col-md-6">
          <Image
            src="/img/lineup-everyday-chaos.png"
            alt="Colección Everyday Chaos de Pawchi"
            className="img-fluid"
          />
        </div>
      </section>

      <Text variant="h2">Productos destacados</Text>

      <ProductGrid
        productos={productos.slice(0, 3)}
        agregarAlCarrito={agregarAlCarrito}
      />

      <section className="mt-4">
        <Text variant="h2">Conoce Pawchi</Text>

        <video
          src="/PAWCHI-VIDEO.mp4"
          controls
          playsInline
          preload="metadata"
          className="w-100 rounded"
          style={{ maxHeight: 400 }}
        />
      </section>
    </>
  );
}

export default Home;