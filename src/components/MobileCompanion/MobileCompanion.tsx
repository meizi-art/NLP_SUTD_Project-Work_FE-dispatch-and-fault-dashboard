import React, { useState } from 'react';
import { 
  Smartphone, 
  MapPin, 
  ShieldAlert, 
  CheckCircle2, 
  Send, 
  KeyRound, 
  Phone, 
  Navigation, 
  Clock, 
  Wrench, 
  FileCheck, 
  PenTool,
  ChevronRight,
  User,
  Radio,
  Sparkles
} from 'lucide-react';
import { FaultCase, Technician } from '../../types';

interface MobileCompanionProps {
  cases: FaultCase[];
  technicians: Technician[];
  onUpdateStatus: (caseId: string, status: any) => void;
}

export const MobileCompanion: React.FC<MobileCompanionProps> = ({
  cases,
  technicians,
  onUpdateStatus
}) => {
  const [selectedTechId, setSelectedTechId] = useState<string>('TECH-104');
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [lotoChecked, setLotoChecked] = useState(false);
  const [ppeChecked, setPpeChecked] = useState(false);
  const [signatureName, setSignatureName] = useState('David Sterling');
  const [isSigned, setIsSigned] = useState(false);

  const currentTech = technicians.find(t => t.id === selectedTechId) || technicians[0];
  const assignedCases = cases.filter(c => c.assignedTechnicianId === currentTech.id);
  const activeCase = assignedCases[0] || cases[0]; // fallback to first case for simulation

  const steps = [
    { id: 'accept', label: '1. Dispatch & Route' },
    { id: 'gate', label: '2. Site Gate Access' },
    { id: 'safety', label: '3. LOTO Safety Sign-off' },
    { id: 'repair', label: '4. Diagnostic Repair' },
    { id: 'signoff', label: '5. Client Sign-off' }
  ];

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {/* Mobile Mode Header Banner */}
      <div className="bg-white text-slate-900 p-5 rounded-3xl shadow-xs border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Smartphone className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold font-sans">
              Transit Engineer Companion
            </h2>
          </div>
          <span className="font-mono-tabular text-[10px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">
            OFFLINE-READY V4.8
          </span>
        </div>

        {/* Technician Switcher for Dispatcher Simulation */}
        <div className="mt-3.5 flex items-center space-x-2.5 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
          <span className="text-[11px] font-mono-tabular text-slate-500 shrink-0">Simulating Tech:</span>
          <select
            value={selectedTechId}
            onChange={(e) => setSelectedTechId(e.target.value)}
            className="flex-1 bg-white text-slate-800 text-xs rounded-xl px-2.5 py-1.5 border border-slate-200 focus:outline-hidden focus:border-blue-500 cursor-pointer shadow-xs"
          >
            {technicians.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.id}) • {t.currentStatus}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Workflow Step Tracker */}
      <div className="bg-white border border-slate-200 rounded-3xl p-2.5 shadow-xs flex items-center justify-between text-xs font-mono-tabular overflow-x-auto gap-1">
        {steps.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => setStepIndex(idx)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors flex items-center space-x-1.5 cursor-pointer ${
              stepIndex === idx 
                ? 'bg-blue-600 text-white font-bold shadow-xs' 
                : stepIndex > idx 
                  ? 'text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200' 
                  : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {stepIndex > idx ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : null}
            <span>{step.label}</span>
          </button>
        ))}
      </div>

      {/* Main Active Step Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
        {/* Active Ticket Banner */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="font-mono-tabular text-xs font-bold text-blue-700">
              {activeCase.id} • {activeCase.severity}
            </span>
            <span className="font-mono-tabular text-[11px] text-red-600 font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              {activeCase.slaMinutesRemaining}m SLA remaining
            </span>
          </div>
          <h3 className="font-bold text-slate-900 text-sm mt-1.5">{activeCase.title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{activeCase.siteName} • {activeCase.siteAddress}</p>
        </div>

        {/* STEP 0: Dispatch & Route */}
        {stepIndex === 0 && (
          <div className="space-y-3.5">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
              <span className="text-[11px] font-mono-tabular uppercase font-bold text-slate-700 block">
                Turn-by-Turn GPS Vector Routing
              </span>
              <div className="flex items-center justify-between text-xs font-mono-tabular">
                <span className="text-slate-500">Estimated Drive Time:</span>
                <span className="font-bold text-blue-700">11 mins (4.8 miles via US-101 S)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono-tabular">
                <span className="text-slate-500">Traffic Congestion:</span>
                <span className="font-bold text-emerald-700">Light (Flow 58 MPH)</span>
              </div>
            </div>

            <button
              onClick={() => {
                onUpdateStatus(activeCase.id, 'EN_ROUTE');
                setStepIndex(1);
              }}
              className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-xs transition-colors cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Accept Dispatch & Start GPS Navigation</span>
            </button>
          </div>
        )}

        {/* STEP 1: Site Gate Access */}
        {stepIndex === 1 && (
          <div className="space-y-3.5">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2.5">
              <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs">
                <KeyRound className="w-4 h-4 text-amber-600" />
                <span>Security Gate Access Clearance</span>
              </div>
              <div className="p-3 bg-white border border-amber-200 rounded-xl font-mono-tabular text-center shadow-xs">
                <span className="text-[10px] text-slate-500 uppercase block">Man-Trap Keypad Code:</span>
                <span className="text-xl font-bold text-amber-700 tracking-widest">
                  {activeCase.securityProtocol.accessCode}
                </span>
              </div>
              <p className="text-xs text-amber-900/80">
                {activeCase.securityProtocol.notes}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-mono-tabular font-bold">
                  Site Facility Contact
                </span>
                <span className="font-bold text-slate-900 mt-0.5 block">{activeCase.securityProtocol.gateContact}</span>
              </div>
              <a
                href={`tel:${activeCase.securityProtocol.gatePhone}`}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-1.5 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Gate</span>
              </a>
            </div>

            <button
              onClick={() => {
                onUpdateStatus(activeCase.id, 'ON_SITE');
                setStepIndex(2);
              }}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Arrived On-Site at Security Portal</span>
            </button>
          </div>
        )}

        {/* STEP 2: Safety & LOTO Sign-off */}
        {stepIndex === 2 && (
          <div className="space-y-3.5">
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-red-700 font-bold text-xs">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span>Mandatory NFPA 70E / OSHA Zero-Energy Check</span>
              </div>
              <p className="text-xs text-red-800">
                You must verify Lock-Out / Tag-Out padlock attachment and zero-voltage calibration with certified multimeter before panel ingress.
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <label className="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={lotoChecked}
                  onChange={(e) => setLotoChecked(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded bg-white border-slate-300"
                />
                <span className="font-medium text-slate-700">
                  LOTO Padlock #402 attached & zero-voltage verified on 480V busbars
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={ppeChecked}
                  onChange={(e) => setPpeChecked(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded bg-white border-slate-300"
                />
                <span className="font-medium text-slate-700">
                  All mandatory PPE donned: {activeCase.securityProtocol.ppeRequired.join(', ')}
                </span>
              </label>
            </div>

            <button
              disabled={!lotoChecked || !ppeChecked}
              onClick={() => setStepIndex(3)}
              className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center space-x-2 disabled:opacity-40 transition-colors cursor-pointer shadow-xs"
            >
              <FileCheck className="w-4 h-4" />
              <span>Safety Checklist Confirmed &bull; Begin Remediation</span>
            </button>
          </div>
        )}

        {/* STEP 3: Diagnostic Repair */}
        {stepIndex === 3 && (
          <div className="space-y-3.5">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-[10px] font-mono-tabular uppercase font-bold text-slate-500 block mb-1">
                Equipment Fault Blueprint
              </span>
              <p className="text-xs text-slate-900 font-semibold">{activeCase.assetName}</p>
              <p className="text-[11px] text-slate-500 mt-1">{activeCase.description}</p>
            </div>

            {/* Parts BOM Verification */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono-tabular uppercase font-bold text-slate-500 block">
                Installed Replacement Parts
              </span>
              {activeCase.requiredParts.map((p, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{p.name}</span>
                    <span className="font-mono-tabular text-[10px] text-slate-500 block">{p.partNumber}</span>
                  </div>
                  <span className="font-mono-tabular text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    1 Used from Van
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStepIndex(4)}
              className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs"
            >
              <Wrench className="w-4 h-4" />
              <span>Repair Complete &bull; Proceed to Sign-off</span>
            </button>
          </div>
        )}

        {/* STEP 4: Client Sign-off */}
        {stepIndex === 4 && (
          <div className="space-y-3.5">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Remediation Complete &bull; Customer Verification</span>
              </div>
              <p className="text-xs text-emerald-800 mt-0.5">
                Chiller pressure normalized to 215 PSI. SCADA interlock cleared and system running under load.
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <label className="block text-[11px] font-mono-tabular font-bold text-slate-700 uppercase">
                Customer / Facilities Manager Name:
              </label>
              <input
                type="text"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
              />

              {/* Digital Signature Simulated Pad */}
              <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center">
                <span className="text-[10px] font-mono-tabular text-slate-400 uppercase block mb-2">
                  Client Digital Signature Pad
                </span>
                <div 
                  onClick={() => setIsSigned(true)}
                  className="h-24 bg-white border border-slate-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-blue-400"
                >
                  {isSigned ? (
                    <span className="font-serif italic text-2xl text-blue-700 select-none">
                      {signatureName || 'D. Sterling'}
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs flex items-center gap-1.5">
                      <PenTool className="w-3.5 h-3.5" /> Tap to capture customer sign-off signature
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              disabled={!isSigned}
              onClick={() => {
                onUpdateStatus(activeCase.id, 'RESOLVED');
                setStepIndex(0);
              }}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center space-x-2 disabled:opacity-40 transition-colors cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Final FMC SLA Resolution</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
