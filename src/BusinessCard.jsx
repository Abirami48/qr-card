// src/BusinessCard.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { clients } from "./data"; // Import data
import { Phone, MapPin, Instagram, Facebook, Youtube, CheckCircle, Mail, UserPlus, QrCode, X, Share2, Home } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import QRCode from "react-qr-code";

function BusinessCard() {
  const { clientId } = useParams(); // Get ID from URL
  const [showQR, setShowQR] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Find the specific client based on URL
  const data = clients.find((c) => c.id === clientId);

  // If client doesn't exist, show error
  if (!data) return <div className="text-center mt-20">Client Not Found</div>;

  const themeColor = data.theme.primary;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.name} - Digital Card`,
          url: window.location.href,
        });
      } catch (error) { console.log(error); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleSaveContact = () => {
    const secondaryPhone = data.mobile2 ? `TEL;TYPE=CELL:${data.mobile2}` : "";
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
N:;${data.name};;;
TITLE:${data.designation}
TEL;TYPE=CELL:${data.mobile}
${secondaryPhone}
EMAIL;TYPE=WORK:${data.email}
ADR;TYPE=WORK:;;${data.address};;;;
URL;TYPE=Website:${window.location.href}
END:VCARD`;

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${data.name.replace(/\s+/g, "_")}_Contact.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 relative">
      
      {/* Home Button to go back to Dashboard */}
      <Link to="/" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md z-10 hover:bg-gray-100">
        <Home size={20} className="text-gray-600" />
      </Link>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center relative">
            <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 bg-gray-100 rounded-full p-1">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-1">Scan to Connect</h3>
            
            {/* Unique QR for THIS specific page URL */}
            <div className="bg-white p-3 rounded-xl border-2 border-slate-100 inline-block shadow-sm">
              <QRCode value={window.location.href} size={180} level={"L"} />
            </div>
            
            <div className="mt-8 flex justify-center">
              <button onClick={handleShare} className="flex items-center space-x-2 text-white px-6 py-3 rounded-full shadow-lg w-full justify-center" style={{ backgroundColor: themeColor }}>
                {copySuccess ? <CheckCircle size={18} /> : <Share2 size={18} />}
                <span className="font-semibold">{copySuccess ? "Link Copied!" : "Share Link"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="text-white p-8 relative overflow-hidden" style={{ backgroundColor: themeColor }}>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
          <button onClick={() => setShowQR(true)} className="absolute top-4 right-4 bg-white/10 p-2 rounded-full backdrop-blur-md z-20">
            <QrCode size={20} className="text-white" />
          </button>
          
          <div className="relative z-10 flex items-center space-x-6">
            <div className="flex-shrink-0 w-24 h-24 rounded-full border-4 border-white/20 shadow-xl overflow-hidden bg-white">
              <img src={data.logo} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold leading-tight">{data.name}</h1>
              <p className="opacity-90 mt-1 font-medium">{data.designation}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-4 mb-8">
            <ContactRow icon={<Phone size={20} />} text={data.mobile} href={`tel:${data.mobile}`} color={themeColor} />
            {data.mobile2 && <ContactRow icon={<Phone size={20} />} text={data.mobile2} href={`tel:${data.mobile2}`} color={themeColor} />}
            <ContactRow icon={<Mail size={20} />} text={data.email} href={`mailto:${data.email}`} color={themeColor} />
            <ContactRow icon={<MapPin size={20} />} text={data.address} color={themeColor} />
          </div>

          <hr className="border-gray-100 my-6" />

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 uppercase tracking-wider text-sm">Services / Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.products.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle size={16} style={{ color: themeColor }} />
                  <span className="text-slate-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-gray-100">
            <SocialIcon Link={data.socials.instagram} Icon={Instagram} color="text-pink-600" />
            <SocialIcon Link={data.socials.facebook} Icon={Facebook} color="text-blue-600" />
            <SocialIcon Link={data.socials.youtube} Icon={Youtube} color="text-red-600" />
            <SocialIcon Link={data.socials.whatsapp} Icon={FaWhatsapp} color="text-green-500" />
            
            <button onClick={handleSaveContact} className="flex items-center space-x-2 text-white px-5 py-2.5 rounded-full shadow-lg ml-2 active:scale-95" style={{ backgroundColor: themeColor }}>
              <UserPlus size={18} />
              <span className="text-sm font-semibold">Save Contact</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ContactRow = ({ icon, text, href, color }) => (
  <div className="flex items-start space-x-3 text-slate-600 transition-colors">
    <div className="mt-1" style={{ color: color }}>{icon}</div>
    {href ? <a href={href} className="hover:underline font-medium">{text}</a> : <span className="font-medium">{text}</span>}
  </div>
);

const SocialIcon = ({ Link, Icon, color }) => (
  <a href={Link} target="_blank" rel="noopener noreferrer" className={`${color} hover:opacity-80 transform hover:scale-110 p-2 bg-gray-50 rounded-full`}>
    <Icon size={28} />
  </a>
);

export default BusinessCard;