// src/utils/curiosidadesCrypto.js

const curiosidades = [
  {
    id: 1,
    titulo: '¿Qué es una blockchain?',
    descripcion: `Una blockchain es un libro de contabilidad distribuido, descentralizado y cifrado que registra transacciones de forma secuencial y transparente. Cada bloque contiene un conjunto de registros, un sello de tiempo y un hash que enlaza con el bloque anterior, creando una estructura inmutable y resistente a manipulaciones. Los nodos participantes validan nuevas transacciones mediante protocolos de consenso como Proof-of-Work o Proof-of-Stake, asegurando que todos los cambios sean legítimos y que no haya duplicación de registros. Esta tecnología elimina la necesidad de intermediarios centralizados, al tiempo que garantiza seguridad y transparencia. Las blockchains se utilizan en criptomonedas, contratos inteligentes y sistemas de votación digital, y su aplicación se extiende a sectores logísticos, financieros y de salud, donde la integridad de los datos y la trazabilidad son esenciales para construir confianza y eficiencia en entornos distribuidos.`,
  },
  {
    id: 2,
    titulo: '¿Quién creó Bitcoin?',
    descripcion: `Bitcoin fue presentado en 2008 mediante un ensayo académico titulado “Bitcoin: A Peer-to-Peer Electronic Cash System”, publicado bajo el seudónimo de Satoshi Nakamoto. La verdadera identidad de esta persona o grupo sigue siendo desconocida, lo que añade un aura de misterio a la criptomoneda pionera. En enero de 2009, Nakamoto extrajo el bloque génesis en la red, dando inicio al ecosistema descentralizado de minería de Bitcoin. Este sistema resolvía el doble gasto sin confiar en autoridades centrales, usando pruebas criptográficas y redes P2P. A lo largo de los años, Bitcoin ha inspirado la creación de miles de otras criptomonedas y se ha consolidado como reserva de valor digital y medio de intercambio alternativo, cambiando la visión del dinero y la confianza en sistemas financieros tradicionales.`,
  },
  {
    id: 3,
    titulo: '¿Qué es un NFT?',
    descripcion: `Un NFT (Non-Fungible Token) es un token criptográfico único e indivisible almacenado en una blockchain pública, como Ethereum, que certifica la propiedad y autenticidad de un activo digital o físico. A diferencia de las criptomonedas fungibles, cada NFT posee metadatos y un identificador exclusivo, por lo que no puede intercambiarse por otro igual. Los NFTs han revolucionado el arte digital, la música, los coleccionables y los juegos, permitiendo a creadores obtener ingresos directos y regalías automáticas mediante contratos inteligentes. Además, facilitan la creación de mercados secundarios seguros y transparentes, donde compradores y vendedores intercambian activos con trazabilidad completa. Su adopción desafía las nociones de propiedad digital y abre nuevas oportunidades en economía creativa y metaversos interactivos.`,
  },
  {
    id: 4,
    titulo: '¿Qué es Ethereum?',
    descripcion: `Ethereum es una plataforma de blockchain de código abierto lanzada en 2015 por Vitalik Buterin y colaboradores, diseñada para ejecutar contratos inteligentes (smart contracts) de forma descentralizada. Sobre su Ethereum Virtual Machine (EVM), los desarrolladores despliegan aplicaciones descentralizadas (dApps) que funcionan exactamente según su programación, sin posibilidad de fraude ni censura. Ethereum introdujo el concepto de gas, una tarifa para medir y pagar la computación en la red, equilibrando seguridad y eficiencia. Con el paso del tiempo, Ethereum ha sido base de innovaciones como DeFi, NFTs y DAOs, y en 2022 completó su transición a Proof-of-Stake para reducir el consumo energético y mejorar la escalabilidad, marcando un hito en la evolución de blockchains sostenibles y flexibles.`,
  },
  {
    id: 5,
    titulo: '¿Cuántos bitcoins existen?',
    descripcion: `El suministro máximo de Bitcoin está limitado a 21 millones de unidades, un cap fijado en su protocolo para generar escasez digital y proteger contra la inflación. Cada cuatro años, aproximadamente, ocurre un halving: la recompensa de la minería por bloque se reduce a la mitad, ralentizando la emisión de nuevos bitcoins. Actualmente se han minado más de 19 millones, y se estima que el último se extraerá alrededor de 2140. Esta emisión controlada contrasta con las monedas fiduciarias, sujetas a decisiones políticas y expansiones imprevistas. Gracias a este diseño, Bitcoin se percibe como “oro digital”, una reserva de valor resistente a la devaluación y al control centralizado, ofreciendo a inversores y usuarios una alternativa descentralizada y predecible.`,
  }
]

export default curiosidades;
