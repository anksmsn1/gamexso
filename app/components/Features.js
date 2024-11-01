import Image from 'next/image';

const featuresData = [
  { id: 1, title: 'Upto 3X Assured Rewards', image: '/f1.png' },
  { id: 2, title: 'Instant Withdrawls', image: '/f2.png' },
  { id: 3, title: 'Unlimited Referral Earning', image: '/f3.png' },
  { id: 4, title: '24x7 Support', image: '/f4.png' },
  
];

const Features = () => {
  return (
    <section className=" bg-black text-center">
      {/* Main Heading */}
      <h2 className="text-4xl font-bold mb-10 text-white-800">Our Features</h2>

      {/* Thumbnails Container with Increased Width */}
      <div className="container mx-auto max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuresData.map((feature) => (
          <div
            key={feature.id}
            className="bg-transparent  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative w-full h-40 flex justify-center items-center border border-gray-300 p-4 rounded-lg">
  <Image
    src={feature.image}
    alt={feature.title}
    width={150}
    height={150} // Set a fixed height for the image
  />
</div>
            
            {/* Title */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white-700">{feature.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
