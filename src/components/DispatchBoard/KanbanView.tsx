import React from 'react';
import { 
  Flame, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  UserCheck, 
  Send,
  AlertTriangle,
  Building
} from 'lucide-react';
import { FaultCase, CaseStatus } from '../../types';

interface KanbanViewProps {
  cases: FaultCase[];
  selectedCaseId: string | null;
  onSelectCase: (c: FaultCase) => void;
  onQuickDispatch: (caseId: string, techId: string) => void;
}

export const KanbanView: React.FC<KanbanViewProps> = ({
  cases,
  selectedCaseId,
  onSelectCase,
  onQuickDispatch
}) => {
  const lanes: { id: string; title: string; filterStatus: CaseStatus[]; color: string; countColor: string }[] = [
    { 
      id: 'unassigned', 
      title: 'Emergency Pool', 
      filterStatus: ['UNASSIGNED'], 
      color: 'border-t-red-500 bg-red-50/20',
      countColor: 'bg-red-100 text-red-700 border border-red-200'
    },
    { 
      id: 'ai_ready', 
      title: 'AI Match Ready', 
      filterStatus: ['AI_RECOMMENDED'], 
      color: 'border-t-blue-500 bg-blue-50/20',
      countColor: 'bg-blue-100 text-blue-700 border border-blue-200'
    },
    { 
      id: 'en_route', 
      title: 'Dispatched / En Route', 
      filterStatus: ['DISPATCHED', 'EN_ROUTE'], 
      color: 'border-t-sky-500 bg-sky-50/20',
      countColor: 'bg-sky-100 text-sky-700 border border-sky-200'
    },
    { 
      id: 'on_site', 
      title: 'On-Site Diagnostic', 
      filterStatus: ['ON_SITE'], 
      color: 'border-t-amber-500 bg-amber-50/20',
      countColor: 'bg-amber-100 text-amber-700 border border-amber-200'
    },
    { 
      id: 'pending_parts', 
      title: 'Parts Requisition', 
      filterStatus: ['PENDING_PARTS'], 
      color: 'border-t-purple-500 bg-purple-50/20',
      countColor: 'bg-purple-100 text-purple-700 border border-purple-200'
    },
    { 
      id: 'resolved', 
      title: 'Resolved / Verified', 
      filterStatus: ['RESOLVED'], 
      color: 'border-t-emerald-500 bg-emerald-50/20',
      countColor: 'bg-emerald-100 text-emerald-700 border border-emerald-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 min-h-[500px]">
      {lanes.map((lane) => {
        const laneCases = cases.filter(c => lane.filterStatus.includes(c.status));

        return (
          <div 
            key={lane.id}
            className={`bg-white border border-slate-200 border-t-4 rounded-3xl flex flex-col shadow-xs overflow-hidden ${lane.color}`}
          >
            {/* Lane Header */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="font-mono-tabular uppercase text-[10px] tracking-[0.1em] font-bold text-slate-700 truncate">
                {lane.title}
              </span>
              <span className={`font-mono-tabular text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ml-1 ${lane.countColor}`}>
                {laneCases.length}
              </span>
            </div>

            {/* Lane Body Cards */}
            <div className="p-2.5 space-y-2.5 flex-1 overflow-y-auto max-h-[600px]">
              {laneCases.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs font-sans italic">
                  No active cases
                </div>
              ) : (
                laneCases.map((item) => {
                  const isSelected = selectedCaseId === item.id;
                  const isP1 = item.severity === 'P1-CRITICAL';
                  const bestMatch = item.recommendedTechnicians[0];

                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelectCase(item)}
                      className={`p-3 bg-white border rounded-2xl cursor-pointer transition-all shadow-xs ${
                        isSelected 
                          ? 'border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/40' 
                          : isP1 
                            ? 'border-red-300 hover:border-red-400' 
                            : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Top row ID & Severity */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono-tabular font-bold text-[11px] text-slate-900">
                          {item.id}
                        </span>
                        <span className={`font-mono-tabular text-[9px] px-2 py-0.5 rounded-full font-bold ${
                          isP1 ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {item.severity}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="font-semibold text-xs text-slate-800 line-clamp-2 leading-tight">
                        {item.title}
                      </h4>

                      {/* Site */}
                      <div className="text-[10px] text-slate-500 mt-1.5 flex items-center space-x-1.5 truncate">
                        <Building className="w-3 h-3 shrink-0 text-slate-400" />
                        <span className="truncate">{item.siteName}</span>
                      </div>

                      {/* SLA Timer */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono-tabular">
                        <span className="text-slate-400">SLA Target:</span>
                        <span className={`font-semibold ${item.slaMinutesRemaining < 30 ? 'text-red-600 font-bold' : 'text-slate-600'}`}>
                          {item.status === 'RESOLVED' ? 'Compliant' : `${item.slaMinutesRemaining}m left`}
                        </span>
                      </div>

                      {/* Matched Tech Action */}
                      {item.assignedTechnicianName ? (
                        <div className="mt-2 text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700 p-1.5 rounded-xl font-medium flex items-center justify-between">
                          <span className="truncate">Assigned: {item.assignedTechnicianName}</span>
                        </div>
                      ) : bestMatch ? (
                        <div className="mt-2 pt-1.5 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                          <span className="font-mono-tabular text-[10px] font-bold text-blue-700">
                            {bestMatch.overallScore}% Fit
                          </span>
                          <button
                            onClick={() => onQuickDispatch(item.id, bestMatch.technicianId)}
                            className="px-2 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-semibold flex items-center space-x-1 cursor-pointer shadow-xs"
                          >
                            <Send className="w-2.5 h-2.5" />
                            <span>Dispatch</span>
                          </button>
                        </div>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
