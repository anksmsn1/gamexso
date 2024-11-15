import Image from "next/image";

const services = [
  {
    title: "Website Design and Development",
    description:
      "Crafting modern and responsive websites tailored to your business needs.",
    details:
      "Our team specializes in creating visually stunning websites that offer a seamless user experience. Whether you're looking for an e-commerce platform, a portfolio site, or a corporate website, we deliver tailored solutions with cutting-edge technologies.",
    icon: "/websitedevelopment.jpg",
  },
  {
    title: "Mobile Application Development",
    description:
      "Creating user-friendly mobile apps for Android and iOS platforms.",
    details:
      "From concept to deployment, we build mobile applications that meet your unique requirements. Our expertise spans native app development, cross-platform solutions, and progressive web apps, ensuring a smooth and engaging user experience.",
    icon: "/mobileapplication.jpg",
  },
  {
    title: "Software Development",
    description:
      "Building robust software solutions to streamline your business processes.",
    details:
      "We offer custom software development services to help you automate workflows, improve efficiency, and achieve your goals. Our solutions include CRM systems, ERP platforms, and other bespoke applications tailored to your business model.",
    icon: "/softwaredevelopment.jpg",
  },
  {
    title: "Digital Marketing",
    description:
      "Boost your online presence and reach your audience effectively.",
    details:
      "Our digital marketing strategies are designed to enhance your brand visibility and drive traffic. From SEO and PPC campaigns to content marketing and social media management, we help you connect with your audience.",
    icon: "/digitalmarketing.jpg",
  },
];

const ServicesPage = () => {
  return (
    <div className=" min-h-screen bg-black">
      {/* Header Section */}
      <header className="bg-red-600 text-white py-6">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-center">Our Services</h1>
          <p className="text-center mt-2">
            Empowering your business with innovative solutions.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 bg-black">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-black shadow-lg rounded-lg p-6 flex flex-col"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={100}
                  height={100}
                  className="mr-4 rounded-full"
                />
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>
              <p className="text-white-600 mb-4">{service.description}</p>
              <p className="text-white-500 text-sm">{service.details}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-1 place-items-center">
    <a href="tel:9161610042" className="flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded">
        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12h6m-3-3l3 3-3 3m-9 5l-3-3 3-3M3 9l3 3-3 3m0-8l3 3-3 3" />
        </svg>
        Call Now for more details!
    </a>
</div>

      </main>
    </div>
  );
};

export default ServicesPage;
