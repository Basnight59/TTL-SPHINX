
export type FaithFrameworkId = 'islamic' | 'jewish' | 'christian' | 'secular';

export type AppState = 'selection' | 'input' | 'processing' | 'complete';

export interface FaithFramework {
  id: FaithFrameworkId;
  name: string;
  description: string;
  icon: string; // We'll use lucide icon names conceptually
  terms: {
    scrutinize: string;
    probe: string;
    hypothesize: string;
    investigate: string; // Usually the 'Sacred Consent' step
    narrow: string;
    execute: string;
  };
  consentTitle: string;
  consentDescription: string;
  sampleQueries: string[];
}

export interface AgentProfile {
  name: string;
  provider: string;
  role: string;
  color: string; // Tailwind color class for UI
}

export interface SphinxStepData {
  agent?: AgentProfile;
  [key: string]: any;
}

export interface SphinxResponse {
  scrutinize: {
    analysis: string;
    flagged_issues: string[];
    agent?: AgentProfile;
  };
  probe: {
    evidence_chain: string;
    sources_type: string;
    agent?: AgentProfile;
  };
  hypothesize: {
    alternatives_considered: string[];
    chosen_path: string;
    agent?: AgentProfile;
  };
  investigate: {
    ethical_alignment: string;
    sacred_consent_check: string;
    agent?: AgentProfile;
  };
  narrow: {
    actionable_steps: string[];
    agent?: AgentProfile;
  };
  execute: {
    final_attestation: string;
    handoff_summary: string;
    agent?: AgentProfile;
  };
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: 'User' | 'System' | 'AI_Agent';
  action: string;
  details?: string;
  hash?: string;
}
