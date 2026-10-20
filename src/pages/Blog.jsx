import Text from '../components/atoms/Text';
import Link from '../components/atoms/Link';

function Blog() {
  return (
    <>
      <Text variant="h1">Blog Pawchi</Text>

      <div className="row g-4">
        <div className="col-md-6">
          <article className="card h-100">
            <div className="card-body">
              <Text variant="h2" className="h4">
                ¿Qué es una blind box?
              </Text>

              <Text>
                Conoce cómo funcionan las cajas sorpresa.
              </Text>

              <Link to="/blog/1">Leer artículo</Link>
            </div>
          </article>
        </div>

        <div className="col-md-6">
          <article className="card h-100">
            <div className="card-body">
              <Text variant="h2" className="h4">
                Cómo cuidar tu colección
              </Text>

              <Text>
                Consejos para mantener tus figuras en buen estado.
              </Text>

              <Link to="/blog/2">Leer artículo</Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

export default Blog;