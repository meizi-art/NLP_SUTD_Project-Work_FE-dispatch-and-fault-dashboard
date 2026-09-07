import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Truck, 
  Award, 
  Clock, 
  Phone, 
  MapPin, 
  Package, 
  CheckCircle2, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Technician } from '../../types';

interface FleetScheduleProps {
  technicians: Technician[];
  onUpdateStatus: (techId: string, newStatus: Technician['currentStatus']) => void;
}

export const FleetSchedule: React.FC<FleetScheduleProps> = ({
  technicians,
  onUpdateStatus
}) => {
  const [techSearch, setTechSearch] = useState('');
  const [partSearch, setPartSearch] = useState('');
  const [selectedTech, setSelectedTech] = useState<Technician | null>(technicians[0]);

  const filteredTechs = technicians.filter(t => 
    t.name.toLowerCase().includes(techSearch.toLowerCase()) ||
    t.id.toLowerCase().includes(techSearch.toLowerCase()) ||
    t.specialties.some(s => s.toLowerCase().includes(techSearch.toLowerCase()))
  );

  // Global parts search across all fleet vans
  const allVanParts = technicians.flatMap(t => 
    t.vanInventory.map(part => ({
      ...part,
      techId: t.id,
      techName: t.name,
      location: t.currentLocationName,
      status: t.currentStatus
    }))
  ).filter(p => 
    !partSearch || 
    p.name.toLowerCase().includes(partSearch.toLowerCase()) ||
    p.partNumber.toLowerCase().includes(partSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(partSearch.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Active Fleet Roster & Mobile Van Inventory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time GPS telemetry, field certifications, shift limits, and on-board replacement parts across the Bay Area service fleet.
          </p>
        </div>

        {/* Global Roster Search */}
        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search tech, ID, or certification..."
            value={techSearch}
            onChange={(e) => setTechSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Main 2-Column Split: Technician Cards List + Selected Tech Detail / Van BOM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Tech Roster (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="space-y-2.5">
            {filteredTechs.map((tech) => {
              const isSelected = selectedTech?.id === tech.id;
              const isAvail = tech.currentStatus === 'ONLINE_AVAILABLE';

              return (
                <div
                  key={tech.id}
                  onClick={() => setSelectedTech(tech)}
                  className={`border rounded-3xl p-4 cursor-pointer transition-all shadow-xs ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-500/30' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={tech.avatarUrl}
                        alt={tech.name}
                        className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-slate-900 text-sm">{tech.name}</h3>
                          <span className="font-mono-tabular text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                            {tech.id}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{tech.currentLocationName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Pill & Rating */}
                    <div className="text-right">
                      <select
                        value={tech.currentStatus}
                        onChange={(e) => {
                          e.stopPropagation();
                          onUpdateStatus(tech.id, e.target.value as any);
                        }}
                        className={`text-[11px] font-mono-tabular font-bold rounded-full px-3 py-1 border cursor-pointer focus:outline-hidden ${
                          isAvail 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : tech.currentStatus === 'EN_ROUTE'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : tech.currentStatus === 'ON_SITE'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="ONLINE_AVAILABLE" className="bg-white text-slate-900">ONLINE_AVAILABLE</option>
                        <option value="EN_ROUTE" className="bg-white text-slate-900">EN_ROUTE</option>
                        <option value="ON_SITE" className="bg-white text-slate-900">ON_SITE</option>
                        <option value="REST_BREAK" className="bg-white text-slate-900">REST_BREAK</option>
                        <option value="OFF_SHIFT" className="bg-white text-slate-900">OFF_SHIFT</option>
                      </select>
                      <div className="text-[10px] font-mono-tabular text-slate-400 mt-1.5">
                        Shift: {tech.shiftHours} ({tech.hoursWorkedToday}h logged)
                      </div>
                    </div>
                  </div>

                  {/* Certifications Tags */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {tech.certifications.map((cert, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono-tabular px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Tech Dossier & Mobile Van Parts Search (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Van Inventory Inspector */}
          {selectedTech && (
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-xs text-slate-900">
                    Van Inventory: {selectedTech.name} ({selectedTech.id})
                  </span>
                </div>
                <span className="font-mono-tabular text-[11px] text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  {selectedTech.vanInventory.reduce((acc, p) => acc + p.qty, 0)} Items on Board
                </span>
              </div>

              <div className="mt-3.5 space-y-2">
                {selectedTech.vanInventory.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">{item.name}</div>
                      <div className="font-mono-tabular text-[10px] text-blue-700 mt-0.5">
                        Part #: {item.partNumber} • {item.category}
                      </div>
                    </div>
                    <span className="font-mono-tabular text-xs font-bold px-2.5 py-1 rounded-full bg-white text-slate-700 border border-slate-200 shadow-xs">
                      Qty: {item.qty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Global Fleet Van Part Finder */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono-tabular uppercase text-[10px] font-bold text-slate-500 tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4 text-blue-600" />
                Cross-Fleet Van Stock Finder
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3.5">
              Locate emergency parts on other active vehicles for mid-route rendezvous.
            </p>

            <div className="relative mb-3.5">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search across all mobile vans (e.g. Transducer, IGBT, V-Belt)..."
                value={partSearch}
                onChange={(e) => setPartSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto">
              {allVanParts.slice(0, 6).map((part, i) => (
                <div key={i} className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-slate-900 text-[11px]">{part.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono-tabular mt-0.5">
                      On board {part.techName} ({part.techId}) • {part.location.split('-')[0]}
                    </div>
                  </div>
                  <span className="font-mono-tabular text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {part.qty} avail
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
