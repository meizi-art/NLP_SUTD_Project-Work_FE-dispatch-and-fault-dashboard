import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck,
  Building,
  Cpu
} from 'lucide-react';
import { FaultCase, Technician } from '../../types';

interface AnalyticsProps {
  cases: FaultCase[];
  technicians: Technician[];
}

export const Analytics: React.FC<AnalyticsProps> = ({ cases, technicians }) => {
  const activeCases = cases.filter(c => c.status !== 'RESOLVED');
  const resolvedCases = cases.filter(c => c.status === 'RESOLVED');
  const vipCases = cases.filter(c => c.isVipClient);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          SLA & Contract Compliance Analytics
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time tracking of First-Time Fix Rate (FTFR), mean response latency, SLA breach risk vectors, and equipment failure distribution.
        </p>
      </div>

      {/* Top 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-3xl p-4.5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-mono-tabular uppercase text-[11px] font-semibold">Global SLA Compliance</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-emerald-600">99.4%</div>
          <div className="text-[11px] font-mono-tabular text-slate-400 mt-1">Target: &gt;99.0% Gold Tier</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-4.5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-mono-tabular uppercase text-[11px] font-semibold">Mean Time to Dispatch</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-blue-600">4.2 min</div>
          <div className="text-[11px] font-mono-tabular text-emerald-600 mt-1">-1.8m vs Automated Target</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-4.5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-mono-tabular uppercase text-[11px] font-semibold">First-Time Fix Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-emerald-600">94.6%</div>
          <div className="text-[11px] font-mono-tabular text-slate-400 mt-1">48 of 51 Jobs Cleared First Visit</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-4.5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-mono-tabular uppercase text-[11px] font-semibold">Triage Accuracy</span>
            <Cpu className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-slate-900">98.2%</div>
          <div className="text-[11px] font-mono-tabular text-blue-600 mt-1">Match Confidence Score</div>
        </div>
      </div>

      {/* Visual Analytics Sections: Equipment Failure Breakdown & Technician Throughput */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Equipment Failure & SLA Risk Distribution (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-xs text-slate-900 uppercase font-mono-tabular">
            Facility Type SLA Compliance & Failure Frequency
          </h3>

          <div className="space-y-3.5">
            {[
              { type: 'Data Center Hyperscale', count: 18, compliance: 99.8, color: 'bg-blue-600' },
              { type: 'Biotech Cleanroom Core', count: 12, compliance: 99.1, color: 'bg-emerald-600' },
              { type: 'Hospital Isolation & Power', count: 9, compliance: 100.0, color: 'bg-purple-600' },
              { type: 'Airport Baggage Logistics', count: 7, compliance: 98.4, color: 'bg-amber-500' },
              { type: 'Financial Clearing Vault', count: 5, compliance: 99.5, color: 'bg-sky-600' }
            ].map((facility, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{facility.type}</span>
                  <div className="font-mono-tabular text-[11px] space-x-2">
                    <span className="text-slate-400">{facility.count} Incidents</span>
                    <span className="font-bold text-emerald-600">{facility.compliance}% SLA</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${facility.color}`} style={{ width: `${(facility.count / 20) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-3 gap-2.5 text-center text-xs font-mono-tabular">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-slate-500 block text-[10px]">P1 CRITICAL MTTR</span>
              <span className="font-bold text-red-600 text-sm">28 mins</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-slate-500 block text-[10px]">P2 HIGH MTTR</span>
              <span className="font-bold text-amber-600 text-sm">54 mins</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-slate-500 block text-[10px]">P3 STANDARD MTTR</span>
              <span className="font-bold text-blue-600 text-sm">110 mins</span>
            </div>
          </div>
        </div>

        {/* Right: Technician Performance Matrix (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-xs text-slate-900 uppercase font-mono-tabular">
            Field Technician Performance Matrix
          </h3>

          <div className="space-y-2.5 max-h-80 overflow-y-auto">
            {technicians.map((t) => (
              <div key={t.id} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="font-bold text-slate-900">{t.name}</div>
                    <div className="font-mono-tabular text-[10px] text-slate-500">
                      {t.id} • {t.jobsCompletedToday} Resolved Today
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono-tabular font-bold text-xs text-emerald-600">
                    ★ {t.rating.toFixed(2)}
                  </span>
                  <span className="block text-[10px] font-mono-tabular text-slate-400">
                    {t.hoursWorkedToday}h logged
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
