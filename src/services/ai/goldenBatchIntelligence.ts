// src/services/ai/goldenBatchIntelligence.ts

import { SEED_EVENTS } from "@/services/data/seedData";
import { RCALearningEngine } from "./rcaLearningEngine";

export interface GoldenBatchInsight {
  parameter: string;
  currentValue: number;
  goldenWindow: { lower: number; upper: number };
  zScore: number;
  status: "Within Window" | "Drift Detected";
  relatedRCAs: string[];
  recommendation: string;
}

export class GoldenBatchIntelligence {
  // Analyze parameter and link to historical RCAs
  static analyzeParameter(
    paramKey: string,
    currentValue: number,
    mean: number,
    sigma: number
  ): GoldenBatchInsight {
    const lower = mean - 3 * sigma;
    const upper = mean + 3 * sigma;
    const zScore = (currentValue - mean) / sigma;
    const status = Math.abs(zScore) > 3 ? "Drift Detected" : "Within Window";

    // Find related RCAs from events with similar parameter issues
    const relatedRCAs = this.findRelatedRCAs(paramKey, currentValue);

    // Generate recommendation based on historical patterns
    const recommendation = this.generateRecommendation(paramKey, zScore, relatedRCAs);

    return {
      parameter: paramKey,
      currentValue,
      goldenWindow: { lower, upper },
      zScore,
      status,
      relatedRCAs: relatedRCAs.slice(0, 3).map((r) => r.id),
      recommendation,
    };
  }

  // Find RCAs related to specific parameter
  static findRelatedRCAs(paramKey: string, value: number): (typeof SEED_EVENTS)[] {
    // Map parameters to event keywords
    const paramMap: Record<string, string[]> = {
      billetTemp: ["temperature", "billet", "heat", "extrusion"],
      dieTemp: ["temperature", "die", "extrusion", "fluctuation"],
      extrusionSpeed: ["speed", "extrusion", "hydraulic", "pressure"],
      quenchRate: ["quench", "cooling", "rate", "pump"],
      bondingTemp: ["bonding", "temperature", "solder", "thermal"],
      ultrasonicPower: ["ultrasonic", "power", "transducer", "bonding"],
      bondingPressure: ["pressure", "bonding", "joint", "pneumatic"],
      bondingTime: ["time", "bonding", "cycle", "duration"],
      bathTemp: ["bath", "temperature", "plating", "heater"],
      currentDensity: ["current", "density", "plating", "rectifier"],
      phValue: ["ph", "plating", "sensor", "calibration"],
      platingTime: ["time", "plating", "cycle", "duration"],
    };

    const keywords = paramMap[paramKey] || [paramKey];

    return SEED_EVENTS.filter((event) => {
      const text =
        `${event.title} ${event.description} ${event.rootCauseDescription || ""}`.toLowerCase();
      return keywords.some((kw) => text.includes(kw)) && event.status === "Closed";
    });
  }

  // Generate intelligent recommendation
  static generateRecommendation(paramKey: string, zScore: number, relatedRCAs: any[]): string {
    if (Math.abs(zScore) <= 3) {
      return "Parameter is within acceptable range. Continue monitoring.";
    }

    if (zScore > 3) {
      return `Parameter is above upper limit. Based on ${relatedRCAs.length} similar historical cases, check for: ${this.suggestChecks(paramKey, "high")}`;
    }

    return `Parameter is below lower limit. Based on ${relatedRCAs.length} similar historical cases, check for: ${this.suggestChecks(paramKey, "low")}`;
  }

  // Suggest specific checks based on parameter
  static suggestChecks(paramKey: string, direction: "high" | "low"): string {
    const checks: Record<string, Record<string, string>> = {
      billetTemp: {
        high: "thermocouple calibration, heater control, setpoint verification",
        low: "heater element, power supply, setpoint verification",
      },
      coolingRate: {
        high: "pump speed, valve position, flow meter calibration",
        low: "pump condition, filter blockage, flow meter calibration",
      },
      ultrasonicPower: {
        high: "transducer condition, generator output, cable integrity",
        low: "transducer wear, generator output, cable connections",
      },
      phValue: {
        high: "sensor calibration, chemical addition, bath contamination",
        low: "sensor calibration, chemical depletion, bath contamination",
      },
    };

    return checks[paramKey]?.[direction] || "review setpoints and calibration";
  }
}
