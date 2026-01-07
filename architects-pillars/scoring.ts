import { PillarId, pillars, quizQuestions, Level, archetypes, Archetype } from './quizData';

export interface PillarScore {
  pillarId: PillarId;
  rawScore: number;
  maxScore: number;
  normalizedScore: number;
  level: Level;
}

export function calculateScores(answers: Record<string, string[]>): PillarScore[] {
  // Initialize raw scores for all pillars
  const pillarScores: Record<PillarId, number> = {} as Record<PillarId, number>;
  pillars.forEach((pillar) => {
    pillarScores[pillar.id] = 0;
  });

  // Sum contributions from all selected options.
  // For multi-select questions, use an average per question so selecting more options
  // doesn't automatically inflate scores.
  quizQuestions.forEach((question) => {
    const selectedOptionIds = answers[question.id] || [];
    if (selectedOptionIds.length === 0) return;

    const perQuestion: Partial<Record<PillarId, number>> = {};

    question.options.forEach((option) => {
      if (selectedOptionIds.includes(option.id) && option.contributions) {
        Object.entries(option.contributions).forEach(([pillarId, value]) => {
          const key = pillarId as PillarId;
          perQuestion[key] = (perQuestion[key] ?? 0) + value;
        });
      }
    });

    const divisor = selectedOptionIds.length;
    (Object.entries(perQuestion) as Array<[PillarId, number | undefined]>).forEach(([pillarId, sum]) => {
      if (typeof sum !== 'number') return;
      pillarScores[pillarId] += sum / divisor;
    });
  });

  // Calculate max possible positive score per pillar (for normalization).
  // Use sum of per-question maxima (not sum of all positives across all options),
  // so the scale stays meaningful and consistent.
  const maxPossible: Record<PillarId, number> = {} as Record<PillarId, number>;
  pillars.forEach((pillar) => {
    maxPossible[pillar.id] = 0;
  });

  quizQuestions.forEach((question) => {
    pillars.forEach((pillar) => {
      let maxInQuestion = 0;
      question.options.forEach((option) => {
        const v = option.contributions?.[pillar.id] ?? 0;
        if (v > maxInQuestion) maxInQuestion = v;
      });
      maxPossible[pillar.id] += maxInQuestion;
    });
  });

  // Normalize scores: floor at zero, scale to 0-5
  return pillars.map((pillar) => {
    const rawScore = pillarScores[pillar.id];
    const flooredScore = Math.max(0, rawScore); // Floor at zero
    const max = maxPossible[pillar.id] || 1;
    const normalizedScore = (flooredScore / max) * 5; // Scale to 0-5
    const level = getLevel(normalizedScore);

    return {
      pillarId: pillar.id,
      rawScore: parseFloat(rawScore.toFixed(2)),
      maxScore: parseFloat(max.toFixed(2)),
      normalizedScore: parseFloat(normalizedScore.toFixed(2)),
      level,
    };
  });
}

export function getLevel(score: number): Level {
  // Calibrated for the quiz's normalization (0–5) and multi-select averaging:
  // - "high" should be reachable but still distinctive
  // - "medium" should be common for strong-but-not-dominant pillars
  if (score >= 3.0) return 'high';
  if (score >= 1.8) return 'medium';
  return 'low';
}

export function getLevelsByPillar(scores: PillarScore[]): Record<PillarId, Level> {
  const levels: Record<PillarId, Level> = {} as Record<PillarId, Level>;
  scores.forEach((score) => {
    levels[score.pillarId] = score.level;
  });
  return levels;
}

export function matchArchetypes(levels: Record<PillarId, Level>): Archetype[] {
  return archetypes.filter((archetype) => archetype.match(levels));
}

export function getRadarData(scores: PillarScore[]): { pillar: string; score: number; fullMark: number }[] {
  return scores.map((score) => {
    const pillar = pillars.find((p) => p.id === score.pillarId);
    return {
      pillar: pillar?.shortName || score.pillarId,
      score: score.normalizedScore,
      fullMark: 5,
    };
  });
}
