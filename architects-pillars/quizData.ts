export type PillarId =
  | "influencing"
  | "impact"
  | "longTerm"
  | "clarity"
  | "decisionMaking"
  | "collaboration"
  | "learning"
  | "resilience"
  | "criticalThinking";

export interface Pillar {
  id: PillarId;
  name: string;
  shortName: string;
  description: string;
}

export interface QuizOption {
  id: string;
  text: string;
  contributions: Partial<Record<PillarId, number>>;
}

export interface QuizQuestion {
  id: string;
  pillarId: PillarId;
  text: string;
  options: QuizOption[];
}

export const pillars: Pillar[] = [
  {
    id: "influencing",
    name: "Influencing & Technical Leadership",
    shortName: "Influencing",
    description: "How you shape direction, bring people along, and lead technically in practice.",
  },
  {
    id: "impact",
    name: "Impact – Value-Driven Architecture",
    shortName: "Impact",
    description: "How strongly your decisions tie to real business, product, and customer outcomes.",
  },
  {
    id: "longTerm",
    name: "Long-Term Scalability & Sustainability",
    shortName: "Long-Term",
    description: "How well you design for multi-year horizons, scalability, and evolvability.",
  },
  {
    id: "clarity",
    name: "Clarity – Making Complexity Understandable",
    shortName: "Clarity",
    description: "How effectively you turn complexity into understandable concepts and artifacts.",
  },
  {
    id: "decisionMaking",
    name: "Decision Making – Right & Obligation to Decide",
    shortName: "Decisions",
    description: "How you handle architectural decisions: ownership, closure, and trade-offs.",
  },
  {
    id: "collaboration",
    name: "Collaboration, T-Shaped Thinking & Collegial Influence",
    shortName: "Collaboration",
    description: "How you operate across domains and act as a peer force-multiplier.",
  },
  {
    id: "learning",
    name: "Continuous Learning & Growth",
    shortName: "Learning",
    description: "How you stay relevant and bring new patterns and ideas into the organization.",
  },
  {
    id: "resilience",
    name: "Resilience & Adaptability",
    shortName: "Resilience",
    description: "How you respond to change, pressure, and unfamiliar domains.",
  },
  {
    id: "criticalThinking",
    name: "Critical Thinking & Constructive Challenge",
    shortName: "Critical Thinking",
    description: "How you stress-test ideas and challenge assumptions constructively.",
  },
];

export const quizQuestions: QuizQuestion[] = [
  // Pillar 1 – Influencing & Technical Leadership
  {
    id: "influencing-introduce-new-direction",
    pillarId: "influencing",
    text: "When you introduce a new architectural direction to a team, you usually…",
    options: [
      {
        id: "influencing-introduce-new-direction--prepare-a-written-proposal-to-give-people-time-t",
        text: "Prepare a written proposal to give people time to digest and respond thoughtfully.",
        contributions: { clarity: 0.8, longTerm: 0.3 },
      },
      {
        id: "influencing-introduce-new-direction--schedule-a-session-where-you-walk-through-the-id",
        text: "Schedule a session where you walk through the idea and invite questions.",
        contributions: { influencing: 0.8, collaboration: 0.5 },
      },
      {
        id: "influencing-introduce-new-direction--lead-with-technical-depth-patterns-diagrams-and-",
        text: "Lead with technical depth—patterns, diagrams, and implementation details.",
        contributions: { clarity: 0.7, longTerm: 0.4 },
      },
      {
        id: "influencing-introduce-new-direction--adjust-the-level-of-detail-based-on-who-is-in-th",
        text: "Adjust the level of detail based on who is in the room.",
        contributions: { influencing: 0.8, collaboration: 0.4 },
      },
      {
        id: "influencing-introduce-new-direction--have-targeted-1-1-conversations-with-key-stakeho",
        text: "Have targeted 1:1 conversations with key stakeholders beforehand, co-creating the direction so they feel ownership.",
        contributions: { influencing: 0.8, collaboration: 0.5, decisionMaking: 0.3 },
      },
    ],
  },
  {
    id: "influencing-ongoing-architectural-discussions",
    pillarId: "influencing",
    text: "In ongoing architectural discussions, you tend to…",
    options: [
      {
        id: "influencing-ongoing-architectural-discussions--speak-up-early-to-shape-the-direction",
        text: "Speak up early to shape the direction.",
        contributions: { influencing: 0.9, decisionMaking: 0.4 },
      },
      {
        id: "influencing-ongoing-architectural-discussions--listen-first-to-understand-the-room-then-contrib",
        text: "Listen first to understand the room, then contribute your perspective.",
        contributions: { collaboration: 0.5, influencing: 0.4, criticalThinking: 0.3 },
      },
      {
        id: "influencing-ongoing-architectural-discussions--offer-alternatives-when-you-see-a-better-way",
        text: "Offer alternatives when you see a better way.",
        contributions: { influencing: 0.7, criticalThinking: 0.5 },
      },
      {
        id: "influencing-ongoing-architectural-discussions--choose-your-moments-carefully-contributing-when-",
        text: "Choose your moments carefully, contributing when it will have the most impact.",
        contributions: { influencing: 0.7, criticalThinking: 0.5 },
      },
      {
        id: "influencing-ongoing-architectural-discussions--step-in-when-you-sense-the-group-is-getting-stuc",
        text: "Step in when you sense the group is getting stuck or confused.",
        contributions: { influencing: 0.7, collaboration: 0.5, resilience: 0.3 },
      },
    ],
  },
  {
    id: "influencing-facing-resistance",
    pillarId: "influencing",
    text: "When facing resistance to an architectural direction, you typically…",
    options: [
      {
        id: "influencing-facing-resistance--strengthen-your-case-by-bringing-additional-data",
        text: "Strengthen your case by bringing additional data, examples, or evidence.",
        contributions: { influencing: 0.6, criticalThinking: 0.5 },
      },
      {
        id: "influencing-facing-resistance--seek-to-understand-the-underlying-concerns-befor",
        text: "Seek to understand the underlying concerns before responding.",
        contributions: { collaboration: 0.6, influencing: 0.5, criticalThinking: 0.3 },
      },
      {
        id: "influencing-facing-resistance--build-a-coalition-of-supporters-who-can-help-adv",
        text: "Build a coalition of supporters who can help advocate for the approach.",
        contributions: { influencing: 0.8, collaboration: 0.5 },
      },
      {
        id: "influencing-facing-resistance--adapt-the-proposal-to-incorporate-valid-concerns",
        text: "Adapt the proposal to incorporate valid concerns while preserving core intent.",
        contributions: { influencing: 0.7, collaboration: 0.5, resilience: 0.3 },
      },
      {
        id: "influencing-facing-resistance--involve-leadership-when-the-decision-has-signifi",
        text: "Involve leadership when the decision has significant organizational implications.",
        contributions: { decisionMaking: 0.6, impact: 0.4, influencing: -0.2, collaboration: -0.2 },
      },
    ],
  },

  // Pillar 2 – Impact – Value-Driven Architecture
  {
    id: "impact-compare-design-options",
    pillarId: "impact",
    text: "When evaluating design options, you typically prioritize…",
    options: [
      {
        id: "impact-compare-design-options--advocate-for-proven-reliable-solutions-that-redu",
        text: "Proven solutions that reduce risk, prioritizing reliability over innovation.",
        contributions: { decisionMaking: 0.6, resilience: 0.4 },
      },
      {
        id: "impact-compare-design-options--technical-elegance-that-enables-maintainability-",
        text: "Technical elegance that enables maintainability and future flexibility.",
        contributions: { clarity: 0.5, longTerm: 0.5 },
      },
      {
        id: "impact-compare-design-options--pragmatic-delivery-speed-optimizing-for-learning",
        text: "Pragmatic delivery speed, optimizing for learning and iteration.",
        contributions: { impact: 0.7, learning: 0.4 },
      },
      {
        id: "impact-compare-design-options--how-well-the-option-fits-existing-organizational",
        text: "How well the option fits existing organizational constraints.",
        contributions: { impact: 0.6, collaboration: 0.5 },
      },
      {
        id: "impact-compare-design-options--how-clearly-you-can-explain-the-trade-offs-to-ot",
        text: "Whether you can clearly articulate why this option over the alternatives.",
        contributions: { clarity: 0.8, influencing: 0.4 },
      },
    ],
  },
  {
    id: "impact-recent-decisions",
    pillarId: "impact",
    text: "Looking back at your recent decisions, you can say that…",
    options: [
      {
        id: "impact-recent-decisions--at-least-one-decision-clearly-changed-a-product-",
        text: "At least one decision clearly changed a product or process outcome.",
        contributions: { impact: 1.0, influencing: 0.4 },
      },
      {
        id: "impact-recent-decisions--some-decisions-prioritized-technical-quality-tha",
        text: "Some decisions prioritized technical quality that enables future work.",
        contributions: { longTerm: 0.6, clarity: 0.4 },
      },
      {
        id: "impact-recent-decisions--you-sometimes-push-back-on-work-that-has-unclear",
        text: "You sometimes push back on work that has unclear business value.",
        contributions: { impact: 0.8, criticalThinking: 0.5 },
      },
      {
        id: "impact-recent-decisions--you-make-pragmatic-trade-offs-to-maintain-moment",
        text: "You make pragmatic trade-offs to maintain momentum when needed.",
        contributions: { impact: 0.6, resilience: 0.5 },
      },
      {
        id: "impact-recent-decisions--you-trust-your-decisions-and-avoid-unnecessary-s",
        text: "You trust your decisions and avoid unnecessary second-guessing.",
        contributions: { decisionMaking: 0.6, resilience: 0.5 },
      },
    ],
  },
  {
    id: "impact-choosing-architecture-investments",
    pillarId: "impact",
    text: "When deciding what architectural work is worth doing, you typically…",
    options: [
      {
        id: "impact-choosing-architecture-investments--define-explicit-success-metrics-and-track-whethe",
        text: "Define explicit success metrics and track whether the work changes outcomes.",
        contributions: { impact: 0.9, clarity: 0.4 },
      },
      {
        id: "impact-choosing-architecture-investments--tie-proposals-directly-to-customer-pain-product-",
        text: "Tie proposals directly to customer pain, product goals, and a clear 'why now'.",
        contributions: { impact: 0.8, collaboration: 0.4 },
      },
      {
        id: "impact-choosing-architecture-investments--run-quick-experiments-or-spikes-to-validate-valu",
        text: "Run quick experiments or spikes to validate value before committing fully.",
        contributions: { impact: 0.7, learning: 0.4 },
      },
      {
        id: "impact-choosing-architecture-investments--negotiate-trade-offs-with-stakeholders-and-secur",
        text: "Negotiate trade-offs with stakeholders and secure commitment to the decision.",
        contributions: { impact: 0.6, influencing: 0.5, collaboration: 0.3 },
      },
      {
        id: "impact-choosing-architecture-investments--invest-in-foundations-that-unlock-many-future-pr",
        text: "Invest in foundations that unlock many future product capabilities, even if payback is delayed.",
        contributions: { longTerm: 0.8, clarity: 0.3 },
      },
    ],
  },

  // Pillar 3 – Long-Term Scalability & Sustainability
  {
    id: "longterm-new-or-evolving-system",
    pillarId: "longTerm",
    text: "When working on a new or evolving system, you…",
    options: [
      {
        id: "longterm-new-or-evolving-system--prioritize-near-term-delivery-planning-to-iterat",
        text: "Prioritize near-term delivery, planning to iterate and evolve the design over time.",
        contributions: { impact: 0.7, learning: 0.4 },
      },
      {
        id: "longterm-new-or-evolving-system--explicitly-consider-how-the-design-behaves-at-mu",
        text: "Explicitly consider how the design behaves at much larger scale.",
        contributions: { longTerm: 0.9, criticalThinking: 0.4 },
      },
      {
        id: "longterm-new-or-evolving-system--document-assumptions-about-future-usage-or-growt",
        text: "Document assumptions about future usage or growth.",
        contributions: { longTerm: 0.8, clarity: 0.5 },
      },
      {
        id: "longterm-new-or-evolving-system--accept-some-shortcuts-if-the-expected-lifetime-o",
        text: "Accept some shortcuts if the expected lifetime of the solution is short.",
        contributions: { impact: 0.6, decisionMaking: 0.5 },
      },
      {
        id: "longterm-new-or-evolving-system--try-to-avoid-adding-anything-that-might-later-li",
        text: "Try to avoid adding anything that might later limit your options.",
        contributions: { longTerm: 0.7, criticalThinking: 0.3 },
      },
    ],
  },
  {
    id: "longterm-legacy-and-migrations",
    pillarId: "longTerm",
    text: "Regarding legacy and migrations, you…",
    options: [
      {
        id: "longterm-legacy-and-migrations--have-defined-at-least-one-multi-step-migration-o",
        text: "Have defined at least one multi-step migration or deprecation path.",
        contributions: { longTerm: 1.0, clarity: 0.4 },
      },
      {
        id: "longterm-legacy-and-migrations--weigh-the-cost-of-disruption-carefully-before-in",
        text: "Weigh the cost of disruption carefully before initiating legacy cleanup.",
        contributions: { criticalThinking: 0.5, resilience: 0.4, impact: 0.3 },
      },
      {
        id: "longterm-legacy-and-migrations--try-to-ensure-that-new-design-does-not-worsen-ex",
        text: "Try to ensure that new design does not worsen existing legacy risks.",
        contributions: { longTerm: 0.7, criticalThinking: 0.4 },
      },
      {
        id: "longterm-legacy-and-migrations--favor-clean-slate-designs-that-arent-burdened-by",
        text: "Favor clean-slate designs that aren't burdened by historical constraints.",
        contributions: { longTerm: 0.6, clarity: 0.4, learning: 0.3 },
      },
      {
        id: "longterm-legacy-and-migrations--regularly-discuss-long-term-end-states-not-only-",
        text: "Regularly discuss long-term end states, not only the next step.",
        contributions: { longTerm: 0.8, influencing: 0.4, clarity: 0.3 },
      },
    ],
  },

  // Pillar 4 – Clarity – Making Complexity Understandable
  {
    id: "clarity-documentation-approach",
    pillarId: "clarity",
    text: "When it comes to documentation, you…",
    options: [
      {
        id: "clarity-documentation-approach--trust-well-written-code-and-direct-conversations",
        text: "Trust well-written code and direct conversations as your primary communication channels.",
        contributions: { collaboration: 0.5, clarity: 0.4, influencing: 0.3 },
      },
      {
        id: "clarity-documentation-approach--create-documentation-when-theres-a-clear-audienc",
        text: "Create documentation when there's a clear audience need or requirement.",
        contributions: { clarity: 0.6, impact: 0.5 },
      },
      {
        id: "clarity-documentation-approach--maintain-a-curated-set-of-up-to-date-architectur",
        text: "Maintain a curated set of up-to-date architecture artifacts.",
        contributions: { clarity: 0.8, longTerm: 0.4 },
      },
      {
        id: "clarity-documentation-approach--invest-in-lightweight-living-documentation-close",
        text: "Invest in lightweight, living documentation close to the code.",
        contributions: { clarity: 0.6, longTerm: 0.5 },
      },
      {
        id: "clarity-documentation-approach--experiment-with-diagrams-rfcs-and-other-formats-",
        text: "Experiment with diagrams, RFCs, and other formats to find what resonates.",
        contributions: { clarity: 0.8, learning: 0.4 },
      },
    ],
  },
  {
    id: "clarity-communicating-architecture",
    pillarId: "clarity",
    text: "When communicating architecture to others, you…",
    options: [
      {
        id: "clarity-communicating-architecture--prefer-consistent-messaging-to-avoid-confusion-a",
        text: "Prefer consistent messaging to avoid confusion across audiences.",
        contributions: { clarity: 0.7, longTerm: 0.4 },
      },
      {
        id: "clarity-communicating-architecture--focus-on-technical-precision-trusting-others-to-",
        text: "Focus on technical precision, trusting others to ask clarifying questions.",
        contributions: { clarity: 0.6, criticalThinking: 0.5 },
      },
      {
        id: "clarity-communicating-architecture--tailor-your-message-based-on-audience-and-contex",
        text: "Tailor your message based on audience and context.",
        contributions: { influencing: 0.8, clarity: 0.5 },
      },
      {
        id: "clarity-communicating-architecture--use-analogies-and-storytelling-to-make-ideas-rel",
        text: "Use analogies and storytelling to make ideas relatable.",
        contributions: { clarity: 0.7, influencing: 0.5, collaboration: 0.3 },
      },
      {
        id: "clarity-communicating-architecture--check-for-understanding-and-adapt-based-on-feedb",
        text: "Check for understanding and adapt based on feedback.",
        contributions: { clarity: 0.8, collaboration: 0.4, influencing: 0.3 },
      },
    ],
  },

  // Pillar 5 – Decision Making – Right & Obligation to Decide
  {
    id: "decisionmaking-when-decision-stuck",
    pillarId: "decisionMaking",
    text: "When a decision is stuck, you tend to…",
    options: [
      {
        id: "decisionmaking-when-decision-stuck--ask-who-owns-the-decision-and-clarify-roles",
        text: "Ask who owns the decision and clarify roles.",
        contributions: { decisionMaking: 0.8, collaboration: 0.4 },
      },
      {
        id: "decisionmaking-when-decision-stuck--gather-additional-data-to-help-the-group-make-a-",
        text: "Gather additional data to help the group make a more informed decision, even if it means delaying closure a bit.",
        contributions: { criticalThinking: 0.6, clarity: 0.3 },
      },
      {
        id: "decisionmaking-when-decision-stuck--propose-a-concrete-option-and-suggest-committing",
        text: "Propose a concrete option and suggest committing to it.",
        contributions: { decisionMaking: 0.9, influencing: 0.5 },
      },
      {
        id: "decisionmaking-when-decision-stuck--allow-space-for-dissenting-voices-to-be-fully-he",
        text: "Allow space for dissenting voices to be fully heard before closing, even when this stretches the decision timeline.",
        contributions: { collaboration: 0.6, criticalThinking: 0.4 },
      },
      {
        id: "decisionmaking-when-decision-stuck--suggest-a-time-box-or-deadline-for-deciding",
        text: "Suggest a time-box or deadline for deciding.",
        contributions: { decisionMaking: 0.8, impact: 0.4 },
      },
    ],
  },
  {
    id: "decisionmaking-own-style",
    pillarId: "decisionMaking",
    text: "In your own decision-making style…",
    options: [
      {
        id: "decisionmaking-own-style--you-are-comfortable-deciding-with-incomplete-inf",
        text: "You are comfortable deciding with incomplete information.",
        contributions: { decisionMaking: 0.9, resilience: 0.5 },
      },
      {
        id: "decisionmaking-own-style--you-prefer-keeping-options-open-to-avoid-prematu",
        text: "You prefer keeping options open to avoid premature commitment, even when a timely decision could help unlock progress.",
        contributions: { criticalThinking: 0.5, resilience: 0.3, collaboration: 0.2, decisionMaking: -0.3 },
      },
      {
        id: "decisionmaking-own-style--you-document-decisions-when-they-affect-several-",
        text: "You document decisions when they affect several teams or systems.",
        contributions: { decisionMaking: 0.7, clarity: 0.5, collaboration: 0.3 },
      },
      {
        id: "decisionmaking-own-style--you-escalate-upwards-when-a-decision-has-broad-o",
        text: "You escalate upwards when a decision has broad organizational impact.",
        contributions: { decisionMaking: 0.6, impact: 0.4, influencing: -0.2, collaboration: -0.2 },
      },
      {
        id: "decisionmaking-own-style--you-navigate-politically-sensitive-decisions-car",
        text: "You navigate politically sensitive decisions carefully, involving the right stakeholders, even if this sometimes slows the final decision.",
        contributions: { collaboration: 0.6, influencing: 0.5 },
      },
    ],
  },

  // Pillar 6 – Collaboration, T-Shaped Thinking & Collegial Influence
  {
    id: "collaboration-pattern",
    pillarId: "collaboration",
    text: "Your collaboration pattern as an architect is mostly…",
    options: [
      {
        id: "collaboration-pattern--develop-designs-deeply-before-seeking-feedback-e",
        text: "Develop designs deeply before seeking feedback, ensuring proposals are well-formed.",
        contributions: { clarity: 0.7, longTerm: 0.4, collaboration: -0.3 },
      },
      {
        id: "collaboration-pattern--co-designing-with-other-architects-or-senior-eng",
        text: "Co-designing with other architects or senior engineers.",
        contributions: { collaboration: 0.9, influencing: 0.4 },
      },
      {
        id: "collaboration-pattern--involving-people-from-other-domains-e-g-security",
        text: "Involving people from other domains (e.g. security, data, infra) early.",
        contributions: { collaboration: 0.8, longTerm: 0.4, criticalThinking: 0.3 },
      },
      {
        id: "collaboration-pattern--go-deep-in-your-specialty-area-building-recogniz",
        text: "Go deep in your specialty area, building recognized expertise.",
        contributions: { learning: 0.7, clarity: 0.4, collaboration: -0.2 },
      },
      {
        id: "collaboration-pattern--acting-as-a-sounding-board-for-peers-on-topics-y",
        text: "Acting as a sounding board for peers on topics you know well.",
        contributions: { collaboration: 0.7, influencing: 0.5 },
      },
    ],
  },
  {
    id: "collaboration-last-few-months",
    pillarId: "collaboration",
    text: "Over the last few months…",
    options: [
      {
        id: "collaboration-last-few-months--you-have-reviewed-other-teams-or-architects-desi",
        text: "You have reviewed other teams' or architects' designs.",
        contributions: { collaboration: 0.8, criticalThinking: 0.4 },
      },
      {
        id: "collaboration-last-few-months--you-have-asked-others-to-review-your-own-designs",
        text: "You have asked others to review your own designs.",
        contributions: { collaboration: 0.7, learning: 0.5 },
      },
      {
        id: "collaboration-last-few-months--you-have-been-invited-into-discussions-outside-y",
        text: "You have been invited into discussions outside your formal scope.",
        contributions: { collaboration: 0.8, influencing: 0.5 },
      },
      {
        id: "collaboration-last-few-months--youve-protected-your-focus-by-being-selective-ab",
        text: "You've protected your focus by being selective about which discussions to join.",
        contributions: { impact: 0.5, resilience: 0.4, longTerm: 0.3, collaboration: -0.2 },
      },
      {
        id: "collaboration-last-few-months--you-have-initiated-at-least-one-cross-team-or-cr",
        text: "You have initiated at least one cross-team or cross-domain design discussion.",
        contributions: { collaboration: 0.8, influencing: 0.5, longTerm: 0.2 },
      },
      {
        id: "collaboration-last-few-months--youre-in-the-loop-on-many-initiatives-prioritizi",
        text: "You're in the loop on many initiatives, prioritizing broad involvement and organizational connectivity, even if it sometimes limits how deeply you can drive individual outcomes.",
        contributions: { collaboration: 0.6, influencing: 0.4 },
      },
    ],
  },

  // Pillar 7 – Continuous Learning & Growth
  {
    id: "learning-staying-current",
    pillarId: "learning",
    text: "In terms of learning and staying current…",
    options: [
      {
        id: "learning-staying-current--you-follow-external-sources-blogs-talks-papers-c",
        text: "You follow external sources (blogs, talks, papers, communities).",
        contributions: { learning: 0.8, criticalThinking: 0.4 },
      },
      {
        id: "learning-staying-current--you-prioritize-applied-learning-building-skills-",
        text: "You prioritize applied learning, building skills through real project challenges.",
        contributions: { learning: 0.6, impact: 0.5 },
      },
      {
        id: "learning-staying-current--you-maintain-some-form-of-learning-goals-or-a-pe",
        text: "You maintain some form of learning goals or a personal roadmap.",
        contributions: { learning: 0.8, longTerm: 0.4 },
      },
      {
        id: "learning-staying-current--you-align-learning-tightly-with-project-needs-ma",
        text: "You align learning tightly with project needs, maximizing immediate relevance.",
        contributions: { impact: 0.6, learning: 0.4 },
      },
      {
        id: "learning-staying-current--you-deliberately-compare-relex-practices-with-ou",
        text: "You deliberately compare internal practices with outside examples.",
        contributions: { learning: 0.7, criticalThinking: 0.5 },
      },
    ],
  },
  {
    id: "learning-last-12-18-months",
    pillarId: "learning",
    text: "In the last 12–18 months…",
    options: [
      {
        id: "learning-last-12-18-months--you-have-run-or-contributed-to-an-internal-tech-",
        text: "You have run or contributed to an internal tech talk, workshop, or brown bag.",
        contributions: { learning: 0.7, influencing: 0.4, collaboration: 0.4 },
      },
      {
        id: "learning-last-12-18-months--you-have-adopted-at-least-one-new-pattern-tool-o",
        text: "You have adopted at least one new pattern, tool, or approach in real work.",
        contributions: { learning: 0.9, resilience: 0.4 },
      },
      {
        id: "learning-last-12-18-months--you-have-stopped-using-some-pattern-technology-b",
        text: "You have stopped using some pattern/technology because it no longer fits.",
        contributions: { learning: 0.7, criticalThinking: 0.5, resilience: 0.3 },
      },
      {
        id: "learning-last-12-18-months--youve-relied-on-proven-familiar-approaches-that-",
        text: "You've favored familiar patterns and tools that have delivered results before.",
        contributions: { impact: 0.4, resilience: 0.3, longTerm: 0.3, learning: -0.2 },
      },
      {
        id: "learning-last-12-18-months--you-have-shared-learnings-in-written-form-page-p",
        text: "You have shared learnings in written form (page, post, or similar).",
        contributions: { learning: 0.7, clarity: 0.5, collaboration: 0.3 },
      },
    ],
  },

  // Pillar 8 – Resilience & Adaptability
  {
    id: "resilience-when-plans-change",
    pillarId: "resilience",
    text: "When priorities or plans change unexpectedly…",
    options: [
      {
        id: "resilience-when-plans-change--you-adapt-quickly-and-reframe-your-work-without-",
        text: "You adapt quickly and reframe your work without much friction.",
        contributions: { resilience: 1.0, collaboration: 0.3 },
      },
      {
        id: "resilience-when-plans-change--you-process-the-change-emotionally-before-adapti",
        text: "You process the change emotionally before adapting, working through the implications carefully even if your response is not the fastest.",
        contributions: { criticalThinking: 0.5, resilience: 0.4, collaboration: 0.2 },
      },
      {
        id: "resilience-when-plans-change--you-try-to-clarify-what-truly-changed-and-why",
        text: "You try to clarify what truly changed and why.",
        contributions: { resilience: 0.7, criticalThinking: 0.5 },
      },
      {
        id: "resilience-when-plans-change--you-advocate-for-preserving-the-original-directi",
        text: "You advocate for preserving the original direction when you believe the change is premature or poorly justified, even if others have already decided to move on.",
        contributions: { criticalThinking: 0.6, clarity: 0.3, influencing: 0.2, resilience: -0.2, impact: -0.1 },
      },
      {
        id: "resilience-when-plans-change--you-help-others-refocus-when-the-situation-shift",
        text: "You help others refocus when the situation shifts.",
        contributions: { resilience: 0.7, collaboration: 0.5, influencing: 0.3 },
      },
    ],
  },
  {
    id: "resilience-unfamiliar-domains",
    pillarId: "resilience",
    text: "When you are pushed into unfamiliar domains or topics…",
    options: [
      {
        id: "resilience-unfamiliar-domains--you-ramp-up-by-asking-many-questions-and-reading",
        text: "You ramp up by asking many questions and reading targeted material.",
        contributions: { learning: 0.6, resilience: 0.8 },
      },
      {
        id: "resilience-unfamiliar-domains--you-focus-on-leveraging-your-core-strengths-whil",
        text: "You focus on leveraging your core strengths while leaning on others for domain expertise.",
        contributions: { collaboration: 0.6, resilience: 0.4, learning: -0.2 },
      },
      {
        id: "resilience-unfamiliar-domains--you-treat-it-as-an-opportunity-to-extend-your-t-",
        text: "You treat it as an opportunity to extend your T-shape.",
        contributions: { learning: 0.6, resilience: 0.6, collaboration: 0.3 },
      },
      {
        id: "resilience-unfamiliar-domains--you-ensure-the-right-expertise-is-in-the-room-ev",
        text: "You ensure the right expertise is in the room, even if it means stepping back yourself.",
        contributions: { collaboration: 0.7, resilience: 0.3 },
      },
      {
        id: "resilience-unfamiliar-domains--you-can-point-to-at-least-one-recent-case-where-",
        text: "You can point to at least one recent case where you contributed meaningfully outside your comfort zone.",
        contributions: { resilience: 0.9, learning: 0.5 },
      },
    ],
  },

  // Pillar 9 – Critical Thinking & Constructive Challenge
  {
    id: "criticalthinking-group-sessions",
    pillarId: "criticalThinking",
    text: "In group design or review sessions…",
    options: [
      {
        id: "criticalthinking-group-sessions--you-prioritize-momentum-choosing-when-to-raise-c",
        text: "You prioritize momentum, choosing when to raise concerns to keep sessions productive, even if some risks get less airtime.",
        contributions: { collaboration: 0.4, impact: 0.4, decisionMaking: 0.3, criticalThinking: -0.2 },
      },
      {
        id: "criticalthinking-group-sessions--you-ask-clarifying-questions-before-stating-disa",
        text: "You ask clarifying questions before stating disagreement.",
        contributions: { criticalThinking: 0.8, collaboration: 0.5 },
      },
      {
        id: "criticalthinking-group-sessions--you-occasionally-play-devils-advocate-to-stress-",
        text: "You occasionally play devil's advocate to stress-test ideas.",
        contributions: { criticalThinking: 0.9, longTerm: 0.3 },
      },
      {
        id: "criticalthinking-group-sessions--you-weigh-the-value-of-team-alignment-against-ra",
        text: "You weigh the value of team alignment against raising every concern, choosing your battles carefully even if some doubts remain unspoken.",
        contributions: { collaboration: 0.5, influencing: 0.3, clarity: 0.3, criticalThinking: -0.2 },
      },
      {
        id: "criticalthinking-group-sessions--you-explicitly-call-out-assumptions-you-believe-",
        text: "You explicitly call out assumptions you believe are risky.",
        contributions: { criticalThinking: 0.8, influencing: 0.4, longTerm: 0.3 },
      },
    ],
  },
  {
    id: "criticalthinking-recent-decisions",
    pillarId: "criticalThinking",
    text: "Looking at recent architectural decisions…",
    options: [
      {
        id: "criticalthinking-recent-decisions--you-can-recall-at-least-one-case-where-your-chal",
        text: "You can recall at least one case where your challenge changed the outcome.",
        contributions: { criticalThinking: 1.0, influencing: 0.5 },
      },
      {
        id: "criticalthinking-recent-decisions--you-reflect-on-past-decisions-to-learn-when-your",
        text: "You reflect on past decisions to learn when your input could have been more impactful.",
        contributions: { learning: 0.6, criticalThinking: 0.5 },
      },
      {
        id: "criticalthinking-recent-decisions--you-raise-risks-even-when-they-may-be-unpopular",
        text: "You raise risks even when they may be unpopular.",
        contributions: { criticalThinking: 0.9, resilience: 0.4 },
      },
      {
        id: "criticalthinking-recent-decisions--you-choose-appropriate-venues-for-raising-concer",
        text: "You choose appropriate venues for raising concerns, often preferring 1:1 or small group settings for sensitive topics.",
        contributions: { collaboration: 0.5, influencing: 0.5, criticalThinking: 0.3 },
      },
      {
        id: "criticalthinking-recent-decisions--you-regularly-ask-what-would-need-to-be-true-for",
        text: "You actively look for what could go wrong with a proposed approach.",
        contributions: { criticalThinking: 0.9, longTerm: 0.4 },
      },
    ],
  },
];

export type Level = "low" | "medium" | "high";

export interface Archetype {
  id: string;
  name: string;
  shortLabel: string;
  description: string;
  strengths: string[];
  risks: string[];
  match: (levels: Record<PillarId, Level>) => boolean;
}

export const archetypes: Archetype[] = [
  {
    id: "vision-led",
    name: "Vision-Led Influencer",
    shortLabel: "Visionary",
    description:
      "Shapes direction, creates clarity, and gets decisions over the line. Often drives alignment and narrative, translating architectural intent into team behavior.",
    strengths: [
      "Strong at creating alignment and driving decisions",
      "Translates architectural intent into team behavior",
      "Creates clarity from ambiguity",
    ],
    risks: [
      "May underinvest in deep long-term or cross-domain technical depth",
      "Risk of becoming the bottleneck for decisions or communication",
    ],
    match: (levels) =>
      levels.influencing === "high" &&
      levels.clarity === "high" &&
      levels.decisionMaking === "high" &&
      (levels.impact === "high" || levels.impact === "medium"),
  },
  {
    id: "deep-strategist",
    name: "Deep Systems Strategist",
    shortLabel: "Strategist",
    description:
      "Sees multi-year structure, systemic risks, and scalability constraints. Strong at spotting failure modes and long-range consequences.",
    strengths: [
      "Excellent at long-term planning and risk identification",
      "Understands systemic implications of decisions",
      "Strong analytical foundation",
    ],
    risks: [
      "May struggle to make ideas land with teams or move decisions to closure",
      "Can be perceived as a critic rather than a decision driver",
    ],
    match: (levels) =>
      levels.longTerm === "high" &&
      levels.criticalThinking === "high" &&
      (levels.impact === "high" || levels.impact === "medium"),
  },
  {
    id: "t-shaped",
    name: "T-Shaped Integrator",
    shortLabel: "Integrator",
    description:
      "Connects domains, teams, and perspectives; operates as a bridge and integrator. Adapts well to change and learns quickly.",
    strengths: [
      "Acts as glue in complex initiatives",
      "Connects different domains and perspectives",
      "Highly adaptable and quick to learn",
    ],
    risks: [
      "May not always claim ownership of large decisions",
      "Risk of spreading too thin or being used only as a facilitator",
    ],
    match: (levels) => levels.collaboration === "high" && levels.learning === "high" && levels.resilience === "high",
  },
  {
    id: "delivery-pragmatist",
    name: "Delivery Pragmatist",
    shortLabel: "Pragmatist",
    description:
      "Moves things forward under pressure; decisions don't stay stuck. Strong bias for action and delivery, especially in uncertain contexts.",
    strengths: [
      "Excellent at unblocking teams and driving progress",
      "Strong bias for action",
      "Thrives in uncertain or messy contexts",
    ],
    risks: ["May underinvest in deeper architectural rigor", "Might accumulate hidden architectural debt"],
    match: (levels) =>
      levels.decisionMaking === "high" &&
      levels.resilience === "high" &&
      (levels.longTerm === "low" || levels.criticalThinking === "low"),
  },
  {
    id: "careful-analyst",
    name: "Careful Analyst",
    shortLabel: "Analyst",
    description:
      "Very strong on reasoning, analysis, and understanding. Provides solid critiques, sees edge cases, and articulates complex trade-offs.",
    strengths: [
      "Excellent analytical and reasoning skills",
      "Strong documentation and communication",
      "Sees edge cases others miss",
    ],
    risks: ["May hesitate to claim decision ownership", "Risk of analysis paralysis in ambiguous situations"],
    match: (levels) =>
      levels.criticalThinking === "high" &&
      levels.learning === "high" &&
      levels.clarity === "high" &&
      (levels.decisionMaking === "low" || levels.influencing === "low"),
  },
  {
    id: "quiet-backbone",
    name: "Quiet Backbone",
    shortLabel: "Backbone",
    description:
      "Keeps the architecture sane over time, often quietly. Maintains quality, consistency, and long-term thinking.",
    strengths: [
      "Maintains architectural quality and consistency",
      "Strong long-term thinking",
      "Supports others' work effectively",
    ],
    risks: [
      "Under-recognized because not always at the front of the room",
      "Architecture can depend on them implicitly without explicit mandate",
    ],
    match: (levels) =>
      levels.clarity === "high" &&
      levels.collaboration === "high" &&
      levels.longTerm === "high" &&
      (levels.influencing === "medium" || levels.influencing === "low"),
  },
  {
    id: "emerging-balanced",
    name: "Emerging / Balanced Architect",
    shortLabel: "Balanced",
    description:
      "Broad, balanced base across pillars with low risk of blind spots. Good starting point for growth toward any other archetype.",
    strengths: ["Well-rounded skill set", "Low risk of blind spots", "Flexible growth potential"],
    risks: ['May not have a clearly articulated "edge" or signature strength yet'],
    match: (levels) => {
      const values = Object.values(levels);
      const highCount = values.filter((v) => v === "high").length;
      const lowCount = values.filter((v) => v === "low").length;
      return highCount <= 3 && lowCount <= 3;
    },
  },
];
