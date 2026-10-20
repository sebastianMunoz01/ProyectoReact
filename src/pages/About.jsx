import Text from '../components/atoms/Text';

function About() {
  return (
    <>
      <Text variant="h1">Nosotros</Text>

      <Text>
        Pawchi Blind Boxes es una tienda de figuras coleccionables
        sorpresa. Cada caja pertenece a una colección y contiene
        un personaje que descubrirás al abrirla.
      </Text>

      <Text variant="h2">Nuestra idea</Text>

      <Text>
        Queremos compartir la emoción de descubrir nuevos personajes,
        completar colecciones e intercambiar figuras repetidas.
      </Text>

      <Text variant="h2">Nuestro equipo</Text>

      <Text>
        Este proyecto fue desarrollado por Javier, Bryan y Sebastián
        para la asignatura de Desarrollo Fullstack II.
      </Text>
    </>
  );
}

export default About;