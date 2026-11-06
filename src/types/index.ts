export interface Organization {
  id: string;
  name: string;
  clientsCount: number;
  teamCount: number;
  badges: string[];
  isConfigured?: boolean;
}

export interface NavItem {
  id: string;
  name: string;
  tip?: string;
  was?: string;
}

export interface NavGroup {
  key: string;
  name: string;
  icon: string;
  tip: string;
  items: NavItem[];
}

export interface ClientRecord {
  id: string;
  name: string;
  uci: string;
  services: string[];
  status: 'Active' | 'Inactive';
  alerts: string[];
  dob: string;
  insurance: string;
  program: string;
  emergencyContact: { name: string; relation: string; phone: string };
  caseManager: string;
  careStatus: string;
  isBehavioral: boolean;
}

export interface StaffRecord {
  id: string;
  name: string;
  tag: string;
  role: string;
  program: string;
  status: 'Active' | 'Inactive';
  chip: string;
  alerts: { type: 'r' | 'y' | 'b' | 'g'; title: string; desc: string; action: string }[];
  shift?: string;
}

export interface DailyNoteRecord {
  id: string;
  client: string;
  uci: string;
  service: string;
  status: 'Submitted' | 'Not submitted' | 'Draft';
  time?: string;
  author?: string;
}

export interface IspRecord {
  id: string;
  client: string;
  uci: string;
  service: string;
  type: 'Initial' | '30-Day' | 'Semi-Annual' | 'Annual';
  due: string;
  status: 'Submitted' | 'Due soon' | 'Missing';
}

export interface CalendarRecord {
  id: string;
  client: string;
  service: string;
  type: 'Days' | 'Hours';
  doneRequired: string;
  status: 'Complete' | 'Incomplete' | 'Missing';
}

export interface DrillRecord {
  id: string;
  client: string;
  service: string;
  drill: string;
  staff: string;
  status: 'Completed' | 'Missing';
}

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  targetId: string;
  read: boolean;
  time: string;
}

