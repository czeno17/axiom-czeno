// src/services/ai/intelligentTriage.ts

import { OpenAI } from "openai";
import { pgvector } from "@/db/pgvector";
import { SEED_EVENTS } from "@/services/data/seedData";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface TriageSuggestion {
  category: string;
  severity: string;
  assignee: string;
  confidence: number;
  similarEvents: SimilarEvent[];
  suggestedRCA: string;
}

export interface SimilarEvent {
  id: string;
  title: string;
  rootCause: string;
  solution: string;
  effectiveness: boolean;
  similarity: number;
}

export class IntelligentTriage {
  // Learn from all closed CAPAs
  static getKnowledgeBase() {
    const closedCAPAs = SEED_EVENTS.filter(
      (e) => e.status === "Closed" && e.type === "CAPA" && e.rootCauseDescription
    );

    return closedCAPAs.map((e) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      rootCause: e.rootCauseDescription,
      solution: e.resolutionDetails,
      effectiveness: e.effectivenessVerification,
      lessonsLearned: e.lessonsLearned,
      category: e.category,
      severity: e.severity,
    }));
  }

  // Find similar historical events using vector search
  static async findSimilarEvents(description: string, limit: number = 3): Promise<SimilarEvent[]> {
    // Generate embedding for the new description
    const embedding = await this.generateEmbedding(description);

    // Search in database (or seed data)
    const allEvents = SEED_EVENTS;

    // Calculate cosine similarity
    const results = allEvents.map((event) => {
      // In production, use pgvector similarity
      const similarity = this.calculateCosineSimilarity(
        embedding,
        this.stringToEmbedding(event.description + " " + (event.rootCauseDescription || ""))
      );

      return {
        ...event,
        similarity,
      };
    });

    // Sort by similarity and return top N
    return results
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map((e) => ({
        id: e.id,
        title: e.title,
        rootCause: e.rootCauseDescription || "N/A",
        solution: e.resolutionDetails || "N/A",
        effectiveness: e.status === "Closed",
        similarity: e.similarity,
      }));
  }

  // Intelligent categorization using LLM
  static async categorizeIssue(description: string): Promise<{
    category: string;
    severity: string;
    confidence: number;
  }> {
    const prompt = `
      You are a quality engineer expert. Analyze this quality issue and provide:
      1. Category (Mechanical, Dimensional, Cosmetic, Electrical, Process, Material, Equipment)
      2. Severity (Minor, Major, Critical)
      3. Confidence score (0-1)

      Issue: "${description}"

      Consider similar historical issues:
      ${this.getKnowledgeBase()
        .map((kb) => `- ${kb.title}: Root cause was ${kb.rootCause}, solution was ${kb.solution}`)
        .join("\n")}

      Return JSON format only.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  }

  // Suggest root cause based on similar historical cases
  static async suggestRootCause(description: string): Promise<{
    rootCause: string;
    solution: string;
    confidence: number;
    similarCases: string[];
  }> {
    const similarEvents = await this.findSimilarEvents(description, 5);

    // Use LLM to synthesize root cause from similar cases
    const prompt = `
      Based on these similar historical quality issues, suggest the most likely root cause and solution:

      ${similarEvents
        .map(
          (e) =>
            `- ${e.title}: Root cause: ${e.rootCause}, Solution: ${e.solution}, Effective: ${e.effectiveness}`
        )
        .join("\n")}

      For the new issue: "${description}"

      Return JSON with:
      - rootCause: suggested root cause
      - solution: recommended solution
      - confidence: 0-1
      - similarCases: array of IDs from similar cases used
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  }

  // Generate final triage suggestion
  static async triage(description: string): Promise<TriageSuggestion> {
    const [categorization, rootCauseSuggestion, similarEvents] = await Promise.all([
      this.categorizeIssue(description),
      this.suggestRootCause(description),
      this.findSimilarEvents(description, 3),
    ]);

    return {
      category: categorization.category,
      severity: categorization.severity,
      assignee: this.suggestAssignee(categorization.category),
      confidence: categorization.confidence,
      similarEvents,
      suggestedRCA: rootCauseSuggestion.rootCause,
    };
  }

  // Smart assignee suggestion based on past assignments
  static suggestAssignee(category: string): string {
    const assigneeMap: Record<string, string> = {
      Mechanical: "Process-Owner-1",
      Dimensional: "Process-Owner-4",
      Cosmetic: "Process-Owner-4",
      Electrical: "Process-Owner-2",
      Process: "Process-Owner-1",
      Material: "Process-Owner-3",
      Equipment: "Process-Owner-2",
    };

    return assigneeMap[category] || "Process-Owner-1";
  }

  // Helper methods
  static async generateEmbedding(text: string): Promise<number[]> {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    return response.data[0].embedding;
  }

  static stringToEmbedding(text: string): number[] {
    // Simple hash-based embedding for demo
    // In production, use actual embedding
    const words = text.split(" ");
    return words.map((w) => w.length / 100);
  }

  static calculateCosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;
    let dot = 0,
      normA = 0,
      normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}
