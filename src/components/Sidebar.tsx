import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Users, 
  BookOpen, 
  BarChart3, 
  Smartphone,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { FaultCase, Technician } from '../types';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  cases: FaultCase[];
  technicians: Technician[];
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  cases,
  technicians,
  selectedFilter,
  setSelectedFilter,
  collapsed,
  setCollapsed
}) => {
  const unassignedCount = cases.filter(c => c.status === 'UNASSIGNED').length;
  const p1Count = cases.filter(c => c.severity === 'P1-CRITICAL').length;
  const aiRecommendedCount = cases.filter(c => c.status === 'AI_RECOMMENDED').length;
  const vipCount = cases.filter(c => c.isVipClient && c.status !== 'RESOLVED').length;

  const onlineTechs = technicians.filter(t => t.currentStatus === 'ONLINE_AVAILABLE').length;
  const enRouteTechs = technicians.filter(t => t.currentStatus === 'EN_ROUTE').length;
  const onSiteTechs = technicians.filter(t => t.currentStatus === 'ON_SITE').length;

  const navItems = [
    {
      id: 'dispatch',
      label: 'Fault Pool & Dispatch',
      icon: LayoutDashboard,
      badge: unassignedCount > 0 ? `${unassignedCount} New` : undefined,
      badgeColor: 'bg-red-50 text-red-700 border border-red-200',
      description: 'Live triage & matrix board'
    },
    {
      id: 'automated',
      label: 'Automated AI Queue',
      icon: Sparkles,
      badge: aiRecommendedCount > 0 ? `${aiRecommendedCount} Ready` : undefined,
      badgeColor: 'bg-blue-50 text-blue-700 border border-blue-200',
      description: 'Algorithmic multi-factor fit'
    },
    {
      id: 'fleet',
      label: 'Fleet & Schedule Matrix',
      icon: Users,
      badge: `${onlineTechs} Avail`,
      badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      description: 'Live GPS routes & van parts'
    },
    {
      id: 'knowledge',
      label: 'Site Hub & Diagnostics',
      icon: BookOpen,
      badge: undefined,
      description: 'LOTO, schematics & solver'
    },
    {
      id: 'analytics',
      label: 'SLA Telemetry & Radar',
      icon: BarChart3,
      badge: undefined,
      description: 'Breach risk & FMC latency'
    },
    {
      id: 'mobile',
      label: 'Mobile Field Companion',
      icon: Smartphone,
      badge: 'Transit',
      badgeColor: 'bg-amber-50 text-amber-700 border border-amber-200',
      description: 'Rugged engineer UI'
    }
  ];

  return (
    <aside 
      className={`bg-white text-slate-800 border-r border-slate-200 flex flex-col transition-all duration-200 shrink-0 shadow-xs ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Navigation Scope Header */}
      <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
        {!collapsed && (
          <span className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-slate-400 font-bold">
            OPERATIONAL SCOPES
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-xs transition-colors ml-auto cursor-pointer"
          title={collapsed ? "Expand Sidebar (16rem)" : "Collapse Sidebar"}
        >
          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {/* Main Nav Links */}
      <nav className="p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              id={`nav-scope-${item.id}`}
              onClick={() => setActiveView(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-xs font-semibold' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              {!collapsed && (
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs truncate">{item.label}</span>
                    {item.badge && (
                      <span className={`text-[9px] font-mono-tabular px-1.5 py-0.5 rounded-full font-bold ml-1 shrink-0 ${
                        isActive ? 'bg-white/20 text-white' : item.badgeColor
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] block truncate ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                    {item.description}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Triage Filters (when on Dispatch view) */}
      {!collapsed && activeView === 'dispatch' && (
        <div className="p-3 mx-2 my-2 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-slate-400 block mb-2 font-bold">
            TRIAGE PRESETS
          </span>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedFilter('ALL')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                selectedFilter === 'ALL' ? 'bg-white text-slate-900 font-medium border border-slate-300 shadow-xs' : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
                <span>All Active Faults</span>
              </div>
              <span className="font-mono-tabular text-[11px] text-slate-500">{cases.length}</span>
            </button>

            <button
              onClick={() => setSelectedFilter('P1_CRITICAL')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                selectedFilter === 'P1_CRITICAL' ? 'bg-red-50 text-red-700 font-medium border border-red-200' : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Flame className="w-3.5 h-3.5 text-red-600" />
                <span>P1 Critical Lockouts</span>
              </div>
              <span className="font-mono-tabular text-[11px] px-1.5 py-0.2 rounded-full bg-red-100 text-red-700 font-bold">
                {p1Count}
              </span>
            </button>

            <button
              onClick={() => setSelectedFilter('UNASSIGNED')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                selectedFilter === 'UNASSIGNED' ? 'bg-amber-50 text-amber-700 font-medium border border-amber-200' : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Unassigned Pool</span>
              </div>
              <span className="font-mono-tabular text-[11px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-700 font-bold">
                {unassignedCount}
              </span>
            </button>

            <button
              onClick={() => setSelectedFilter('VIP_ONLY')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                selectedFilter === 'VIP_ONLY' ? 'bg-emerald-50 text-emerald-700 font-medium border border-emerald-200' : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>VIP Gold Protocol</span>
              </div>
              <span className="font-mono-tabular text-[11px] text-emerald-700 font-semibold">{vipCount}</span>
            </button>
          </div>
        </div>
      )}

      {/* Live Fleet Telemetry Tray */}
      <div className="mt-auto p-3.5 border-t border-slate-100 bg-slate-50 text-xs">
        {!collapsed ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-slate-400 font-bold">
                ACTIVE FLEET STATUS
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-center font-mono-tabular text-[11px]">
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-emerald-600 font-bold">{onlineTechs}</div>
                <div className="text-[9px] text-slate-400 uppercase">Available</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-blue-600 font-bold">{enRouteTechs}</div>
                <div className="text-[9px] text-slate-400 uppercase">En Route</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-amber-600 font-bold">{onSiteTechs}</div>
                <div className="text-[9px] text-slate-400 uppercase">On Site</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2 py-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="font-mono-tabular text-[10px] text-emerald-600 font-bold">{onlineTechs}</span>
          </div>
        )}
      </div>
    </aside>
  );
};
