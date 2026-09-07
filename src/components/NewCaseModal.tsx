import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  Building2, 
  AlertTriangle, 
  PlusCircle, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { FaultCase, SeverityLevel, FacilityType } from '../types';

interface NewCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCase: (newCase: Partial<FaultCase>) => void;
}

export const NewCaseModal: React.FC<NewCaseModalProps> = ({
  isOpen,
  onClose,
  onCreateCase
}) => {
  const [title, setTitle] = useState('');
  const [siteName, setSiteName] = useState('Equinix SV11 Silicon Valley Hyperscale');
  const [facilityType, setFacilityType] = useState<FacilityType>('Data Center');
  const [severity, setSeverity] = useState<SeverityLevel>('P1-CRITICAL');
  const [assetName, setAssetName] = useState('York YK Centrifugal Chiller 600T');
  const [assetTag, setAssetTag] = useState('EQX-CHL-05');
  const [errorCode, setErrorCode] = useState('ERR-610C: OIL_DIFFERENTIAL_PRESSURE_LOW');
  const [description, setDescription] = useState('Oil pump differential dropped to 12 PSI during continuous cooling load. Compressor low oil pressure interlock tripped.');
  const [isVipClient, setIsVipClient] = useState(true);
  const [vipClientName, setVipClientName] = useState('Equinix Global Tier-4 SLA');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateCase({
      title,
      siteName,
      facilityType,
      severity,
      assetName,
      assetTag,
      errorCode,
      description,
      isVipClient,
      vipClientName: isVipClient ? vipClientName : undefined,
      slaTargetMinutes: severity === 'P1-CRITICAL' ? 45 : severity === 'P2-HIGH' ? 90 : 240,
      slaMinutesRemaining: severity === 'P1-CRITICAL' ? 45 : severity === 'P2-HIGH' ? 90 : 240
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-50 text-slate-900 p-4.5 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center space-x-2.5">
            <PlusCircle className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-sm font-sans text-slate-900">
              Create Emergency Fault Ticket & Auto-Triage
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs font-sans">
          {/* Severity & VIP Selection */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[10px] font-mono-tabular font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Fault Severity Tier
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as SeverityLevel)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-hidden focus:border-blue-500 focus:bg-white"
              >
                <option value="P1-CRITICAL">P1-CRITICAL (45m SLA Max)</option>
                <option value="P2-HIGH">P2-HIGH (90m SLA Max)</option>
                <option value="P3-STANDARD">P3-STANDARD (240m SLA Max)</option>
                <option value="P4-LOW">P4-LOW (480m SLA Max)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono-tabular font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Facility Type Category
              </label>
              <select
                value={facilityType}
                onChange={(e) => setFacilityType(e.target.value as FacilityType)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:border-blue-500 focus:bg-white"
              >
                <option value="Data Center">Data Center</option>
                <option value="Biotech Cleanroom">Biotech Cleanroom</option>
                <option value="Hospital Facility">Hospital Facility</option>
                <option value="Airport Terminal">Airport Terminal</option>
                <option value="Financial Vault">Financial Vault</option>
              </select>
            </div>
          </div>

          {/* Fault Title */}
          <div>
            <label className="block text-[10px] font-mono-tabular font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Incident Title / Primary Symptom
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Centrifugal Chiller Low Oil Differential Pressure Trip"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Site Name */}
          <div>
            <label className="block text-[10px] font-mono-tabular font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Site Facility Name
            </label>
            <input
              type="text"
              required
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Asset Info */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[10px] font-mono-tabular font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Asset Name & Model
              </label>
              <input
                type="text"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono-tabular font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Asset Tag / Error Code
              </label>
              <input
                type="text"
                value={errorCode}
                onChange={(e) => setErrorCode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono-tabular focus:outline-hidden focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-mono-tabular font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Diagnostic Description & Telemetry Observations
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* VIP Account Flag */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
            <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-semibold text-amber-800">
              <input
                type="checkbox"
                checked={isVipClient}
                onChange={(e) => setIsVipClient(e.target.checked)}
                className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
              />
              <span>Tag as VIP Priority SLA Account</span>
            </label>
            {isVipClient && (
              <span className="text-[10px] font-mono-tabular text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                Level-1 Escalation
              </span>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer border border-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span>Create Ticket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
