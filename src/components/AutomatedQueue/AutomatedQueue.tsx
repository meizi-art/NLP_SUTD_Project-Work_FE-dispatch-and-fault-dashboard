import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Sliders, 
  Clock, 
  ShieldCheck, 
  AlertOctagon, 
  Check, 
  ArrowRight,
  RefreshCw,
  Cpu
} from 'lucide-react';
import { FaultCase, Technician } from '../../types';

interface AutomatedQueueProps {
  cases: FaultCase[];
  technicians: Technician[];
  onDispatch: (caseId: string, technicianId: string) => void;
  onBulkDispatch: () => void;
}

export const AutomatedQueue: React.FC<AutomatedQueueProps> = ({
  cases,
  technicians,
  onDispatch,
  onBulkDispatch
}) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [weights, setWeights] = useState({
    proximity: 30,
    skills: 40,
    vanInventory: 20,
    fatigue: 10
  });

  const readyCases = cases.filter(
    c => (c.status === 'UNASSIGNED' || c.status === 'AI_RECOMMENDED') && c.recommendedTechnicians.length > 0
  );

  const handleRunOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
    }, 800);
  };

  return (
    <div className="space-y-4">
      {/* Optimization Engine Control Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-slate-900">
                  Match & Dispatch Engine
                </h2>
                <span className="text-[10px] font-mono-tabular px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                  EVALUATION MATRIX
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Multi-objective solver evaluating proximity, technician certifications, mobile van stock, and fatigue limits in real-time.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={handleRunOptimization}
              disabled={isOptimizing}
              className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isOptimizing ? 'animate-spin text-blue-600' : ''}`} />
              <span>{isOptimizing ? 'Re-scoring Fleet...' : 'Re-Run Optimization'}</span>
            </button>

            <button
              onClick={onBulkDispatch}
              disabled={readyCases.length === 0}
              className="px-4.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs disabled:opacity-40 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Auto-Dispatch All ({readyCases.length} Qualified)</span>
            </button>
          </div>
        </div>

        {/* Algorithmic Factor Weights Customizer */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono-tabular">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between text-slate-600 mb-1.5">
              <span className="font-semibold text-slate-800">Skill Match Weight</span>
              <span className="text-blue-600 font-bold">{weights.skills}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600" style={{ width: `${weights.skills}%` }}></div>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between text-slate-600 mb-1.5">
              <span className="font-semibold text-slate-800">Proximity ETA</span>
              <span className="text-blue-600 font-bold">{weights.proximity}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600" style={{ width: `${weights.proximity}%` }}></div>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between text-slate-600 mb-1.5">
              <span className="font-semibold text-slate-800">Van Inventory BOM</span>
              <span className="text-blue-600 font-bold">{weights.vanInventory}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600" style={{ width: `${weights.vanInventory}%` }}></div>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between text-slate-600 mb-1.5">
              <span className="font-semibold text-slate-800">Shift Fatigue Index</span>
              <span className="text-blue-600 font-bold">{weights.fatigue}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600" style={{ width: `${weights.fatigue}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Queue Cards Breakdown */}
      <div className="space-y-3">
        {readyCases.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl shadow-xs">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2.5" />
            <h3 className="text-sm font-bold text-slate-900">All Eligible Faults Dispatched</h3>
            <p className="text-xs text-slate-500 mt-1">
              There are currently no pending unassigned tickets waiting for automated match dispatch.
            </p>
          </div>
        ) : (
          readyCases.map((c) => {
            const best = c.recommendedTechnicians[0];
            const tech = technicians.find(t => t.id === best?.technicianId);
            if (!best || !tech) return null;

            return (
              <div 
                key={c.id} 
                className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-blue-400 transition-all shadow-xs"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Case Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="font-mono-tabular text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {c.id}
                      </span>
                      <span className={`font-mono-tabular text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        c.severity === 'P1-CRITICAL' 
                          ? 'bg-red-50 text-red-700 border border-red-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {c.severity}
                      </span>
                      <span className="text-xs text-slate-500 font-sans truncate">{c.facilityType}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 font-sans">{c.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{c.siteName} • {c.siteAddress}</p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs font-mono-tabular">
                      <span className="text-red-600 font-semibold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        SLA Window: {c.slaMinutesRemaining}m left
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="text-slate-500">
                        Error Code: <span className="font-bold text-blue-600">{c.errorCode}</span>
                      </span>
                    </div>
                  </div>

                  {/* Middle: Match Score Radar & Candidate Tech */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 lg:w-80 shrink-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono-tabular uppercase font-bold text-blue-700 flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5 text-blue-600" />
                        TOP RECOMMENDED FIT
                      </span>
                      <span className="font-mono-tabular text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
                        {best.overallScore}% MATCH
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <img
                        src={tech.avatarUrl}
                        alt={tech.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-900 text-xs truncate">{tech.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono-tabular truncate">
                          {tech.id} • {best.proximityMinutes}m ({best.distanceMiles}mi)
                        </div>
                      </div>
                    </div>

                    {/* Algorithmic reasons bulleted */}
                    <div className="mt-2 text-[10px] space-y-1 text-slate-600">
                      {best.matchReasons.slice(0, 2).map((r, i) => (
                        <div key={i} className="flex items-center space-x-1.5 truncate">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Direct Dispatch Trigger */}
                  <div className="flex lg:flex-col justify-end items-center gap-2 shrink-0">
                    <button
                      onClick={() => onDispatch(c.id, tech.id)}
                      className="w-full sm:w-auto px-4.5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Confirm Dispatch</span>
                    </button>
                    <span className="text-[10px] font-mono-tabular text-slate-400 text-center">
                      Auto-notifies Tech SMS & Mobile
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
