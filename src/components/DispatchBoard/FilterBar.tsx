import React from 'react';
import { 
  Table, 
  Map as MapIcon, 
  Kanban, 
  Filter, 
  Sparkles, 
  Building2, 
  SlidersHorizontal,
  X
} from 'lucide-react';
import { SeverityLevel, FacilityType } from '../../types';

interface FilterBarProps {
  viewMode: 'table' | 'map' | 'kanban';
  setViewMode: (mode: 'table' | 'map' | 'kanban') => void;
  selectedSeverity: string;
  setSelectedSeverity: (severity: string) => void;
  selectedFacility: string;
  setSelectedFacility: (facility: string) => void;
  vipOnly: boolean;
  setVipOnly: (vip: boolean) => void;
  onBulkAutoDispatch: () => void;
  unassignedMatchCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  viewMode,
  setViewMode,
  selectedSeverity,
  setSelectedSeverity,
  selectedFacility,
  setSelectedFacility,
  vipOnly,
  setVipOnly,
  onBulkAutoDispatch,
  unassignedMatchCount
}) => {
  const facilityOptions: string[] = [
    'All Facilities',
    'Data Center',
    'Biotech Cleanroom',
    'Hospital Facility',
    'Airport Terminal',
    'Financial Vault'
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-3 mb-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
      {/* Left controls: Severity and Facility filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono-tabular uppercase text-[10px] tracking-[0.15em] font-bold text-slate-400 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-slate-400" /> Filter:
        </span>

        {/* Severity Selector */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setSelectedSeverity('ALL')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
              selectedSeverity === 'ALL' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Severities
          </button>
          <button
            onClick={() => setSelectedSeverity('P1-CRITICAL')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
              selectedSeverity === 'P1-CRITICAL' ? 'bg-red-50 text-red-700 shadow-xs font-bold border border-red-200' : 'text-slate-600 hover:text-red-600'
            }`}
          >
            P1 Critical
          </button>
          <button
            onClick={() => setSelectedSeverity('P2-HIGH')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
              selectedSeverity === 'P2-HIGH' ? 'bg-amber-50 text-amber-700 shadow-xs font-semibold border border-amber-200' : 'text-slate-600 hover:text-amber-600'
            }`}
          >
            P2 High
          </button>
          <button
            onClick={() => setSelectedSeverity('P3-STANDARD')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
              selectedSeverity === 'P3-STANDARD' ? 'bg-blue-600 text-white shadow-xs font-semibold' : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            P3 Standard
          </button>
        </div>

        {/* Facility Type dropdown */}
        <div className="flex items-center space-x-1.5">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            {facilityOptions.map((fac) => (
              <option key={fac} value={fac} className="bg-white text-slate-700">{fac}</option>
            ))}
          </select>
        </div>

        {/* VIP Toggle */}
        <button
          onClick={() => setVipOnly(!vipOnly)}
          className={`px-3 py-1.5 rounded-xl border text-[11px] font-semibold flex items-center space-x-1 transition-all cursor-pointer ${
            vipOnly
              ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-xs'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <span>VIP Accounts</span>
          {vipOnly && <X className="w-3 h-3 ml-0.5" />}
        </button>
      </div>

      {/* Right controls: Bulk AI Dispatch & Layout View Switcher */}
      <div className="flex items-center space-x-2.5">
        {unassignedMatchCount > 0 && (
          <button
            id="bulk-auto-dispatch-btn"
            onClick={onBulkAutoDispatch}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-100" />
            <span>Auto-Dispatch ({unassignedMatchCount} Ready)</span>
          </button>
        )}

        {/* View Switcher: Table / Map / Kanban */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            id="view-mode-table-btn"
            onClick={() => setViewMode('table')}
            title="High-Density Tabular Matrix"
            className={`p-1.5 rounded-lg flex items-center space-x-1 text-xs transition-all cursor-pointer ${
              viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Table</span>
          </button>
          <button
            id="view-mode-map-btn"
            onClick={() => setViewMode('map')}
            title="Spatial Fleet & Fault Map"
            className={`p-1.5 rounded-lg flex items-center space-x-1 text-xs transition-all cursor-pointer ${
              viewMode === 'map' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Live Map</span>
          </button>
          <button
            id="view-mode-kanban-btn"
            onClick={() => setViewMode('kanban')}
            title="Triage Pipeline Kanban"
            className={`p-1.5 rounded-lg flex items-center space-x-1 text-xs transition-all cursor-pointer ${
              viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Pipeline</span>
          </button>
        </div>
      </div>
    </div>
  );
};
