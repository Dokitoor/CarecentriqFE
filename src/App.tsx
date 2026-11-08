'use client';

import React, { useState } from 'react';
import { Toaster } from 'sileo';
import { toast } from './lib/toast';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewView } from './components/OverviewView';
import { ComplianceView } from './components/ComplianceView';
import { ActivityListView } from './components/ActivityListView';
import { ClientProfileView } from './components/ClientProfileView';
import { StaffListView } from './components/StaffListView';
import { ReportsDocsView } from './components/ReportsDocsView';
import { OnboardingWorkflowView } from './components/OnboardingWorkflowView';
import { AdminSettingsView } from './components/AdminSettingsView';
import { GuidedTourModal } from './components/GuidedTourModal';
import { CreateProgramModal } from './components/CreateProgramModal';
import { ProgramSetupModal } from './components/ProgramSetupModal';
import { UnconfiguredProgramView } from './components/UnconfiguredProgramView';
import { CurriculumSetupView, CurriculumStep } from './components/CurriculumSetupView';
import { AuthFlow } from './components/AuthFlow';
import { AnimatedMascotSvg } from './components/AnimatedMascotSvg';
import { FinaleCelebrationStage } from './components/FinaleCelebrationStage';
import { Sound } from './utils/soundEffects';

import {
  ORGANIZATIONS,
  NAV_GROUPS,
  SETTINGS_GROUP,
  INITIAL_CLIENTS,
  INITIAL_STAFF,
  INITIAL_NOTES,
  INITIAL_ISPS,
  INITIAL_CALENDAR,
  INITIAL_DRILLS,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';
import { Organization, ClientRecord, StaffRecord, NotificationItem } from './types';

export default function App() {
  // Auth state: Start with Account Creation flow as requested
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Reuben Stewart',
    email: 'reuben.stewart@highpointe.org',
    agency: 'Highpointe 532 Services',
    role: 'Administrator',
  });

  const [organizations, setOrganizations] = useState<Organization[]>(ORGANIZATIONS);
  const [currentOrg, setCurrentOrg] = useState<Organization>(ORGANIZATIONS[0]);
  const [isCreateProgramOpen, setIsCreateProgramOpen] = useState(false);
  const [setupProgram, setSetupProgram] = useState<Organization | null>(null);
  const [curriculumSetupScreen, setCurriculumSetupScreen] = useState<CurriculumStep | 'none'>('none');
  const [forceOperationsView, setForceOperationsView] = useState(false);
  const [showCelebrationStage, setShowCelebrationStage] = useState(true);

  const [activeGroupKey, setActiveGroupKey] = useState<string>('home');
  const [activeItemId, setActiveItemId] = useState<string>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Entities state
  const [clients] = useState<ClientRecord[]>(INITIAL_CLIENTS);
  const [staff] = useState<StaffRecord[]>(INITIAL_STAFF);
  const [notes] = useState(INITIAL_NOTES);
  const [isps] = useState(INITIAL_ISPS);
  const [calendars] = useState(INITIAL_CALENDAR);
  const [drills] = useState(INITIAL_DRILLS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Deep detail selection
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Navigation handlers
  const handleSelectGroup = (groupKey: string) => {
    setActiveGroupKey(groupKey);
    setSelectedClient(null);

    const group = NAV_GROUPS.find((g) => g.key === groupKey);
    if (group && group.items.length > 0) {
      setActiveItemId(group.items[0].id);
    }
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedClient(null);
    setActiveItemId(itemId);

    // Check if it belongs to settings or normal groups
    const inSettings = SETTINGS_GROUP.items.some((it) => it.id === itemId);
    if (inSettings) {
      setActiveGroupKey('set');
    } else {
      NAV_GROUPS.forEach((g) => {
        if (g.items.some((it) => it.id === itemId)) {
          setActiveGroupKey(g.key);
        }
      });
    }
  };

  const handleSelectOrg = (org: Organization) => {
    setCurrentOrg(org);
    setForceOperationsView(false);
    toast.info(
      'Service Line Switched',
      `Active facility changed to ${org.name}.`
    );
  };

  const handleObjectivesConfigured = () => {
    setOrganizations((prev) =>
      prev.map((o) => (o.id === currentOrg.id ? { ...o, isConfigured: true } : o))
    );
    setCurrentOrg((prev) => ({ ...prev, isConfigured: true }));
    setCurriculumSetupScreen('none');
    setForceOperationsView(true);
    setShowCelebrationStage(true);
    Sound.fanfare();
    toast.success(
      'Curriculum Initialized',
      `Objectives for "${currentOrg.name}" configured and ready for the ribbon cutting celebration!`
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success('Action Items Cleared', 'All pending compliance alerts marked as acknowledged.');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    toast.info('Signed Out', 'Returned to account and agency onboarding portal.');
  };

  // Find active group for breadcrumbs
  const allGroups = [...NAV_GROUPS, SETTINGS_GROUP];
  const activeGroup = allGroups.find((g) => g.key === activeGroupKey) || NAV_GROUPS[0];
  const activeItem = activeGroup.items.find((it) => it.id === activeItemId) || activeGroup.items[0];

  // If not authenticated, start directly with the clean account creation flow
  if (!isAuthenticated) {
    return (
      <div className="relative">
        <AuthFlow
          onComplete={(userData) => {
            setCurrentUser(userData);
            setIsAuthenticated(true);
          }}
        />
        <Toaster
          position="top-center"
          options={{
            fill: '#00342f',
            roundness: 16,
          }}
          theme="light"
        />
      </div>
    );
  }

  // Full-Page Program Curriculum & Objective Setup Workflow (Screenshots 2, 3, 4)
  if (curriculumSetupScreen !== 'none') {
    return (
      <div className="relative min-h-screen w-screen overflow-x-hidden">
        <CurriculumSetupView
          program={currentOrg}
          initialStep={curriculumSetupScreen}
          onReturnToDashboard={() => setCurriculumSetupScreen('none')}
          onObjectivesConfigured={handleObjectivesConfigured}
        />
        <Toaster
          position="top-center"
          options={{
            fill: '#00342f',
            roundness: 16,
          }}
          theme="light"
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas text-grey-900 font-sans">
      {/* Primary Sidebar Rail & Menu Panel */}
      <Sidebar
        groups={NAV_GROUPS}
        activeGroupKey={activeGroupKey}
        activeItemId={activeItemId}
        onSelectGroup={handleSelectGroup}
        onSelectItem={handleSelectItem}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenProfile={() => handleSelectItem('agency')}
        onSignOut={handleSignOut}
      />

      {/* Main App Content Viewport */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <Header
          currentOrg={currentOrg}
          organizations={organizations}
          onSelectOrg={handleSelectOrg}
          onCreateProgram={() => setIsCreateProgramOpen(true)}
          activeGroup={activeGroup}
          activeItemTitle={activeItem.name}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onNavigateItem={handleSelectItem}
          onOpenTour={() => setIsTourOpen(true)}
          onOpenProfile={() => handleSelectItem('agency')}
          onSignOut={handleSignOut}
          selectedClientName={selectedClient?.name}
          onClearClient={() => setSelectedClient(null)}
          onOpenCelebration={() => {
            setShowCelebrationStage(true);
            Sound.fanfare();
          }}
        />

        {/* Scrollable Workstation Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {selectedClient ? (
            <ClientProfileView
              client={selectedClient}
              onBack={() => setSelectedClient(null)}
            />
          ) : (
            <>
              {activeItemId === 'overview' && (
                currentOrg.isConfigured === false && !forceOperationsView ? (
                  <UnconfiguredProgramView
                    program={currentOrg}
                    onStartSetup={() => setCurriculumSetupScreen('overview')}
                    onNavigateToTeam={() => handleSelectItem('staff')}
                    onNavigateToClients={() => handleSelectItem('clients')}
                    onSwitchToOperations={() => setForceOperationsView(true)}
                  />
                ) : (
                  <OverviewView
                    currentOrg={currentOrg}
                    clients={clients}
                    staff={staff}
                    onNavigate={handleSelectItem}
                    onSelectClient={setSelectedClient}
                    onOpenCelebration={() => {
                      setShowCelebrationStage(true);
                      Sound.fanfare();
                    }}
                  />
                )
              )}

              {activeItemId === 'compliance' && (
                <ComplianceView onNavigate={handleSelectItem} />
              )}

              {(activeItemId === 'notes' ||
                activeItemId === 'isp' ||
                activeItemId === 'calendar' ||
                activeItemId === 'drills') && (
                <ActivityListView
                  type={activeItemId as 'notes' | 'isp' | 'calendar' | 'drills'}
                  notes={notes}
                  isps={isps}
                  calendars={calendars}
                  drills={drills}
                />
              )}

              {activeItemId === 'clients' && (
                <div className="space-y-6 max-w-7xl mx-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-rail tracking-tight">Client Roster</h1>
                      <p className="text-xs text-grey-500 mt-1">
                        Select a client to view their individualized ISP objectives, medical facesheet, and calendar hours.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clients.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => setSelectedClient(c)}
                        className="bg-white p-5 rounded-3xl border border-border shadow-xs hover:border-brand-300 hover:shadow-card transition-all cursor-pointer space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-900 font-bold text-sm flex items-center justify-center border border-brand-200">
                              {c.name.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-bold text-sm text-rail">{c.name}</div>
                              <div className="text-xs text-grey-500">{c.uci}</div>
                            </div>
                          </div>
                          <span
                            className={
                              c.status === 'Active'
                                ? 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-grey-100 text-grey-600 border border-grey-200'
                            }
                          >
                            {c.status}
                          </span>
                        </div>

                        <div className="text-xs text-grey-600 pt-2 border-t border-border/60">
                          <div>Program: {c.program}</div>
                          <div className="text-grey-400 text-[11px] mt-0.5">{c.careStatus}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeItemId === 'staff' && <StaffListView staff={staff} />}

              {activeItemId === 'reports' && <ReportsDocsView />}
              {activeItemId === 'docs' && <ReportsDocsView />}

              {activeItemId === 'conb' && <OnboardingWorkflowView type="client" />}
              {activeItemId === 'sonb' && <OnboardingWorkflowView type="staff" />}

              {(activeItemId === 'lines' ||
                activeItemId === 'mods' ||
                activeItemId === 'agency' ||
                activeItemId === 'perm' ||
                activeItemId === 'bill' ||
                activeItemId === 'integ') && (
                <AdminSettingsView
                  type={activeItemId as 'lines' | 'mods' | 'agency' | 'perm' | 'bill' | 'integ'}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Guided Walkthrough Modal */}
      <GuidedTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onNavigate={handleSelectItem}
      />

      {/* Service Line Setup / Create New Program Wizard Modal */}
      <CreateProgramModal
        isOpen={isCreateProgramOpen}
        onClose={() => setIsCreateProgramOpen(false)}
        onProgramCreated={(newOrg) => {
          setOrganizations((prev) => [newOrg, ...prev]);
          setCurrentOrg(newOrg);
          setSetupProgram(newOrg);
        }}
      />

      {/* Post-Creation Program Setup Modal (Matching Figma Frame 2147238504) */}
      <ProgramSetupModal
        isOpen={!!setupProgram}
        program={setupProgram}
        onClose={() => setSetupProgram(null)}
        onNavigateToCurriculum={() => {
          setSetupProgram(null);
          setCurriculumSetupScreen('overview');
        }}
        onNavigateToTeam={() => {
          setSetupProgram(null);
          handleSelectItem('staff');
        }}
        onNavigateToClients={() => {
          setSetupProgram(null);
          handleSelectItem('clients');
        }}
      />

      {/* Sileo Toast Notification Container with Brand Design Tokens */}
      <Toaster
        position="top-center"
        options={{
          fill: '#00342f',
          roundness: 16,
        }}
        theme="light"
      />

      {/* Floating CareCentriq Mascot in bottom-right corner (matching Staging app screenshot) */}
      <button
        type="button"
        onClick={() => setIsTourOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-1.5 rounded-2xl bg-white/95 hover:bg-white backdrop-blur-sm border border-grey-200/90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group flex items-center gap-2 select-none"
        title="CareCentriq Assistant - Click for guided tour"
      >
        <div className="w-10 h-11 relative flex items-center justify-center">
          <AnimatedMascotSvg size={40} interactive enableWaving />
        </div>
        <span className="hidden group-hover:inline-block pr-2 text-xs font-semibold text-brand-900 transition-all animate-in fade-in">
          Need help?
        </span>
      </button>

      {/* Grand Finale Celebration Stage (Interactive Ribbon Cutting) */}
      <FinaleCelebrationStage
        isOpen={showCelebrationStage}
        onClose={() => setShowCelebrationStage(false)}
        onReturnToDashboard={() => setShowCelebrationStage(false)}
        onWatchVideo={() => {
          Sound.fanfare();
        }}
        programName={currentOrg.name}
        programCategory={(currentOrg as any).category || 'Day Services'}
        scheduleType="Regular program schedule"
        isBehavioral={true}
        objectivesCount={2}
        trainingsCount={2}
        tasksCount={3}
      />
    </div>
  );
}

