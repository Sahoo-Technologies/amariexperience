import React, { useState, useEffect } from 'react';
import { getApplications, updateApplicationStatus } from '../services/vendorService';
import { VendorApplication } from '../types';
import { Check, X, Clock, Eye, Phone, Mail, MapPin } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [applications, setApplications] = useState<VendorApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<VendorApplication | null>(null);

  const refreshData = () => {
    setApplications(getApplications());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleStatusUpdate = (id: string, status: 'Approved' | 'Rejected') => {
    updateApplicationStatus(id, status);
    refreshData();
    if (selectedApp?.id === id) {
      setSelectedApp(prev => prev ? ({ ...prev, status }) : null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-stone-800">Admin Dashboard</h2>
          <p className="text-stone-600">Manage vendor onboarding applications.</p>
        </div>
        <div className="bg-stone-100 px-4 py-2 rounded-lg text-sm font-medium text-stone-600">
            {applications.filter(a => a.status === 'Pending').length} Pending Requests
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List View */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow border border-stone-100 overflow-hidden h-[600px] overflow-y-auto">
           <div className="p-4 bg-stone-50 border-b border-stone-200 font-bold text-stone-700">
             Applications
           </div>
           <div className="divide-y divide-stone-100">
             {applications.length === 0 ? (
               <div className="p-8 text-center text-stone-400">No applications found.</div>
             ) : (
               applications.map(app => (
                 <div 
                   key={app.id} 
                   onClick={() => setSelectedApp(app)}
                   className={`p-4 cursor-pointer transition hover:bg-stone-50 ${selectedApp?.id === app.id ? 'bg-amari-50 border-l-4 border-amari-500' : 'border-l-4 border-transparent'}`}
                 >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-stone-800">{app.businessName}</h4>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mb-2">{app.category} • {app.location}</p>
                    <p className="text-xs text-stone-400 flex items-center gap-1">
                      <Clock size={12} /> {new Date(app.submittedAt).toLocaleDateString()}
                    </p>
                 </div>
               ))
             )}
           </div>
        </div>

        {/* Detail View */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow border border-stone-100 p-8 min-h-[600px]">
           {selectedApp ? (
             <div>
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-stone-100">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-stone-800">{selectedApp.businessName}</h3>
                    <div className="flex items-center gap-3 mt-2">
                       <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-xs font-bold">{selectedApp.category}</span>
                       <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-xs font-bold">{selectedApp.priceRange}</span>
                       <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        selectedApp.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        selectedApp.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {selectedApp.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {selectedApp.status === 'Pending' && (
                      <>
                        <button 
                          onClick={() => handleStatusUpdate(selectedApp.id, 'Approved')}
                          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700"
                        >
                          <Check size={16} /> Approve
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(selectedApp.id, 'Rejected')}
                          className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-200"
                        >
                          <X size={16} /> Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-stone-400 uppercase mb-2">Description</h4>
                    <p className="text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-lg">
                      {selectedApp.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-bold text-stone-400 uppercase mb-2">Contact Details</h4>
                      <ul className="space-y-3">
                         <li className="flex items-center gap-3 text-stone-700">
                            <Mail size={18} className="text-amari-500" />
                            <a href={`mailto:${selectedApp.contactEmail}`} className="hover:text-amari-600">{selectedApp.contactEmail}</a>
                         </li>
                         <li className="flex items-center gap-3 text-stone-700">
                            <Phone size={18} className="text-amari-500" />
                            <span>{selectedApp.contactPhone}</span>
                         </li>
                         <li className="flex items-center gap-3 text-stone-700">
                            <MapPin size={18} className="text-amari-500" />
                            <span>{selectedApp.location}</span>
                         </li>
                      </ul>
                    </div>
                  </div>
                </div>

             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-stone-300">
               <Eye size={48} className="mb-4 opacity-50" />
               <p className="font-medium">Select an application to view details</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
