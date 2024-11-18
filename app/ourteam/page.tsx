import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const teamMembers = [
  {
    name: 'Suryabhan Yadav',
    role: 'CEO & Founder',
     // Replace with the correct image paths
    bio: 'Visionary leader and tech enthusiast with 15 years of industry experience.',
    
  },
  {
    name: 'Brijbhan Yadav',
    role: 'Co-Founder',
     // Replace with the correct image paths
    bio: 'Visionary leader and tech enthusiast with 15 years of industry experience.',
    
  },
  {
    name: 'Kuldeep yadav',
    role: 'Co-Founder',
    
    bio: 'Expert in web and mobile application development.',
    linkedin: 'https://linkedin.com/in/dwright',
  },
  {
    name: 'Tapas Yadav',
    role: 'Android Developer',
     
    bio: 'Passionate about building scalable mobile applications and exploring new technologies.',
     
  },
  {
    name: 'Jatin',
    role: 'Android Developer',
   
    bio: 'Specializes in creating user-friendly and visually Android Applications.',
     
  },
  {
    name: 'Ankur Srivastava',
    role: 'Full Stack Developer',
    
    bio: 'Expert in web and mobile application development.',
    linkedin: 'https://linkedin.com/in/dwright',
  },
  {
    name: 'Malti Yadav',
    role: 'Web and Graphic Designer',
    
    bio: 'Expert in web and mobile application development.',
    linkedin: 'https://linkedin.com/in/dwright',
  },
  {
    name: 'Amar Singh Yadav',
    role: 'CMO',
    
    bio: 'Expert in web and mobile application development.',
    linkedin: 'https://linkedin.com/in/dwright',
  },
  {
    name: 'Sandeep Yadav',
    role: 'CFO',
    
    bio: 'Expert in web and mobile application development.',
    linkedin: 'https://linkedin.com/in/dwright',
  },
  {
    name: 'Shravan Kumar Yadav ',
    role: 'CFO',
    
    bio: 'Expert in web and mobile application development.',
    linkedin: 'https://linkedin.com/in/dwright',
  },
  {
    name: 'Prem Tiwari ',
    role: 'CMO',
    
    bio: 'Expert in web and mobile application development.',
    linkedin: 'https://linkedin.com/in/dwright',
  },
  {
    name: 'Chandan mishra ',
    role: 'RO',
    
    bio: 'Expert in web and mobile application development.',
    linkedin: 'https://linkedin.com/in/dwright',
  },
  {
    name: 'Adv. Kartikey Yadav ',
    role: 'CLO',
    
    bio: 'Expert in web and mobile application development.',
    linkedin: 'https://linkedin.com/in/dwright',
  },
  {
    name: 'Om Narayan Mishra',
    role: 'CA',
    
    bio: 'Expert in web and mobile application development.',
    linkedin: 'https://linkedin.com/in/dwright',
  },
  
];

const OurTeam = () => {
  return (
    <>
    <Navbar/>
    <section className="py-16 bg-black">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Our Team</h2>
        <p className="text-white mb-12">
          Meet the amazing team that makes everything possible.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-align-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow text-center"
             >
                <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="100"
  height="100"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className='m-auto'
>
  
  <circle cx="12" cy="8" r="4"></circle>
  
  <path d="M4 20c0-4 4-7 8-7s8 3 8 7"></path>
</svg>
 
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-500">{member.role}</p>
             
               
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default OurTeam;
