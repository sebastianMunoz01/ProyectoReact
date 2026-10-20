import { useParams } from 'react-router-dom';
import Text from '../components/atoms/Text';
import Link from '../components/atoms/Link';

const articulos = [
  {
    id: '1',
    titulo: '¿Qué es una blind box?',
    contenido:
      'Una blind box es una caja cerrada que contiene una figura sorpresa. Puedes elegir la colección, pero el personaje se descubre al abrirla. Coleccionar e intercambiar figuras repetidas forma parte de la experiencia.',
  },
  {
    id: '2',
    titulo: 'Cómo cuidar tu colección',
    contenido:
      'Mantén tus figuras lejos del sol directo y limpia el polvo con un paño suave y seco. Evita productos de limpieza fuertes. Guarda las cajas en un lugar seco y organiza tus personajes para cuidar tu colección.',
  },
];

function BlogDetail() {
  const { id } = useParams();
  const articulo = articulos.find((item) => item.id === id);

  if (!articulo) {
    return (
      <>
        <Text variant="h1">Artículo no encontrado</Text>
        <Link to="/blog">Volver al blog</Link>
      </>
    );
  }

  return (
    <article>
      <Text variant="h1">{articulo.titulo}</Text>
      <Text>{articulo.contenido}</Text>
      <Link to="/blog">Volver al blog</Link>
    </article>
  );
}

export default BlogDetail;