import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { INITIAL_BUDGET, INITIAL_GUESTS } from '../constants';
import { BudgetItem, Guest } from '../types';
import { Plus, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

const COLORS = ['#14b8a6', '#f59e0b', '#8b5cf6', '#ec4899', '#3b82f6', '#9ca3af'];

const PlanningTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'budget' | 'guests' | 'timeline'>('budget');
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(INITIAL_BUDGET);
  const [guests, setGuests] = useState<Guest[]>(INITIAL_GUESTS);
  const [newGuestName, setNewGuestName] = useState('');

  // Budget Logic
  const totalEstimated = budgetItems.reduce((acc, item) => acc + item.estimated, 0);
  const totalActual = budgetItems.reduce((acc, item) => acc + item.actual, 0);

  // Guest Logic
  const addGuest = () => {
    if (newGuestName.trim()) {
      setGuests([...guests, { id: Date.now().toString(), name: newGuestName, rsvpStatus: 'Pending', table: null }]);
      setNewGuestName('');
    }
  };

  const removeGuest = (id: string) => {
    setGuests(guests.filter(g => g.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-serif font-bold text-stone-800 text-center mb-8">Wedding Dashboard</h2>
      
      {/* Tabs */}
      <div className="flex justify-center mb-10 border-b border-stone-200">
        <button 
          onClick={() => setActiveTab('budget')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'budget' ? 'border-amari-500 text-amari-600' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
        >
          Budget Planner
        </button>
        <button 
          onClick={() => setActiveTab('guests')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'guests' ? 'border-amari-500 text-amari-600' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
        >
          Guest List
        </button>
        <button 
          onClick={() => setActiveTab('timeline')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'timeline' ? 'border-amari-500 text-amari-600' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
        >
          Timeline
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg min-h-[500px] p-6">
        
        {/* BUDGET TOOL */}
        {activeTab === 'budget' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-80 w-full">
              <h3 className="text-xl font-bold mb-4 text-stone-700">Expense Breakdown</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetItems}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="estimated"
                    label
                  >
                    {budgetItems.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-stone-50 rounded-lg">
                <div>
                  <p className="text-sm text-stone-500">Total Estimated</p>
                  <p className="text-2xl font-bold text-stone-800">${totalEstimated.toLocaleString()}</p>
                </div>
                <div className="text-right">
                   <p className="text-sm text-stone-500">Total Actual</p>
                   <p className={`text-2xl font-bold ${totalActual > totalEstimated ? 'text-red-500' : 'text-green-600'}`}>${totalActual.toLocaleString()}</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-stone-100 text-stone-600 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Estimated ($)</th>
                      <th className="px-4 py-3">Actual ($)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {budgetItems.map(item => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 font-medium">{item.category}</td>
                        <td className="px-4 py-3">{item.estimated}</td>
                        <td className="px-4 py-3">{item.actual}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* GUEST LIST TOOL */}
        {activeTab === 'guests' && (
          <div>
            <div className="flex gap-4 mb-6">
              <input 
                type="text" 
                value={newGuestName} 
                onChange={(e) => setNewGuestName(e.target.value)}
                placeholder="Guest Name"
                className="flex-1 border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amari-500 outline-none"
              />
              <button 
                onClick={addGuest}
                className="bg-amari-600 text-white px-6 py-2 rounded-lg hover:bg-amari-700 flex items-center gap-2"
              >
                <Plus size={18} /> Add
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {guests.map(guest => (
                <div key={guest.id} className="border border-stone-200 rounded-lg p-4 flex justify-between items-center bg-stone-50">
                  <div>
                    <h4 className="font-bold text-stone-800">{guest.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      guest.rsvpStatus === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      guest.rsvpStatus === 'Declined' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {guest.rsvpStatus}
                    </span>
                  </div>
                  <button onClick={() => removeGuest(guest.id)} className="text-stone-400 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            {guests.length === 0 && <p className="text-center text-stone-400 py-12">No guests added yet.</p>}
          </div>
        )}

        {/* TIMELINE TOOL */}
        {activeTab === 'timeline' && (
          <div className="relative pl-8 border-l-2 border-amari-100 space-y-8 max-w-2xl mx-auto py-4">
            {[
              { time: '14:00', title: 'Guest Arrival', desc: 'Welcome drinks at the Nomad Beach Bar.' },
              { time: '15:00', title: 'Ceremony', desc: 'Beachfront vows exchange under the floral arch.' },
              { time: '16:00', title: 'Cocktail Hour', desc: 'Photoshoot and hors d\'oeuvres.' },
              { time: '17:30', title: 'Reception Entrance', desc: 'Grand entrance at the reception hall.' },
              { time: '19:00', title: 'Dinner Service', desc: 'Swahili buffet and speeches.' },
              { time: '21:00', title: 'Dancing', desc: 'DJ starts the party under the stars.' },
            ].map((event, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[41px] bg-amari-500 rounded-full p-1 border-4 border-white shadow-sm">
                  <Clock size={16} className="text-white" />
                </div>
                <h4 className="font-bold text-amari-900">{event.time}</h4>
                <h5 className="text-lg font-serif font-semibold text-stone-800">{event.title}</h5>
                <p className="text-stone-500 text-sm">{event.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanningTools;
