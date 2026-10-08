import {
  Memory,
  Commitment,
  Task,
  Routine,
  Skill,
  ConnectedTool,
  Permission,
  ChatMessage,
} from '../types';

// --- Memories ---
export const mockMemories: Memory[] = [
  {
    id: 'm1',
    text: 'I prefer morning workouts',
    category: 'about_me',
    createdAt: '2024-10-15T08:00:00.000Z',
  },
  {
    id: 'm2',
    text: 'Preparing for the Nebius × NVIDIA hackathon',
    category: 'projects',
    createdAt: '2024-10-20T09:30:00.000Z',
  },
  {
    id: 'm3',
    text: 'Prefers concise explanations',
    category: 'preferences',
    createdAt: '2024-10-18T11:00:00.000Z',
  },
  {
    id: 'm4',
    text: 'Building a Personal AI mobile app with React Native and Expo',
    category: 'projects',
    createdAt: '2024-10-22T14:00:00.000Z',
  },
  {
    id: 'm5',
    text: 'I am a young professional based in Kuala Lumpur',
    category: 'about_me',
    createdAt: '2024-10-10T07:00:00.000Z',
  },
];

// --- Commitments ---
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

export const mockCommitments: Commitment[] = [
  {
    id: 'c1',
    title: 'Doctor appointment',
    dueDate: '2024-11-03',
    reminderDate: '2024-10-31',
    status: 'active',
  },
  {
    id: 'c2',
    title: 'Follow up with John',
    dueDate: yesterday,
    status: 'overdue',
  },
];

// --- Tasks ---
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

export const mockTasks: Task[] = [
  {
    id: 't1',
    title: 'Prepare hackathon demo',
    dueDate: tomorrow,
    completed: false,
  },
  {
    id: 't2',
    title: 'Buy keyboard',
    completed: false,
  },
];

// --- Routines ---
const daysAgo = (n: number) =>
  new Date(Date.now() - n * 86400000).toISOString();

export const mockRoutines: Routine[] = [
  {
    id: 'r1',
    name: 'Exercise',
    frequencyDays: 3,
    lastCompletedAt: daysAgo(1),
    status: 'on_track',
  },
  {
    id: 'r2',
    name: 'Apartment cleaning',
    frequencyDays: 14,
    lastCompletedAt: daysAgo(12),
    status: 'due_soon',
  },
  {
    id: 'r3',
    name: 'Change bedding',
    frequencyDays: 14,
    lastCompletedAt: daysAgo(16),
    status: 'overdue',
  },
];

// --- Skills ---
export const mockSkills: Skill[] = [
  {
    id: 's1',
    name: 'Weekly Planning',
    description: 'Review your week, set priorities, and schedule key tasks.',
    icon: '📅',
    tools: ['Calendar', 'Tasks', 'Goals'],
  },
  {
    id: 's2',
    name: 'Meeting Preparation',
    description: 'Summarise context and prepare talking points before meetings.',
    icon: '🎯',
    tools: ['Calendar', 'Files'],
  },
  {
    id: 's3',
    name: 'Meeting Summary',
    description: 'Capture action items and decisions after a meeting.',
    icon: '📝',
    tools: ['Files', 'Tasks'],
  },
];

// --- Connected Tools ---
export const mockConnectedTools: ConnectedTool[] = [
  {
    id: 'tool1',
    name: 'Calendar',
    icon: '📅',
    connected: true,
    iconBg: '#EEF2FF',
  },
  {
    id: 'tool2',
    name: 'Tasks',
    icon: '✅',
    connected: true,
    iconBg: '#F0FDF4',
  },
  {
    id: 'tool3',
    name: 'Files',
    icon: '📁',
    connected: true,
    iconBg: '#FEF3C7',
  },
  {
    id: 'tool4',
    name: 'Email',
    icon: '📧',
    connected: false,
    iconBg: '#F3F4F6',
  },
  {
    id: 'tool5',
    name: 'Messages',
    icon: '💬',
    connected: false,
    iconBg: '#F3F4F6',
  },
];

// --- Permissions ---
export const mockPermissions: Permission[] = [
  { id: 'p1', tool: 'Calendar', action: 'read events', enabled: true },
  { id: 'p2', tool: 'Calendar', action: 'create events', enabled: true },
  { id: 'p3', tool: 'Calendar', action: 'delete events', enabled: false },
  { id: 'p4', tool: 'Tasks', action: 'create tasks', enabled: true },
  { id: 'p5', tool: 'Tasks', action: 'complete tasks', enabled: true },
  { id: 'p6', tool: 'Messages', action: 'send messages', enabled: false },
  { id: 'p7', tool: 'Files', action: 'read files', enabled: true },
  { id: 'p8', tool: 'Files', action: 'write files', enabled: false },
];

// --- Chat Messages ---
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg1',
    role: 'user',
    content: 'Can you book a doctor appointment for me next Sunday?',
    timestamp: '2024-10-25T10:00:00.000Z',
  },
  {
    id: 'msg2',
    role: 'ai',
    content:
      "I've created a commitment for your doctor appointment on November 3rd and set a reminder for October 31st so you have time to confirm the booking.",
    timestamp: '2024-10-25T10:00:05.000Z',
    action: {
      type: 'commitment_created',
      title: 'Commitment created',
      subtitle: 'Doctor appointment — Nov 3',
      meta: 'Reminder set for Oct 31',
      linkText: 'View commitment',
    },
  },
  {
    id: 'msg3',
    role: 'user',
    content: 'Schedule a hackathon planning session for this week.',
    timestamp: '2024-10-25T10:05:00.000Z',
  },
  {
    id: 'msg4',
    role: 'ai',
    content: '',
    timestamp: '2024-10-25T10:05:02.000Z',
    toolExecution: {
      title: 'Working on it...',
      steps: [
        { label: 'Checking your calendar availability', completed: true },
        { label: 'Finding the best time slot', completed: true },
        { label: 'Creating calendar event', completed: false },
      ],
    },
  },
  {
    id: 'msg5',
    role: 'ai',
    content:
      "I've scheduled a hackathon planning session for Wednesday at 10 AM. I checked your calendar and that slot was free.",
    timestamp: '2024-10-25T10:05:10.000Z',
    action: {
      type: 'calendar_event_created',
      title: 'Calendar event created',
      subtitle: 'Hackathon Planning — Wed, Oct 30, 10:00 AM',
      meta: '1 hour · Google Meet link added',
      linkText: 'Open in Calendar',
    },
  },
  {
    id: 'msg6',
    role: 'user',
    content: 'Remind me to follow up with John tomorrow.',
    timestamp: '2024-10-25T10:10:00.000Z',
  },
];
