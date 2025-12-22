// src/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { clients } from "./data";
import { Users, ArrowRight } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Dashboard Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <Users size={32} className="text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Client Portal</h1>
          <p className="text-slate-500 text-lg">Select a digital business card to view</p>
        </div>

        {/* Client Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <Link key={client.id} to={`/card/${client.id}`} className="group">
              <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden h-full flex flex-col">
                
                {/* Card Header Color Preview */}
                <div className="h-20 w-full relative" style={{ backgroundColor: client.theme.primary }}>
                    <div className="absolute -bottom-8 left-6">
                        <img 
                            src={client.logo} 
                            alt={client.name} 
                            className="w-16 h-16 rounded-full border-4 border-white object-cover bg-white"
                        />
                    </div>
                </div>

                <div className="p-6 pt-10 flex-grow">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mb-4">
                    {client.designation}
                  </p>
                  
                  {/* Mini details */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {client.products.slice(0, 2).map((prod, i) => (
                        <span key={i} className="text-xs bg-slate-100 px-2 py-1 rounded-md text-slate-600">
                            {prod}
                        </span>
                    ))}
                    {client.products.length > 2 && <span className="text-xs text-slate-400 py-1">+{client.products.length - 2} more</span>}
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center group-hover:bg-blue-50 transition-colors">
                  <span className="text-sm font-semibold text-slate-600">View Card</span>
                  <ArrowRight size={18} className="text-slate-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center text-slate-400 text-sm">
            <p>Admin Dashboard • Digital Business Cards System</p>
        </div>
      </div>
    </div>
  );
}

export default Home;