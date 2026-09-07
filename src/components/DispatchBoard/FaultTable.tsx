import React from 'react';
import { 
  AlertOctagon, 
  Flame, 
  Clock, 
  Sparkles, 
  CheckCircle, 
  Shield, 
  ArrowUpRight, 
  Send, 
  ChevronRight,
  UserCheck,
  Building,
  Radio
} from 'lucide-react';
import { FaultCase, SeverityLevel, CaseStatus } from '../../types';

interface FaultTableProps {
  cases: FaultCase[];
  selectedCaseId: string | null;
  onSelectCase: (caseItem: FaultCase) => void;
  onQuickDispatch: (caseId: string, techId: string) => void;
}

export const FaultTable: React.FC<FaultTableProps> = ({
  cases,
  selectedCaseId,
  onSelectCase,
  onQuickDispatch
}) => {
  const getSeverityBadge = (sev: SeverityLevel) => {
    switch (sev) {
      case 'P1-CRITICAL':
        return (
          <span className="font-mono-tabular inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
            <Flame className="w-3 h-3 mr-1 text-red-600 animate-pulse" />
            P1 CRITICAL
          </span>
        );
      case 'P2-HIGH':
        return (
          <span className="font-mono-tabular inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            P2 HIGH
          </span>
        );
      case 'P3-STANDARD':
        return (
          <span className="font-mono-tabular inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            P3 STANDARD
          </span>
        );
      case 'P4-LOW':
        return (
          <span className="font-mono-tabular inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            P4 LOW
          </span>
        );
    }
  };

  const getStatusBadge = (status: CaseStatus) => {
    switch (status) {
      case 'UNASSIGNED':
        return (
          <span className="font-mono-tabular inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-red-700 border border-red-200">
            UNASSIGNED
          </span>
        );
      case 'AI_RECOMMENDED':
        return (
          <span className="font-mono-tabular inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Sparkles className="w-3 h-3 mr-1 text-blue-600" />
            MATCH READY
          </span>
        );
      case 'DISPATCHED':
      case 'EN_ROUTE':
        return (
          <span className="font-mono-tabular inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <Radio className="w-3 h-3 mr-1 text-sky-600 animate-pulse" />
            {status === 'EN_ROUTE' ? 'EN ROUTE' : 'DISPATCHED'}
          </span>
        );
      case 'ON_SITE':
        return (
          <span className="font-mono-tabular inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            ON SITE
          </span>
        );
      case 'PENDING_PARTS':
        return (
          <span className="font-mono-tabular inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            PARTS PENDING
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="font-mono-tabular inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3 h-3 mr-1 text-emerald-600" />
            RESOLVED
          </span>
        );
    }
  };

  const formatSlaTimer = (minutesRemaining: number, status: CaseStatus) => {
    if (status === 'RESOLVED') {
      return <span className="font-mono-tabular text-emerald-600 font-medium">COMPLIANT</span>;
    }
    if (minutesRemaining <= 0) {
      return (
        <span className="font-mono-tabular px-2 py-0.5 rounded-full bg-red-600 text-white font-bold text-[10px] animate-pulse">
          BREACHED
        </span>
      );
    }
    const isUrgent = minutesRemaining < 30;
    const isCritical = minutesRemaining < 20;

    return (
      <span className={`font-mono-tabular font-semibold text-[11px] flex items-center justify-end ${
        isCritical ? 'text-red-600 font-bold animate-pulse' : isUrgent ? 'text-amber-600' : 'text-slate-600'
      }`}>
        <Clock className={`w-3.5 h-3.5 mr-1 inline ${isCritical ? 'text-red-600' : 'text-slate-400'}`} />
        {minutesRemaining}m left
      </span>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Header Row */}
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono-tabular uppercase tracking-[0.15em] text-slate-400 h-10">
              <th className="py-2 px-3 font-bold w-24">Case ID</th>
              <th className="py-2 px-3 font-bold w-28">Severity</th>
              <th className="py-2 px-3 font-bold min-w-[220px]">Site & Asset Fault</th>
              <th className="py-2 px-3 font-bold w-32">Facility Type</th>
              <th className="py-2 px-3 font-bold w-32">Status</th>
              <th className="py-2 px-3 font-bold text-right w-28">SLA Target</th>
              <th className="py-2 px-3 font-bold min-w-[180px]">Matched Engineer</th>
              <th className="py-2 px-3 font-bold text-right w-24">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 text-xs">
            {cases.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400 font-sans">
                  No fault cases matching active filter criteria.
                </td>
              </tr>
            ) : (
              cases.map((item) => {
                const isSelected = selectedCaseId === item.id;
                const bestMatch = item.recommendedTechnicians[0];
                const isBreachRisk = item.slaMinutesRemaining < 30 && item.status !== 'RESOLVED';

                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectCase(item)}
                    className={`cursor-pointer transition-colors h-12 ${
                      isSelected 
                        ? 'bg-blue-50/70 border-l-4 border-l-blue-600' 
                        : isBreachRisk 
                          ? 'bg-red-50/30 hover:bg-red-50/60' 
                          : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Case ID */}
                    <td className="py-2.5 px-3 font-mono-tabular font-bold text-slate-900">
                      <div className="flex items-center space-x-1.5">
                        <span>{item.id}</span>
                        {item.isVipClient && (
                          <span 
                            title={`VIP Protocol: ${item.vipClientName}`}
                            className="w-2 h-2 rounded-full bg-amber-400 shrink-0" 
                          />
                        )}
                      </div>
                    </td>

                    {/* Severity */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {getSeverityBadge(item.severity)}
                    </td>

                    {/* Site & Asset Fault */}
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-800 font-sans truncate max-w-sm">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center space-x-1.5 truncate mt-0.5">
                        <span className="font-mono-tabular text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">{item.assetTag}</span>
                        <span>•</span>
                        <span className="truncate text-slate-500">{item.siteName}</span>
                      </div>
                    </td>

                    {/* Facility Type */}
                    <td className="py-2.5 px-3 whitespace-nowrap text-slate-600 font-sans">
                      <span className="inline-flex items-center text-[11px]">
                        <Building className="w-3 h-3 mr-1 text-slate-400" />
                        {item.facilityType}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* SLA Countdown */}
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      {formatSlaTimer(item.slaMinutesRemaining, item.status)}
                    </td>

                    {/* Matched Engineer / Assigned */}
                    <td className="py-2.5 px-3">
                      {item.assignedTechnicianName ? (
                        <div className="flex items-center space-x-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="font-medium text-slate-800">{item.assignedTechnicianName}</span>
                        </div>
                      ) : bestMatch ? (
                        <div className="flex items-center justify-between group">
                          <div className="flex items-center space-x-1.5">
                            <span className="font-mono-tabular text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-full border border-blue-200">
                              {bestMatch.overallScore}% Fit
                            </span>
                            <span className="text-[11px] text-slate-700 font-medium">
                              {bestMatch.technicianId} ({bestMatch.proximityMinutes}m)
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">No active match</span>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                      {item.status === 'UNASSIGNED' || item.status === 'AI_RECOMMENDED' ? (
                        bestMatch ? (
                          <button
                            id={`quick-dispatch-btn-${item.id}`}
                            onClick={() => onQuickDispatch(item.id, bestMatch.technicianId)}
                            className="px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold flex items-center space-x-1 ml-auto transition-colors cursor-pointer shadow-2xs"
                            title={`Dispatch ${bestMatch.technicianId} (${bestMatch.overallScore}% fit)`}
                          >
                            <Send className="w-3 h-3" />
                            <span>Dispatch</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onSelectCase(item)}
                            className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium ml-auto border border-slate-200 cursor-pointer"
                          >
                            Inspect
                          </button>
                        )
                      ) : (
                        <button
                          onClick={() => onSelectCase(item)}
                          className="text-slate-400 hover:text-blue-600 p-1 ml-auto block cursor-pointer"
                          title="Open Case Dossier"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
