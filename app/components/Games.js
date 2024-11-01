import Image from 'next/image';

const games = [
  {
    id:1,
    title: 'Ludo',
    image: '/ludo.png',
    description: 'Enjoy the classic board game with friends and family.',
  },
  {
    id:2,
    title: 'Rummy',
    image: '/rummy.png',
    description: 'A popular card game that is fun and strategic.',
  },
  {
    id:3,
    title: 'Fan Battle',
    image: '/fan_battle.png',
    description: 'Compete with others in thrilling fan battles.',
  },
  {
    id:4,
    title: 'Carrom',
    image: '/carrom.png',
    description: 'Play the classic tabletop game of carroms.',
  },
];

const Features = () => {
  return (
    <section className=" bg-black text-center">
      {/* Main Heading */}
      <h2 className="text-4xl font-bold mb-10 text-white-800">Our Features</h2>

      {/* Thumbnails Container with Increased Width */}
      <div className="container mx-auto max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {games.map((feature) => (
    <div
      key={feature.id}
      className="bg-transparent rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
    >
      {/* Image */}
      <div className="relative w-full flex justify-center items-center p-4">
        <div className="w-40 h-40 border border-gray-300 rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src={feature.image}
            alt={feature.title}
            width={150}
            height={150}
            className="rounded-full" // Make the image itself circular
          />
        </div>
      </div>

      {/* Title */}
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold text-white-700">{feature.title}</h3>
      </div>
    </div>
  ))}
</div>

    </section>
  );
};

export default Features;
