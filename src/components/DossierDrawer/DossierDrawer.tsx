import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  Clock, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  KeyRound, 
  Phone, 
  FileText, 
  Cpu, 
  Activity, 
  Wrench,
  Lock,
  UserCheck,
  ChevronRight,
  ExternalLink,
  Package
} from 'lucide-react';
import { FaultCase, Technician } from '../../types';

interface DossierDrawerProps {
  caseItem: FaultCase | null;
  technicians: Technician[];
  onClose: () => void;
  onDispatchTechnician: (caseId: string, technicianId: string) => void;
  onResolveCase: (caseId: string) => void;
  onEscalateCase: (caseId: string) => void;
}

export const DossierDrawer: React.FC<DossierDrawerProps> = ({
  caseItem,
  technicians,
  onClose,
  onDispatchTechnician,
  onResolveCase,
  onEscalateCase
}) => {
  const [activeTab, setActiveTab] = useState<'match' | 'telemetry' | 'security' | 'parts' | 'audit'>('match');
  const [overrideTechId, setOverrideTechId] = useState<string>('');

  if (!caseItem) return null;

  const isCritical = caseItem.severity === 'P1-CRITICAL';
  const isBreached = caseItem.slaMinutesRemaining <= 0;
  const isSlaUrgent = caseItem.slaMinutesRemaining < 30 && caseItem.status !== 'RESOLVED';
  const assignedTech = technicians.find(t => t.id === caseItem.assignedTechnicianId);

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] md:w-[480px] bg-white border-l border-slate-200 shadow-2xl flex flex-col transition-all duration-300">
      {/* Drawer Header */}
      <div className="bg-slate-50 text-slate-900 p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-mono-tabular text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {caseItem.id}
            </span>
            <span className={`font-mono-tabular text-xs font-bold px-2.5 py-0.5 rounded-full ${
              isCritical ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {caseItem.severity}
            </span>
            {caseItem.isVipClient && (
              <span className="text-[10px] font-mono-tabular uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                VIP PROTOCOL
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-sm font-bold text-slate-900 mt-2.5 font-sans line-clamp-2">
          {caseItem.title}
        </h3>
        <p className="text-xs text-slate-500 font-mono-tabular mt-0.5">
          {caseItem.assetTag} • {caseItem.errorCode}
        </p>

        {/* SLA Telemetry Countdown Ribbon */}
        <div className="mt-3 p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2">
            <Clock className={`w-4 h-4 ${isSlaUrgent ? 'text-red-500 animate-pulse' : 'text-slate-400'}`} />
            <span className="text-xs font-mono-tabular text-slate-500 font-medium">SLA WINDOW:</span>
          </div>
          <div className="text-right">
            {caseItem.status === 'RESOLVED' ? (
              <span className="text-xs font-mono-tabular text-emerald-600 font-bold">
                RESOLVED WITHIN SLA
              </span>
            ) : isBreached ? (
              <span className="text-xs font-mono-tabular text-red-600 font-bold animate-pulse">
                SLA BREACHED (+{Math.abs(caseItem.slaMinutesRemaining)}m)
              </span>
            ) : (
              <span className={`text-xs font-mono-tabular font-bold ${
                isSlaUrgent ? 'text-red-600 animate-pulse' : 'text-blue-700'
              }`}>
                {caseItem.slaMinutesRemaining} MINS REMAINING ({caseItem.slaTargetMinutes}m limit)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Drawer Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 px-3 flex items-center space-x-1 text-xs font-mono-tabular overflow-x-auto">
        <button
          onClick={() => setActiveTab('match')}
          className={`py-2.5 px-3 border-b-2 font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer ${
            activeTab === 'match'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Match ({caseItem.recommendedTechnicians.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('telemetry')}
          className={`py-2.5 px-3 border-b-2 font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer ${
            activeTab === 'telemetry'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Telemetry ({caseItem.telemetryReadings.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`py-2.5 px-3 border-b-2 font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer ${
            activeTab === 'security'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Site Access</span>
        </button>
        <button
          onClick={() => setActiveTab('parts')}
          className={`py-2.5 px-3 border-b-2 font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer ${
            activeTab === 'parts'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Parts ({caseItem.requiredParts.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`py-2.5 px-3 border-b-2 font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer ${
            activeTab === 'audit'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Audit Log</span>
        </button>
      </div>

      {/* Drawer Content Area */}
      <div className="flex-1 p-4 overflow-y-auto text-xs space-y-4 font-sans bg-slate-50">
        {/* TAB 1: AI Match & Dispatch Engine */}
        {activeTab === 'match' && (
          <div className="space-y-3">
            {/* Current Assignment Status Banner */}
            {assignedTech ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tabular uppercase text-[10px] font-bold text-emerald-800">
                    DISPATCHED TECHNICIAN
                  </span>
                  <span className="text-[10px] font-mono-tabular px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
                    {assignedTech.currentStatus}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center space-x-3">
                  <img
                    src={assignedTech.avatarUrl}
                    alt={assignedTech.name}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-300"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{assignedTech.name}</h4>
                    <p className="text-slate-500 text-[11px]">{assignedTech.id} • {assignedTech.phone}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900 text-xs">
                <div className="flex items-center space-x-2 font-semibold text-slate-900">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Matching Engine: Evaluated 6 Active Technicians</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-600">
                  Weighted for Proximity (30%), Skill Certification (40%), Van Inventory (20%), and Fatigue Index (10%).
                </p>
              </div>
            )}

            {/* Candidate Match Cards */}
            <div className="space-y-2.5">
              {caseItem.recommendedTechnicians.map((match) => {
                const tech = technicians.find(t => t.id === match.technicianId);
                if (!tech) return null;

                const isAssignedToThis = caseItem.assignedTechnicianId === tech.id;

                return (
                  <div
                    key={match.technicianId}
                    className={`p-3.5 border rounded-2xl transition-all shadow-xs ${
                      isAssignedToThis 
                        ? 'border-emerald-300 bg-emerald-50/70' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={tech.avatarUrl}
                          alt={tech.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="font-bold text-slate-900 text-xs">{tech.name}</span>
                            <span className="font-mono-tabular text-[10px] text-slate-500">({tech.id})</span>
                          </div>
                          <span className="text-[11px] text-slate-500 block">{tech.currentLocationName}</span>
                        </div>
                      </div>

                      {/* Score Pill */}
                      <div className="text-right">
                        <span className="font-mono-tabular text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                          {match.overallScore}% Fit
                        </span>
                        <div className="text-[10px] font-mono-tabular text-slate-400 mt-0.5">
                          {match.proximityMinutes} mins away
                        </div>
                      </div>
                    </div>

                    {/* Algorithmic Match Reasons */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1">
                      {match.matchReasons.map((reason, idx) => (
                        <div key={idx} className="flex items-center space-x-1.5 text-[11px] text-slate-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{reason}</span>
                        </div>
                      ))}
                      {match.missingCertifications && match.missingCertifications.length > 0 && (
                        <div className="flex items-center space-x-1.5 text-[11px] text-amber-700">
                          <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>Missing: {match.missingCertifications.join(', ')}</span>
                        </div>
                      )}
                    </div>

                    {/* Dispatch Action */}
                    {!isAssignedToThis && caseItem.status !== 'RESOLVED' && (
                      <button
                        onClick={() => onDispatchTechnician(caseItem.id, tech.id)}
                        className="mt-3 w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center space-x-1.5 text-xs transition-colors cursor-pointer shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch {tech.name.split(' ')[0]} to Site</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Manual Override Dropdown */}
            {caseItem.status !== 'RESOLVED' && (
              <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <label className="block text-[10px] font-mono-tabular font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Manual Dispatch Override
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={overrideTechId}
                    onChange={(e) => setOverrideTechId(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden focus:border-blue-500 focus:bg-white"
                  >
                    <option value="">Select Technician from Roster...</option>
                    {technicians.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.id}) - {t.currentStatus}
                      </option>
                    ))}
                  </select>
                  <button
                    disabled={!overrideTechId}
                    onClick={() => {
                      if (overrideTechId) onDispatchTechnician(caseItem.id, overrideTechId);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-40 transition-colors cursor-pointer shadow-xs"
                  >
                    Override
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Live Asset Telemetry */}
        {activeTab === 'telemetry' && (
          <div className="space-y-3">
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{caseItem.assetName}</span>
                <span className="font-mono-tabular text-[11px] text-blue-700">{caseItem.assetTag}</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">{caseItem.description}</p>
            </div>

            <div className="space-y-2">
              <span className="font-mono-tabular uppercase text-[10px] font-bold text-slate-500 tracking-wider block">
                SCADA TELEMETRY SENSORS
              </span>
              {caseItem.telemetryReadings.map((reading, idx) => {
                const isCrit = reading.status === 'critical';
                const isWarn = reading.status === 'warning';

                return (
                  <div 
                    key={idx}
                    className={`p-3 rounded-2xl border flex items-center justify-between shadow-xs ${
                      isCrit 
                        ? 'bg-red-50 border-red-200' 
                        : isWarn 
                          ? 'bg-amber-50 border-amber-200' 
                          : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-800 text-xs">{reading.metric}</div>
                      <div className="text-[10px] font-mono-tabular text-slate-400">
                        Normal: {reading.normalRange}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`font-mono-tabular text-sm font-bold ${
                        isCrit ? 'text-red-700' : isWarn ? 'text-amber-700' : 'text-slate-900'
                      }`}>
                        {reading.value}
                      </span>
                      <span className={`block text-[9px] font-mono-tabular font-semibold uppercase ${
                        isCrit ? 'text-red-700' : isWarn ? 'text-amber-700' : 'text-emerald-700'
                      }`}>
                        {reading.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: Site Access & Security Protocol */}
        {activeTab === 'security' && (
          <div className="space-y-3">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs mb-1">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>{caseItem.securityProtocol.clearanceLevel}</span>
              </div>
              <p className="text-[11px] text-amber-900/80">
                {caseItem.securityProtocol.notes}
              </p>
            </div>

            {/* Gate Code and Security Contact */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <span className="text-[10px] font-mono-tabular text-slate-500 uppercase block font-semibold">
                  Access Code
                </span>
                <span className="font-mono-tabular font-bold text-sm text-blue-700 mt-0.5 block">
                  {caseItem.securityProtocol.accessCode}
                </span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <span className="text-[10px] font-mono-tabular text-slate-500 uppercase block font-semibold">
                  Site Lead
                </span>
                <span className="font-bold text-xs text-slate-900 block truncate mt-0.5">
                  {caseItem.securityProtocol.gateContact}
                </span>
                <span className="font-mono-tabular text-[10px] text-blue-600">
                  {caseItem.securityProtocol.gatePhone}
                </span>
              </div>
            </div>

            {/* Mandatory PPE Checklist */}
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-[10px] font-mono-tabular text-slate-500 uppercase block font-bold mb-2">
                MANDATORY FIELD PPE REQUIRED
              </span>
              <div className="grid grid-cols-2 gap-2">
                {caseItem.securityProtocol.ppeRequired.map((ppe, i) => (
                  <div key={i} className="flex items-center space-x-1.5 text-[11px] text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{ppe}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* LOTO Notice */}
            {caseItem.securityProtocol.lotoRequired && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-2 text-red-800">
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <span className="font-bold text-red-700">LOTO Mandatory:</span> High-voltage isolation protocol requires verified multimeter zero-energy check before opening panels.
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Required Parts & Inventory */}
        {activeTab === 'parts' && (
          <div className="space-y-3">
            <span className="font-mono-tabular uppercase text-[10px] font-bold text-slate-500 tracking-wider block">
              DIAGNOSTIC REPLACEMENT BOM
            </span>
            {caseItem.requiredParts.length === 0 ? (
              <div className="p-4 text-center text-slate-500 text-xs italic bg-white border border-slate-200 rounded-2xl">
                No physical replacement parts flagged for initial inspection.
              </div>
            ) : (
              caseItem.requiredParts.map((part, idx) => (
                <div key={idx} className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-xs">
                  <div>
                    <div className="font-bold text-slate-900 text-xs">{part.name}</div>
                    <div className="font-mono-tabular text-[11px] text-blue-700">
                      Part #: {part.partNumber}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-tabular font-bold text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                      Qty: {part.requiredQty}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 5: Audit Trail Logs */}
        {activeTab === 'audit' && (
          <div className="space-y-2">
            <span className="font-mono-tabular uppercase text-[10px] font-bold text-slate-500 tracking-wider block">
              TIMESTAMPED AUDIT TRAIL
            </span>
            {caseItem.auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-white border border-slate-200 rounded-2xl text-[11px] shadow-xs">
                <div className="flex items-center justify-between font-mono-tabular text-slate-400">
                  <span className="font-semibold text-slate-900">{log.actor}</span>
                  <span>{log.timestamp}</span>
                </div>
                <div className="font-medium text-slate-700 mt-0.5">{log.action}</div>
                {log.details && (
                  <div className="text-[10px] text-slate-500 font-mono-tabular mt-0.5">
                    {log.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Drawer Action Footer */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2.5">
        {caseItem.status !== 'RESOLVED' ? (
          <>
            <button
              onClick={() => onEscalateCase(caseItem.id)}
              className="px-3.5 py-2.5 rounded-2xl bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span>Escalate Tier-3</span>
            </button>

            <button
              onClick={() => onResolveCase(caseItem.id)}
              className="flex-1 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sign Off Remediated</span>
            </button>
          </>
        ) : (
          <div className="w-full py-2 text-center font-mono-tabular text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold">
            CASE RESOLVED & AUDITED
          </div>
        )}
      </div>
    </div>
  );
};
