import React from 'react';
import { 
  Flame, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { FaultCase } from '../../types';

interface TriageMetricsRibbonProps {
  cases: FaultCase[];
  onSelectMetric?: (filterType: string) => void;
}

export const TriageMetricsRibbon: React.FC<TriageMetricsRibbonProps> = ({ cases, onSelectMetric }) => {
  const activeCases = cases.filter(c => c.status !== 'RESOLVED');
  const criticalBreachCount = activeCases.filter(c => c.slaMinutesRemaining < 30).length;
  const aiReadyCount = activeCases.filter(c => c.status === 'AI_RECOMMENDED' || (c.status === 'UNASSIGNED' && c.recommendedTechnicians.length > 0)).length;
  const p1Count = activeCases.filter(c => c.severity === 'P1-CRITICAL').length;
  const resolvedToday = cases.filter(c => c.status === 'RESOLVED').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
      {/* 1. Active Fault Pool */}
      <div 
        onClick={() => onSelectMetric?.('ALL')}
        className="bg-white border border-slate-200 rounded-2xl p-3.5 hover:border-blue-400 transition-all cursor-pointer shadow-xs group"
      >
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-mono-tabular uppercase text-[10px] tracking-[0.15em] font-bold text-slate-400">Active Fault Pool</span>
          <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-2xl font-bold font-mono-tabular text-slate-900">{activeCases.length}</span>
          <span className="text-[11px] font-mono-tabular text-slate-500">{p1Count} P1 Critical</span>
        </div>
        <div className="mt-2.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(p1Count / (activeCases.length || 1)) * 100}%` }}></div>
        </div>
      </div>

      {/* 2. SLA Breach Countdown */}
      <div 
        onClick={() => onSelectMetric?.('BREACH_RISK')}
        className="bg-red-50/40 border border-red-200 rounded-2xl p-3.5 hover:border-red-400 transition-all cursor-pointer shadow-xs group"
      >
        <div className="flex items-center justify-between text-xs text-red-700 mb-1">
          <span className="font-mono-tabular uppercase text-[10px] tracking-[0.15em] font-bold">SLA Breach Risk (&lt;30m)</span>
          <Clock className="w-3.5 h-3.5 text-red-600" />
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-2xl font-bold font-mono-tabular text-red-600">{criticalBreachCount}</span>
          <span className="text-[10px] font-mono-tabular px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold border border-red-200">
            Immediate Triage
          </span>
        </div>
        <div className="mt-2.5 h-1.5 w-full bg-red-100 rounded-full overflow-hidden">
          <div className="h-full bg-red-600 rounded-full" style={{ width: criticalBreachCount > 0 ? '100%' : '0%' }}></div>
        </div>
      </div>

      {/* 3. Automated Match Ready */}
      <div 
        onClick={() => onSelectMetric?.('AI_MATCH')}
        className="bg-white border border-slate-200 rounded-2xl p-3.5 hover:border-blue-400 transition-all cursor-pointer shadow-xs group"
      >
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-mono-tabular uppercase text-[10px] tracking-[0.15em] font-bold text-slate-400">Match Ready</span>
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-2xl font-bold font-mono-tabular text-blue-600">{aiReadyCount}</span>
          <span className="text-[10px] font-mono-tabular text-blue-700 font-semibold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
            96.8% Fit
          </span>
        </div>
        <div className="mt-2.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: '85%' }}></div>
        </div>
      </div>

      {/* 4. First-Time Fix Rate */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-mono-tabular uppercase text-[10px] tracking-[0.15em] font-bold text-slate-400">First-Time Fix</span>
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-2xl font-bold font-mono-tabular text-emerald-600">94.6%</span>
          <span className="text-[10px] font-mono-tabular text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            +1.8% vs Target
          </span>
        </div>
        <div className="mt-2.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94.6%' }}></div>
        </div>
      </div>

      {/* 5. FMC Throughput Today */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-mono-tabular uppercase text-[10px] tracking-[0.15em] font-bold text-slate-400">Resolved Today</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-2xl font-bold font-mono-tabular text-slate-900">{resolvedToday}</span>
          <span className="text-[11px] font-mono-tabular text-slate-500">18.4m Avg MTTR</span>
        </div>
        <div className="mt-2.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-slate-400 rounded-full" style={{ width: '65%' }}></div>
        </div>
      </div>
    </div>
  );
};
