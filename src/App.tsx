/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DispatchBoard } from './components/DispatchBoard/DispatchBoard';
import { AutomatedQueue } from './components/AutomatedQueue/AutomatedQueue';
import { FleetSchedule } from './components/FleetSchedule/FleetSchedule';
import { KnowledgeBase } from './components/KnowledgeBase/KnowledgeBase';
import { Analytics } from './components/Analytics/Analytics';
import { MobileCompanion } from './components/MobileCompanion/MobileCompanion';
import { DossierDrawer } from './components/DossierDrawer/DossierDrawer';
import { NewCaseModal } from './components/NewCaseModal';
import { INITIAL_FAULT_CASES, INITIAL_TECHNICIANS } from './data/mockData';
import { FaultCase, Technician, CaseStatus } from './types';

export default function App() {
  const [cases, setCases] = useState<FaultCase[]>(INITIAL_FAULT_CASES);
  const [technicians, setTechnicians] = useState<Technician[]>(INITIAL_TECHNICIANS);
  const [activeView, setActiveView] = useState<string>('dispatch');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Filter States
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedFacility, setSelectedFacility] = useState<string>('All Facilities');
  const [vipOnly, setVipOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'table' | 'map' | 'kanban'>('table');

  // Simulated Live SLA Timer ticker (every 45s or active session)
  useEffect(() => {
    const timer = setInterval(() => {
      setCases(prevCases => 
        prevCases.map(c => {
          if (c.status === 'RESOLVED') return c;
          const newMin = Math.max(-15, c.slaMinutesRemaining - 1);
          return { ...c, slaMinutesRemaining: newMin };
        })
      );
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  // Filter Logic
  const filteredCases = cases.filter(item => {
    // Global Search term
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match = 
        item.id.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.siteName.toLowerCase().includes(q) ||
        item.assetTag.toLowerCase().includes(q) ||
        item.errorCode.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Preset Triage Filter from Sidebar / Ribbon
    if (selectedFilter === 'P1_CRITICAL' && item.severity !== 'P1-CRITICAL') return false;
    if (selectedFilter === 'UNASSIGNED' && item.status !== 'UNASSIGNED') return false;
    if (selectedFilter === 'VIP_ONLY' && !item.isVipClient) return false;
    if (selectedFilter === 'BREACH_RISK' && (item.slaMinutesRemaining >= 30 || item.status === 'RESOLVED')) return false;
    if (selectedFilter === 'AI_MATCH' && !(item.status === 'AI_RECOMMENDED' || (item.status === 'UNASSIGNED' && item.recommendedTechnicians.length > 0))) return false;

    // Severity Filter
    if (selectedSeverity !== 'ALL' && item.severity !== selectedSeverity) return false;

    // Facility Filter
    if (selectedFacility !== 'All Facilities' && item.facilityType !== selectedFacility) return false;

    // VIP filter toggle
    if (vipOnly && !item.isVipClient) return false;

    return true;
  });

  // Action: Select Case for 28rem Inspector Drawer
  const handleSelectCase = (caseItem: FaultCase) => {
    setSelectedCaseId(caseItem.id);
    setIsDrawerOpen(true);
  };

  // Action: Quick Dispatch Technician
  const handleDispatchTechnician = (caseId: string, technicianId: string) => {
    const tech = technicians.find(t => t.id === technicianId);
    const techName = tech ? tech.name : technicianId;

    setCases(prevCases =>
      prevCases.map(c => {
        if (c.id === caseId) {
          return {
            ...c,
            status: 'DISPATCHED',
            assignedTechnicianId: technicianId,
            assignedTechnicianName: techName,
            auditLogs: [
              ...c.auditLogs,
              {
                id: `LOG-${Date.now()}`,
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
                actor: 'Dispatcher Rachel Torres',
                action: `Dispatched ${techName} (${technicianId})`,
                type: 'status_change',
                details: 'Automated notification & SMS route sent to mobile device'
              }
            ]
          };
        }
        return c;
      })
    );

    // Update tech status to EN_ROUTE
    setTechnicians(prevTechs =>
      prevTechs.map(t => {
        if (t.id === technicianId) {
          return {
            ...t,
            currentStatus: 'EN_ROUTE',
            activeCaseId: caseId
          };
        }
        return t;
      })
    );
  };

  // Action: Bulk Auto-Dispatch All Qualified Cases
  const handleBulkAutoDispatch = () => {
    const readyCases = cases.filter(
      c => (c.status === 'UNASSIGNED' || c.status === 'AI_RECOMMENDED') && c.recommendedTechnicians.length > 0
    );

    if (readyCases.length === 0) return;

    readyCases.forEach(c => {
      const best = c.recommendedTechnicians[0];
      if (best) {
        handleDispatchTechnician(c.id, best.technicianId);
      }
    });
  };

  // Action: Mark Case Resolved
  const handleResolveCase = (caseId: string) => {
    setCases(prevCases =>
      prevCases.map(c => {
        if (c.id === caseId) {
          return {
            ...c,
            status: 'RESOLVED',
            auditLogs: [
              ...c.auditLogs,
              {
                id: `LOG-${Date.now()}`,
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
                actor: 'Field Engineer & Client Sign-off',
                action: 'Case Remediated & SLA Verified Compliant',
                type: 'status_change'
              }
            ]
          };
        }
        return c;
      })
    );
  };

  // Action: Escalate Case to Tier 3
  const handleEscalateCase = (caseId: string) => {
    setCases(prevCases =>
      prevCases.map(c => {
        if (c.id === caseId) {
          return {
            ...c,
            severity: 'P1-CRITICAL',
            auditLogs: [
              ...c.auditLogs,
              {
                id: `LOG-${Date.now()}`,
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
                actor: 'Supervisory Dispatcher',
                action: 'Escalated to Tier 3 Lead & OEM Specialist Hotline',
                type: 'manual'
              }
            ]
          };
        }
        return c;
      })
    );
  };

  // Action: Update Technician Status
  const handleUpdateTechStatus = (techId: string, newStatus: Technician['currentStatus']) => {
    setTechnicians(prev =>
      prev.map(t => (t.id === techId ? { ...t, currentStatus: newStatus } : t))
    );
  };

  // Action: Update Case Status from Mobile Companion
  const handleUpdateCaseStatus = (caseId: string, status: CaseStatus) => {
    setCases(prev =>
      prev.map(c => {
        if (c.id === caseId) {
          return {
            ...c,
            status,
            auditLogs: [
              ...c.auditLogs,
              {
                id: `LOG-${Date.now()}`,
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
                actor: 'Field Engineer Mobile App',
                action: `Status Updated to ${status}`,
                type: 'status_change'
              }
            ]
          };
        }
        return c;
      })
    );
  };

  // Action: Create New Emergency Case
  const handleCreateNewCase = (newCaseData: Partial<FaultCase>) => {
    const newId = `#FLT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCase: FaultCase = {
      id: newId,
      title: newCaseData.title || 'Emergency Asset Fault',
      siteName: newCaseData.siteName || 'Equinix SV11 Silicon Valley Hyperscale',
      siteAddress: '1400 Federal Way, San Jose, CA',
      facilityType: newCaseData.facilityType || 'Data Center',
      coordinates: { x: 45, y: 50, lat: 37.40, lng: -121.95 },
      assetName: newCaseData.assetName || 'HVAC / Power Asset',
      assetTag: newCaseData.assetTag || 'ASSET-01',
      errorCode: newCaseData.errorCode || 'ERR-990: GENERIC_LOCKOUT',
      description: newCaseData.description || 'Emergency ticket initiated by FMC supervisor.',
      severity: newCaseData.severity || 'P1-CRITICAL',
      status: 'UNASSIGNED',
      isVipClient: newCaseData.isVipClient || false,
      vipClientName: newCaseData.vipClientName,
      reportedAt: 'Just now (14:24:00 UTC)',
      slaTargetMinutes: newCaseData.slaTargetMinutes || 45,
      slaMinutesRemaining: newCaseData.slaMinutesRemaining || 45,
      telemetryReadings: [
        { metric: 'Operating Pressure / Voltage', value: 'Abnormal Deviation', normalRange: 'Nominal', status: 'critical', unit: 'units' },
        { metric: 'Thermal Core Delta', value: '+14.2°C', normalRange: '< 4.0°C', status: 'warning', unit: '°C' }
      ],
      securityProtocol: {
        clearanceLevel: 'Level 2 - Escort Required',
        accessCode: 'SEC-EMERG-881#',
        gateContact: 'Site Duty Supervisor',
        gatePhone: '+1 (555) 900-2211',
        ppeRequired: ['Hard Hat', 'Safety Glasses', 'Steel Toe Boots'],
        lotoRequired: true,
        notes: 'Follow site sign-in log at main security guard shack.'
      },
      recommendedTechnicians: [
        {
          technicianId: 'TECH-104',
          overallScore: 95,
          proximityMinutes: 12,
          distanceMiles: 4.8,
          skillMatchScore: 98,
          hasRequiredParts: true,
          workloadScore: 90,
          matchReasons: ['Top proximity & relevant master certification']
        }
      ],
      requiredParts: [],
      auditLogs: [
        {
          id: 'LOG-NEW-1',
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
          actor: 'Dispatcher Rachel Torres',
          action: 'Created Emergency Fault Ticket',
          type: 'manual'
        }
      ]
    };

    setCases(prev => [newCase, ...prev]);
    setSelectedCaseId(newId);
    setIsDrawerOpen(true);
  };

  const selectedCaseItem = cases.find(c => c.id === selectedCaseId) || null;
  const criticalBreachCount = cases.filter(c => c.slaMinutesRemaining < 30 && c.status !== 'RESOLVED').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative">
      {/* Top Operations Header */}
      <Header
        onOpenNewCase={() => setIsNewCaseModalOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
        criticalBreachCount={criticalBreachCount}
        onRefreshData={() => {
          setCases([...cases]);
        }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Main App Container */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Collapsible Sidebar */}
        <Sidebar
          activeView={activeView}
          setActiveView={(view) => {
            setActiveView(view);
            if (view !== 'dispatch') setIsDrawerOpen(false);
          }}
          cases={cases}
          technicians={technicians}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        {/* Dynamic Main Workspace */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {/* Scope 1: Dispatch Board */}
          {activeView === 'dispatch' && (
            <DispatchBoard
              cases={filteredCases}
              technicians={technicians}
              selectedCaseId={selectedCaseId}
              onSelectCase={handleSelectCase}
              onQuickDispatch={handleDispatchTechnician}
              onBulkAutoDispatch={handleBulkAutoDispatch}
              viewMode={viewMode}
              setViewMode={setViewMode}
              selectedSeverity={selectedSeverity}
              setSelectedSeverity={setSelectedSeverity}
              selectedFacility={selectedFacility}
              setSelectedFacility={setSelectedFacility}
              vipOnly={vipOnly}
              setVipOnly={setVipOnly}
              onSelectMetricPreset={(preset) => setSelectedFilter(preset)}
            />
          )}

          {/* Scope 2: Automated AI Queue */}
          {activeView === 'automated' && (
            <AutomatedQueue
              cases={cases}
              technicians={technicians}
              onDispatch={handleDispatchTechnician}
              onBulkDispatch={handleBulkAutoDispatch}
            />
          )}

          {/* Scope 3: Fleet & Schedule Matrix */}
          {activeView === 'fleet' && (
            <FleetSchedule
              technicians={technicians}
              onUpdateStatus={handleUpdateTechStatus}
            />
          )}

          {/* Scope 4: Site Hub & Diagnostics */}
          {activeView === 'knowledge' && <KnowledgeBase />}

          {/* Scope 5: SLA Telemetry & Radar */}
          {activeView === 'analytics' && (
            <Analytics cases={cases} technicians={technicians} />
          )}

          {/* Scope 6: Mobile Field Companion */}
          {activeView === 'mobile' && (
            <MobileCompanion
              cases={cases}
              technicians={technicians}
              onUpdateStatus={handleUpdateCaseStatus}
            />
          )}
        </main>
      </div>

      {/* Sliding Contextual Dossier Inspector Drawer */}
      {isDrawerOpen && selectedCaseItem && (
        <DossierDrawer
          caseItem={selectedCaseItem}
          technicians={technicians}
          onClose={() => setIsDrawerOpen(false)}
          onDispatchTechnician={handleDispatchTechnician}
          onResolveCase={handleResolveCase}
          onEscalateCase={handleEscalateCase}
        />
      )}

      {/* New Emergency Ticket Modal */}
      <NewCaseModal
        isOpen={isNewCaseModalOpen}
        onClose={() => setIsNewCaseModalOpen(false)}
        onCreateCase={handleCreateNewCase}
      />
    </div>
  );
}
