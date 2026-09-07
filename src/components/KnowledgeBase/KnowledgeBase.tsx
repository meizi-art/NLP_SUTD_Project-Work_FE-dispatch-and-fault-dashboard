import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  FileText, 
  Building2, 
  ShieldCheck, 
  Phone, 
  Download, 
  ExternalLink,
  ChevronRight,
  Cpu,
  Send,
  HelpCircle,
  Wrench
} from 'lucide-react';
import { SITE_KNOWLEDGE_BASE } from '../../data/mockData';
import { SiteKnowledgeItem } from '../../types';

export const KnowledgeBase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSite, setSelectedSite] = useState<SiteKnowledgeItem>(SITE_KNOWLEDGE_BASE[0]);
  const [diagnosticQuery, setDiagnosticQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<{
    code: string;
    rootCause: string;
    actionSteps: string[];
    requiredParts: string[];
    safetyNote: string;
  } | null>({
    code: 'ERR-702B: CONDENSER_PRESSURE_LIMIT_EXCEEDED (Carrier 19XR)',
    rootCause: 'Refrigerant discharge pressure exceeded 310 PSI safety limit. Common causes include cooling tower fan VFD trip, condenser water scale fouling, or stuck TXV thermal expansion valve.',
    actionSteps: [
      '1. Verify cooling tower secondary loop pump #3 flow rate (>2,400 GPM)',
      '2. Inspect TXV sensing bulb thermal contact at compressor suction line',
      '3. Hook up calibrated 0-500 PSI manifold gauge to verify SCADA transducer accuracy',
      '4. Clear Carrier ComfortLink alarm code 702B via diagnostic service console'
    ],
    requiredParts: ['SEN-PT-100 (Pressure Transducer)', 'CAR-CH-994 (Expansion Valve TXV 45T)'],
    safetyNote: 'LOTO Lockout required if servicing condenser water strainer. Wear Arc Flash Level 2 face protection near 480V 800A starter panel.'
  });

  const filteredSites = SITE_KNOWLEDGE_BASE.filter(s => 
    s.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.facilityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.primaryEquipment.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAskAiSolver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagnosticQuery.trim()) return;

    const q = diagnosticQuery.toLowerCase();
    if (q.includes('ups') || q.includes('ripple') || q.includes('eaton') || q.includes('304d')) {
      setAiResponse({
        code: 'ERR-304D: DC_LINK_RIPPLE_VOLTAGE_CRITICAL (Eaton 9395 500kVA)',
        rootCause: 'DC bus harmonic ripple exceeded 15% threshold, indicating degraded electrolytic capacitor filter bank or failing IGBT snubber diode.',
        actionSteps: [
          '1. Transfer UPS load to Static Maintenance Bypass',
          '2. Verify DC bus discharge to < 50V with Fluke calibrated multimeter before touching busbars',
          '3. Measure capacitance across Phase A/B/C banks with LCR meter (nominal 450V 4700uF)',
          '4. Torque replacement capacitor terminal screws to 28 in-lbs'
        ],
        requiredParts: ['CAP-DC-450V (DC Bus Capacitor)', 'IGBT-MOD-1200V (Infineon Dual IGBT)'],
        safetyNote: 'NFPA 70E Category 4 Arc Flash PPE mandatory. Wait minimum 5 minutes for internal bleed resistors to discharge capacitors.'
      });
    } else if (q.includes('baggage') || q.includes('diverter') || q.includes('siemens') || q.includes('518a')) {
      setAiResponse({
        code: 'ERR-518A: OPTICAL_SYNC_TIMEOUT (Siemens S7-1500 / Vanderlande)',
        rootCause: 'Optical barcode scanner and laser encoder lag >40ms at diverter vane #4, causing sorting trigger misfire.',
        actionSteps: [
          '1. Clean optical laser sensor lens with isopropyl alcohol lint-free wipe',
          '2. Check Profinet ET200SP I/O bus cable shielding and packet drop counters',
          '3. Test pneumatic cylinder pressure regulator (verify steady 85 PSI)',
          '4. Re-calibrate diverter zero-position encoder via TIA Portal HMI'
        ],
        requiredParts: ['OPT-SICK-102 (Laser Array Scanner Sensor)', 'SIEM-IO-ET200 (Digital Input Module)'],
        safetyNote: 'Ensure conveyor pull-cord is engaged before reaching into sorting diverter sweep area.'
      });
    } else {
      setAiResponse({
        code: `AI Diagnostic Breakdown: ${diagnosticQuery.toUpperCase()}`,
        rootCause: 'Thermal and electrical telemetry signature indicates control feedback loop deviation under high environmental load.',
        actionSteps: [
          '1. Inspect 24VDC control power supply ripple and ground reference',
          '2. Check sensory telemetry transducers against calibrated handheld meter',
          '3. Verify physical actuator linkages and damper seating',
          '4. Check FMC site knowledge schematics for secondary isolation bypass'
        ],
        requiredParts: ['Replacement sensor transducer', 'Control relay module'],
        safetyNote: 'Adhere to site-specific PPE and clearance guidelines before entering secure equipment vault.'
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Site Knowledge Base & Diagnostic Solver
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Access secure facility protocols, electrical schematics, HVAC zone maps, and interactive fault code diagnostic blueprints.
          </p>
        </div>

        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search facility name, equipment, or schematic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* 2-Column Layout: Site Dossiers on Left (6 cols), AI Diagnostic Assistant on Right (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Site Access & Schematics (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          {/* Site Selector Pills */}
          <div className="flex space-x-2 overflow-x-auto pb-1">
            {filteredSites.map((site) => (
              <button
                key={site.id}
                onClick={() => setSelectedSite(site)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                  selectedSite.id === site.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {site.siteName.split(' ')[0]} ({site.facilityType})
              </button>
            ))}
          </div>

          {/* Site Detail Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between pb-3.5 border-b border-slate-100">
              <div>
                <span className="font-mono-tabular text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {selectedSite.facilityType} • ID: {selectedSite.id}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-2">{selectedSite.siteName}</h3>
              </div>
              <span className="font-mono-tabular text-[11px] text-slate-400">
                Updated: {selectedSite.lastUpdated}
              </span>
            </div>

            {/* Access Protocol */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-[10px] font-mono-tabular uppercase font-bold text-slate-600 block mb-1">
                Facility Security & Access Protocol
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">{selectedSite.accessGuide}</p>
            </div>

            {/* Schematics & HVAC */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <span className="text-[10px] font-mono-tabular uppercase font-bold text-blue-700 block mb-1">
                  Electrical Single-Line Schematic
                </span>
                <p className="text-xs font-mono-tabular font-bold text-slate-900">
                  {selectedSite.powerSchematicCode}
                </p>
                <div className="mt-2 text-[10px] text-blue-600 flex items-center gap-1 font-semibold cursor-pointer hover:underline">
                  <Download className="w-3 h-3" /> Download DWG Vector
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <span className="text-[10px] font-mono-tabular uppercase font-bold text-emerald-700 block mb-1">
                  HVAC Pressure Zone Rule
                </span>
                <p className="text-xs text-slate-700">{selectedSite.hvacZoneGuide}</p>
              </div>
            </div>

            {/* Primary Equipment On-Site */}
            <div>
              <span className="text-[10px] font-mono-tabular uppercase font-bold text-slate-500 tracking-wider block mb-2">
                CRITICAL ASSETS ON SITE
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {selectedSite.primaryEquipment.map((eq, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 font-medium">
                    {eq}
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-[10px] font-mono-tabular uppercase font-bold text-slate-500 tracking-wider block mb-2">
                SITE EMERGENCY CONTACTS
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {selectedSite.emergencyContacts.map((contact, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="text-slate-500 text-[10px]">{contact.role}</div>
                    <div className="font-bold text-slate-900 mt-0.5">{contact.name}</div>
                    <div className="font-mono-tabular text-blue-600 text-[11px] mt-0.5">{contact.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive AI Diagnostic Solver (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
            <div className="flex items-center space-x-2 pb-3.5 border-b border-slate-100">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-xs text-slate-900 uppercase font-mono-tabular">
                Diagnostic Assistant • Root Cause Solver
              </h3>
            </div>

            {/* Query Form */}
            <form onSubmit={handleAskAiSolver} className="mt-3.5 space-y-2.5">
              <label className="block text-[11px] font-mono-tabular text-slate-600 font-medium">
                Enter Error Code (e.g. ERR-702B, ERR-304D, ERR-518A) or Symptom Description:
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="e.g. ERR-702B Chiller surge or DC link ripple 15%..."
                  value={diagnosticQuery}
                  onChange={(e) => setDiagnosticQuery(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-colors shadow-xs"
                >
                  <Send className="w-3 h-3" />
                  <span>Analyze</span>
                </button>
              </div>

              {/* Quick Prompt Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setDiagnosticQuery('ERR-702B Chiller Surge')}
                  className="text-[10px] font-mono-tabular px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer"
                >
                  #ERR-702B (Chiller)
                </button>
                <button
                  type="button"
                  onClick={() => setDiagnosticQuery('ERR-304D UPS DC Bus Ripple')}
                  className="text-[10px] font-mono-tabular px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer"
                >
                  #ERR-304D (Eaton UPS)
                </button>
                <button
                  type="button"
                  onClick={() => setDiagnosticQuery('ERR-518A Baggage Diverter Sync')}
                  className="text-[10px] font-mono-tabular px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer"
                >
                  #ERR-518A (Siemens PLC)
                </button>
              </div>
            </form>

            {/* AI Diagnostic Output Blueprint */}
            {aiResponse && (
              <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tabular font-bold text-blue-700 text-[11px]">
                    {aiResponse.code}
                  </span>
                  <span className="text-[10px] font-mono-tabular px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold border border-blue-200">
                    VERIFIED FMC BLUEPRINT
                  </span>
                </div>

                {/* Root Cause */}
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5 text-xs">Probable Root Cause:</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">{aiResponse.rootCause}</p>
                </div>

                {/* Action Steps */}
                <div>
                  <span className="font-bold text-slate-900 block mb-1 text-xs">Step-by-Step Diagnostic Remediation:</span>
                  <div className="space-y-1.5 text-slate-700 text-[11px]">
                    {aiResponse.actionSteps.map((step, idx) => (
                      <div key={idx} className="p-2 bg-white border border-slate-200 rounded-xl">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Replacement Parts BOM */}
                <div>
                  <span className="font-bold text-slate-900 block mb-1 text-xs">Required Replacement Stock:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {aiResponse.requiredParts.map((p, i) => (
                      <span key={i} className="font-mono-tabular text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Safety LOTO */}
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-800 text-[11px]">
                  <span className="font-bold text-red-700">Safety Directive: </span>
                  {aiResponse.safetyNote}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
