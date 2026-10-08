export type MemoryCategory = 'about_me' | 'preferences' | 'projects' | 'people';

export interface Memory {
  id: string;
  text: string;
  category: MemoryCategory;
  createdAt: string;
}

export interface Commitment {
  id: string;
  title: string;
  dueDate: string;
  reminderDate?: string;
  status: 'active' | 'overdue' | 'completed';
}

export interface Task {
  id: string;
  title: string;
  dueDate?: string;
  completed: boolean;
}

export interface Routine {
  id: string;
  name: string;
  frequencyDays: number;
  lastCompletedAt: string;
  status: 'on_track' | 'due_soon' | 'overdue';
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string;
  tools: string[];
}

export interface ConnectedTool {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  iconBg?: string;
}

export interface Permission {
  id: string;
  tool: string;
  action: string;
  enabled: boolean;
}

export type MessageRole = 'user' | 'ai';

export type AgentActionType =
  | 'memory_created'
  | 'commitment_created'
  | 'task_created'
  | 'calendar_event_created'
  | 'routine_updated'
  | 'skill_executed';

export interface AgentAction {
  type: AgentActionType;
  title: string;
  subtitle?: string;
  meta?: string;
  linkText?: string;
}

export interface ToolExecutionStep {
  label: string;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  action?: AgentAction;
  toolExecution?: {
    title: string;
    steps: ToolExecutionStep[];
  };
}
