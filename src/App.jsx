import React from 'react';
import data from './data.json';
import { Phone, MapPin, Instagram, Facebook, Youtube, CheckCircle, Mail, UserPlus } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";

function App() {
  
  // Logic to generate and download the vCard
  const handleSaveContact = () => {
    // Construct the vCard content string
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
N:;${data.name};;;
TITLE:${data.designation || 'Service Provider'}
TEL;TYPE=CELL:${data.mobile}
EMAIL;TYPE=WORK:${data.email}
ADR;TYPE=WORK:;;${data.address};;;;
URL;TYPE=Instagram:${data.socials.instagram}
URL;TYPE=Facebook:${data.socials.facebook}
URL;TYPE=Website:${data.socials.youtube}
END:VCARD`;

    // Create a blob and download link
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${data.name.replace(/\s+/g, '_')}_Contact.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Main Card Container */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:shadow-3xl">
        
        {/* Header Section */}
        <div className="bg-slate-900 text-white p-8 text-center relative">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-10"></div>
            <h1 className="text-3xl font-bold tracking-tight relative z-10">{data.name}</h1>
            <p className="text-blue-200 mt-1 relative z-10">{data.designation || 'Service Provider'}</p>
        </div>

        {/* Content Body */}
        <div className="p-8">
          
          {/* Contact Details */}
          <div className="space-y-4 mb-8">
            <ContactRow icon={<Phone size={20} />} text={data.mobile} href={`tel:${data.mobile}`} />
            <ContactRow icon={<Mail size={20} />} text={data.email} href={`mailto:${data.email}`} />
            <ContactRow icon={<MapPin size={20} />} text={data.address} />
          </div>

          <hr className="border-gray-100 my-6" />

          {/* Services Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 uppercase tracking-wider text-sm">Services Offered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.services.map((service, index) => (
                <div key={index} className="flex items-center space-x-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-slate-700 text-sm font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Footer with Save Button */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-gray-100">
            <SocialIcon Link={data.socials.instagram} Icon={Instagram} color="text-pink-600" />
            <SocialIcon Link={data.socials.facebook} Icon={Facebook} color="text-blue-600" />
            <SocialIcon Link={data.socials.youtube} Icon={Youtube} color="text-red-600" />
            <SocialIcon Link={data.socials.whatsapp} Icon={FaWhatsapp} color="text-green-500" />
            
            {/* NEW SAVE CONTACT BUTTON */}
            <button 
              onClick={handleSaveContact}
              className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors shadow-md ml-2"
            >
              <UserPlus size={18} />
              <span className="text-sm font-semibold">Save Contact</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// Helper Components
const ContactRow = ({ icon, text, href }) => (
  <div className="flex items-start space-x-3 text-slate-600 hover:text-slate-900 transition-colors">
    <div className="mt-1 text-blue-600">{icon}</div>
    {href ? (
      <a href={href} className="hover:underline font-medium">{text}</a>
    ) : (
      <span className="font-medium">{text}</span>
    )}
  </div>
);

const SocialIcon = ({ Link, Icon, color }) => (
  <a 
    href={Link} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={`${color} hover:opacity-80 transform hover:scale-110 transition-transform p-2 bg-gray-50 rounded-full`}
  >
    <Icon size={28} />
  </a>
);

export default App;