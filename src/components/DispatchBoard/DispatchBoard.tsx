import React from 'react';
import { TriageMetricsRibbon } from './TriageMetricsRibbon';
import { FilterBar } from './FilterBar';
import { FaultTable } from './FaultTable';
import { MapView } from './MapView';
import { KanbanView } from './KanbanView';
import { FaultCase, Technician } from '../../types';

interface DispatchBoardProps {
  cases: FaultCase[];
  technicians: Technician[];
  selectedCaseId: string | null;
  onSelectCase: (c: FaultCase) => void;
  onQuickDispatch: (caseId: string, techId: string) => void;
  onBulkAutoDispatch: () => void;
  viewMode: 'table' | 'map' | 'kanban';
  setViewMode: (mode: 'table' | 'map' | 'kanban') => void;
  selectedSeverity: string;
  setSelectedSeverity: (sev: string) => void;
  selectedFacility: string;
  setSelectedFacility: (fac: string) => void;
  vipOnly: boolean;
  setVipOnly: (vip: boolean) => void;
  onSelectMetricPreset: (preset: string) => void;
}

export const DispatchBoard: React.FC<DispatchBoardProps> = ({
  cases,
  technicians,
  selectedCaseId,
  onSelectCase,
  onQuickDispatch,
  onBulkAutoDispatch,
  viewMode,
  setViewMode,
  selectedSeverity,
  setSelectedSeverity,
  selectedFacility,
  setSelectedFacility,
  vipOnly,
  setVipOnly,
  onSelectMetricPreset
}) => {
  const unassignedMatchCount = cases.filter(
    c => (c.status === 'UNASSIGNED' || c.status === 'AI_RECOMMENDED') && c.recommendedTechnicians.length > 0
  ).length;

  return (
    <div className="space-y-3">
      {/* Top 5-Metric Triage Telemetry Ribbon */}
      <TriageMetricsRibbon 
        cases={cases} 
        onSelectMetric={onSelectMetricPreset} 
      />

      {/* Filter and View Layout Bar */}
      <FilterBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedSeverity={selectedSeverity}
        setSelectedSeverity={setSelectedSeverity}
        selectedFacility={selectedFacility}
        setSelectedFacility={setSelectedFacility}
        vipOnly={vipOnly}
        setVipOnly={setVipOnly}
        onBulkAutoDispatch={onBulkAutoDispatch}
        unassignedMatchCount={unassignedMatchCount}
      />

      {/* Active Work Area View */}
      {viewMode === 'table' && (
        <FaultTable
          cases={cases}
          selectedCaseId={selectedCaseId}
          onSelectCase={onSelectCase}
          onQuickDispatch={onQuickDispatch}
        />
      )}

      {viewMode === 'map' && (
        <MapView
          cases={cases}
          technicians={technicians}
          selectedCaseId={selectedCaseId}
          onSelectCase={onSelectCase}
          onQuickDispatch={onQuickDispatch}
        />
      )}

      {viewMode === 'kanban' && (
        <KanbanView
          cases={cases}
          selectedCaseId={selectedCaseId}
          onSelectCase={onSelectCase}
          onQuickDispatch={onQuickDispatch}
        />
      )}
    </div>
  );
};
