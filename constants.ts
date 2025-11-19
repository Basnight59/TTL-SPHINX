
import { FaithFramework, FaithFrameworkId, AgentProfile } from './types';

export const FRAMEWORKS: Record<FaithFrameworkId, FaithFramework> = {
  islamic: {
    id: 'islamic',
    name: 'Islamic Framework',
    description: 'Governance based on Maqasid al-Shari’ah, prioritizing preservation of faith, life, intellect, lineage, and property.',
    icon: 'Moon',
    terms: {
      scrutinize: 'Tafakkur (Reflection)',
      probe: 'Tahqiq (Verification)',
      hypothesize: 'Ijtihad (Reasoning)',
      investigate: 'Murāqabah (Watchfulness)',
      narrow: 'Tanqih (Refinement)',
      execute: 'Amānah (Trust)',
    },
    consentTitle: 'Sacred Consent: Murāqabah',
    consentDescription: 'Pause to reflect: Does this output align with Divine Will and preserve the dignity of creation? Grant authorization only if integrity is maintained.',
    sampleQueries: [
      "Analyze the ethical implications of trading cryptocurrency futures with high leverage under Sharia law.",
      "Draft a medical guideline for using porcine-derived heart valves for Muslim patients in critical condition."
    ]
  },
  jewish: {
    id: 'jewish',
    name: 'Jewish Framework',
    description: 'Ethical alignment with Halacha, emphasizing Pikuach Nefesh (saving life) and Emet (truth).',
    icon: 'Star',
    terms: {
      scrutinize: 'Bedikah (Inspection)',
      probe: 'Chakirah (Interrogation)',
      hypothesize: 'Svara (Logical Reasoning)',
      investigate: 'Hitbonenut (Contemplation)',
      narrow: 'Birur (Clarification)',
      execute: 'Ma’aseh (Action)',
    },
    consentTitle: 'Sacred Consent: Hitbonenut',
    consentDescription: 'Engage in deep contemplation. Ensure this decision upholds the covenant of ethics and responsibility before proceeding.',
    sampleQueries: [
      "Is it permissible to break Shabbat restrictions to operate a suicide prevention hotline?",
      "Determine the Halachic status of lab-grown meat produced from stem cells: is it pareve or fleishig?"
    ]
  },
  christian: {
    id: 'christian',
    name: 'Christian Framework',
    description: 'Stewardship-based governance focusing on Caritas (Charity), Truth, and the common good.',
    icon: 'Cross',
    terms: {
      scrutinize: 'Examination',
      probe: 'Inquiry',
      hypothesize: 'Discernment',
      investigate: 'Contemplation',
      narrow: 'Prudence',
      execute: 'Stewardship',
    },
    consentTitle: 'Sacred Consent: Discernment',
    consentDescription: 'Prayerfully discern the spirit of this output. Does it serve the neighbor and truth? Authorize only if it aligns with these virtues.',
    sampleQueries: [
      "Evaluate the morality of CRISPR gene editing for non-therapeutic enhancements in unborn children.",
      "Draft an investment stewardship policy for a church endowment that excludes weapons and gambling."
    ]
  },
  secular: {
    id: 'secular',
    name: 'Secular Humanist',
    description: 'Rational ethics focusing on human rights, harm reduction, and informed consent.',
    icon: 'Globe',
    terms: {
      scrutinize: 'Peer Review',
      probe: 'Evidence Check',
      hypothesize: 'Scenario Planning',
      investigate: 'Ethical Impact',
      narrow: 'Risk Mitigation',
      execute: 'Authorization',
    },
    consentTitle: 'Human Oversight: Review',
    consentDescription: 'Pause for critical human review. Does this meet the standards of safety, fairness, and transparency?',
    sampleQueries: [
      "Propose a triage protocol for autonomous vehicles deciding between saving a passenger vs. a pedestrian.",
      "Audit a proposed facial recognition deployment in public housing for potential racial bias and privacy rights."
    ]
  },
};

export const SPHINX_LETTERS = ['S', 'P', 'H', 'I', 'N', 'X'];
export const SPHINX_FULL = ['Scrutinize', 'Probe', 'Hypothesize', 'Investigate', 'Narrow', 'Execute'];

// Simulating the multi-model orchestration layer
export const AGENT_MAPPING: Record<string, AgentProfile> = {
  scrutinize: {
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    role: "Strategic Analysis",
    color: "text-orange-400"
  },
  probe: {
    name: "Gemini 1.5 Pro",
    provider: "Google",
    role: "Evidence Verification",
    color: "text-blue-400"
  },
  hypothesize: {
    name: "GPT-4o",
    provider: "OpenAI",
    role: "Reasoning Engine",
    color: "text-green-400"
  },
  investigate: {
    name: "Claude 3 Opus",
    provider: "Anthropic",
    role: "Ethical Alignment",
    color: "text-purple-400"
  },
  narrow: {
    name: "Llama 3 70B",
    provider: "Meta",
    role: "Synthesis",
    color: "text-indigo-400"
  },
  execute: {
    name: "Human Operator",
    provider: "S.P.H.I.N.X.",
    role: "Final Authority",
    color: "text-gold-500"
  }
};
