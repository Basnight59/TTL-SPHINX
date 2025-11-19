
import { GoogleGenAI, Type } from "@google/genai";
import { FaithFrameworkId, SphinxResponse } from "../types";
import { FRAMEWORKS, AGENT_MAPPING } from "../constants";

// NOTE: We assume process.env.API_KEY is available. 
// In a real production build, this might be proxied through a backend to hide the key, 
// but for this React demo, we use the env var directly as per instructions.

export const generateSphinxAnalysis = async (
  query: string, 
  frameworkId: FaithFrameworkId
): Promise<SphinxResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is missing from environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const framework = FRAMEWORKS[frameworkId];

  const prompt = `
    You are the S.P.H.I.N.X. (Scrutinize, Probe, Hypothesize, Investigate, Narrow, Execute) Governance Engine.
    
    Your task is to act as a **Multi-Model Orchestrator**, generating the analysis that would be produced by specialized AI agents for each step of the protocol.
    
    User Query: "${query}"
    Framework: **${framework.name}**
    
    Perform the following steps, adopting the specific persona for each:

    1. **Scrutinize**: Analyze for bias and harm.
    2. **Probe**: Check factual validity and evidence.
    3. **Hypothesize**: Generate alternative ethical approaches.
    4. **Investigate**: Apply the **Sacred Consent** check (${framework.terms.investigate}).
    5. **Narrow**: Synthesize actionable steps.
    6. **Execute**: Final attestation.

    IMPORTANT: You MUST return a valid JSON object matching the schema below. Do not include markdown formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.4, // Lower temperature for more deterministic JSON structure
        responseSchema: {
          type: Type.OBJECT,
          required: ["scrutinize", "probe", "hypothesize", "investigate", "narrow", "execute"],
          properties: {
            scrutinize: {
              type: Type.OBJECT,
              required: ["analysis", "flagged_issues"],
              properties: {
                analysis: { type: Type.STRING },
                flagged_issues: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              propertyOrdering: ["analysis", "flagged_issues"]
            },
            probe: {
              type: Type.OBJECT,
              required: ["evidence_chain", "sources_type"],
              properties: {
                evidence_chain: { type: Type.STRING },
                sources_type: { type: Type.STRING }
              },
              propertyOrdering: ["evidence_chain", "sources_type"]
            },
            hypothesize: {
              type: Type.OBJECT,
              required: ["alternatives_considered", "chosen_path"],
              properties: {
                alternatives_considered: { type: Type.ARRAY, items: { type: Type.STRING } },
                chosen_path: { type: Type.STRING }
              },
              propertyOrdering: ["alternatives_considered", "chosen_path"]
            },
            investigate: {
              type: Type.OBJECT,
              required: ["ethical_alignment", "sacred_consent_check"],
              properties: {
                ethical_alignment: { type: Type.STRING },
                sacred_consent_check: { type: Type.STRING }
              },
              propertyOrdering: ["ethical_alignment", "sacred_consent_check"]
            },
            narrow: {
              type: Type.OBJECT,
              required: ["actionable_steps"],
              properties: {
                actionable_steps: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            execute: {
              type: Type.OBJECT,
              required: ["final_attestation", "handoff_summary"],
              properties: {
                final_attestation: { type: Type.STRING },
                handoff_summary: { type: Type.STRING }
              },
              propertyOrdering: ["final_attestation", "handoff_summary"]
            }
          },
          propertyOrdering: ["scrutinize", "probe", "hypothesize", "investigate", "narrow", "execute"]
        }
      }
    });

    if (!response.text) {
        throw new Error("Empty response from AI");
    }

    const parsedData = JSON.parse(response.text) as SphinxResponse;
    
    // ENRICHMENT: Here we inject the "Isnād Chain" agents into the data structure
    // This simulates the multi-model orchestration for the frontend/HOB
    parsedData.scrutinize.agent = AGENT_MAPPING['scrutinize'];
    parsedData.probe.agent = AGENT_MAPPING['probe'];
    parsedData.hypothesize.agent = AGENT_MAPPING['hypothesize'];
    parsedData.investigate.agent = AGENT_MAPPING['investigate'];
    parsedData.narrow.agent = AGENT_MAPPING['narrow'];
    parsedData.execute.agent = AGENT_MAPPING['execute'];

    return parsedData;
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate S.P.H.I.N.X. analysis. Please try again or use a simpler query.");
  }
};
