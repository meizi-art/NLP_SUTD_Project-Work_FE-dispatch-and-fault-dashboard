import React, { useState } from 'react';
import { 
  Navigation, 
  Flame, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';
import { FaultCase, Technician } from '../../types';

interface MapViewProps {
  cases: FaultCase[];
  technicians: Technician[];
  selectedCaseId: string | null;
  onSelectCase: (c: FaultCase) => void;
  onQuickDispatch: (caseId: string, techId: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  cases,
  technicians,
  selectedCaseId,
  onSelectCase,
  onQuickDispatch
}) => {
  const [hoveredItem, setHoveredItem] = useState<{ type: 'case' | 'tech'; data: any } | null>(null);

  const activeCases = cases.filter(c => c.status !== 'RESOLVED');

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs relative">
      {/* Map Header / Legend Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-4">
          <span className="font-mono-tabular uppercase text-[10px] tracking-[0.15em] font-bold text-slate-700 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            SPATIAL DISPATCH RADAR • SECTOR WEST-BAY
          </span>
          <span className="text-slate-300">|</span>
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="flex items-center gap-1.5 text-red-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              P1 Critical
            </span>
            <span className="flex items-center gap-1.5 text-amber-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              P2 High
            </span>
            <span className="flex items-center gap-1.5 text-blue-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Active Tech Van
            </span>
          </div>
        </div>

        <div className="font-mono-tabular text-[11px] text-slate-400">
          GPS Coordinates: 37.7749° N, 122.4194° W • Real-Time Fleet Sync
        </div>
      </div>

      {/* Main Interactive Map Canvas */}
      <div className="relative w-full h-[540px] bg-slate-100 overflow-hidden select-none">
        {/* Subtle Map Grid Lines & Topography styling */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Simulated Coastline / Bay Geography paths */}
          <path d="M 120,0 Q 240,160 200,320 T 400,540" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
          <path d="M 500,0 Q 420,180 560,340 T 780,540" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.3" />
        </svg>

        {/* Dispatch Routes Vector Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {cases.filter(c => c.status === 'DISPATCHED' || c.status === 'EN_ROUTE').map((c) => {
            const assignedTech = technicians.find(t => t.id === c.assignedTechnicianId);
            if (!assignedTech) return null;
            return (
              <g key={`route-${c.id}`}>
                <line
                  x1={`${assignedTech.coordinates.x}%`}
                  y1={`${assignedTech.coordinates.y}%`}
                  x2={`${c.coordinates.x}%`}
                  y2={`${c.coordinates.y}%`}
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
                <circle
                  cx={`${(assignedTech.coordinates.x + c.coordinates.x) / 2}%`}
                  cy={`${(assignedTech.coordinates.y + c.coordinates.y) / 2}%`}
                  r="3.5"
                  fill="#2563eb"
                />
              </g>
            );
          })}
        </svg>

        {/* Sector Labels */}
        <div className="absolute top-4 left-6 text-[10px] font-mono-tabular text-slate-500 uppercase tracking-widest pointer-events-none font-bold">
          SECTOR 1 • NORTH BAY TECH HIGHWAY
        </div>
        <div className="absolute top-1/2 right-6 text-[10px] font-mono-tabular text-slate-500 uppercase tracking-widest pointer-events-none font-bold">
          SECTOR 4 • SILICON VALLEY HYPERSCALE CORRIDOR
        </div>
        <div className="absolute bottom-4 left-6 text-[10px] font-mono-tabular text-slate-500 uppercase tracking-widest pointer-events-none font-bold">
          SECTOR 2 • MISSION BAY BIOTECH CLUSTER
        </div>

        {/* Technician Fleet Pins */}
        {technicians.map((tech) => {
          const isAvailable = tech.currentStatus === 'ONLINE_AVAILABLE';
          return (
            <div
              key={tech.id}
              style={{ left: `${tech.coordinates.x}%`, top: `${tech.coordinates.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              onMouseEnter={() => setHoveredItem({ type: 'tech', data: tech })}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${
                isAvailable 
                  ? 'bg-emerald-600 border-emerald-500 text-white' 
                  : 'bg-blue-600 border-blue-500 text-white'
              }`}>
                <Truck className="w-4 h-4" />
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-white text-slate-900 text-[9px] font-mono-tabular font-semibold border border-slate-300 shadow-xs">
                {tech.id}
              </div>
            </div>
          );
        })}

        {/* Fault Case Markers */}
        {activeCases.map((c) => {
          const isSelected = selectedCaseId === c.id;
          const isP1 = c.severity === 'P1-CRITICAL';
          const isP2 = c.severity === 'P2-HIGH';

          return (
            <div
              key={c.id}
              style={{ left: `${c.coordinates.x}%`, top: `${c.coordinates.y}%` }}
              onClick={() => onSelectCase(c)}
              onMouseEnter={() => setHoveredItem({ type: 'case', data: c })}
              onMouseLeave={() => setHoveredItem(null)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-115'
              }`}
            >
              {/* Pulsing ring for urgent cases */}
              {isP1 && (
                <span className="absolute -inset-2 rounded-full bg-red-500/40 animate-ping"></span>
              )}
              {isP2 && (
                <span className="absolute -inset-1.5 rounded-full bg-amber-500/30 animate-pulse"></span>
              )}

              {/* Marker pin */}
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shadow-lg ${
                isP1 
                  ? 'bg-red-600 border-red-500 text-white' 
                  : isP2 
                    ? 'bg-amber-600 border-amber-500 text-white' 
                    : 'bg-blue-600 border-blue-500 text-white'
              }`}>
                {isP1 ? <Flame className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
              </div>

              {/* Badge Label */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-white text-slate-900 text-[10px] font-mono-tabular font-bold border border-slate-300 shadow-xs">
                {c.id} ({c.slaMinutesRemaining}m)
              </div>
            </div>
          );
        })}

        {/* Floating Context Inspection Popover */}
        {hoveredItem && (
          <div className="absolute bottom-4 right-4 z-40 w-80 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl p-3.5 text-xs pointer-events-auto">
            {hoveredItem.type === 'case' ? (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono-tabular font-bold text-slate-900">{hoveredItem.data.id}</span>
                  <span className="font-mono-tabular px-2 py-0.5 rounded-full bg-red-50 text-red-700 font-bold text-[10px] border border-red-200">
                    {hoveredItem.data.severity}
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 line-clamp-1">{hoveredItem.data.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{hoveredItem.data.siteName}</p>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between font-mono-tabular text-[11px]">
                  <span className="text-slate-500">SLA Remaining:</span>
                  <span className="font-bold text-red-600">{hoveredItem.data.slaMinutesRemaining} mins</span>
                </div>
                <button
                  onClick={() => onSelectCase(hoveredItem.data)}
                  className="mt-2.5 w-full py-1.5 rounded-xl bg-blue-600 text-white text-center font-semibold hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
                >
                  Open Inspector Dossier
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono-tabular font-bold text-blue-700">{hoveredItem.data.id}</span>
                  <span className="font-mono-tabular px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                    {hoveredItem.data.currentStatus}
                  </span>
                </div>
                <h4 className="font-bold text-slate-800">{hoveredItem.data.name}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{hoveredItem.data.currentLocationName}</p>
                <div className="mt-2.5 text-[10px] space-y-1 bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <div className="font-semibold text-slate-700">Certifications:</div>
                  <div className="text-slate-500 truncate">{hoveredItem.data.certifications.join(', ')}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
