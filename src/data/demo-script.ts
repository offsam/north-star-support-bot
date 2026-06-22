export type DemoStep = {
  text: string;
  pauseBeforeMs?: number;
  typingSpeedMs?: number;
  pauseAfterMs?: number;
};

export const DEMO_SCRIPT: DemoStep[] = [
  {
    text: "where is my order?",
    pauseBeforeMs: 2200,
    typingSpeedMs: 55,
    pauseAfterMs: 1500,
  },
  {
    text: "111",
    pauseBeforeMs: 2000,
    typingSpeedMs: 110,
    pauseAfterMs: 1800,
  },
  {
    text: "How long does shipping usually take?",
    pauseBeforeMs: 2800,
    typingSpeedMs: 48,
    pauseAfterMs: 1600,
  },
  {
    text: "Can you recommend some camping gear?",
    pauseBeforeMs: 2600,
    typingSpeedMs: 48,
    pauseAfterMs: 1400,
  },
  {
    text: "actually wait — what about expedited shipping?",
    pauseBeforeMs: 3000,
    typingSpeedMs: 45,
    pauseAfterMs: 1800,
  },
  {
    text: "Let's try the gear recommendation again",
    pauseBeforeMs: 2600,
    typingSpeedMs: 42,
    pauseAfterMs: 1400,
  },
  {
    text: "family",
    pauseBeforeMs: 2000,
    typingSpeedMs: 90,
    pauseAfterMs: 1400,
  },
  {
    text: "rainy and wet",
    pauseBeforeMs: 2200,
    typingSpeedMs: 60,
    pauseAfterMs: 1800,
  },
  {
    text: "I want to return something",
    pauseBeforeMs: 2800,
    typingSpeedMs: 50,
    pauseAfterMs: 1600,
  },
  {
    text: "check my delivery status",
    pauseBeforeMs: 2600,
    typingSpeedMs: 48,
    pauseAfterMs: 1400,
  },
  {
    text: "333",
    pauseBeforeMs: 2000,
    typingSpeedMs: 110,
    pauseAfterMs: 1600,
  },
  {
    text: "no, I need to exchange it",
    pauseBeforeMs: 2400,
    typingSpeedMs: 52,
    pauseAfterMs: 1800,
  },
  {
    text: "Any hiking gear for a solo trip?",
    pauseBeforeMs: 2800,
    typingSpeedMs: 46,
    pauseAfterMs: 1400,
  },
  {
    text: "solo",
    pauseBeforeMs: 1800,
    typingSpeedMs: 85,
    pauseAfterMs: 1200,
  },
  {
    text: "talk to a human",
    pauseBeforeMs: 2200,
    typingSpeedMs: 58,
    pauseAfterMs: 1600,
  },
  {
    text: "What's your favorite movie?",
    pauseBeforeMs: 2600,
    typingSpeedMs: 48,
    pauseAfterMs: 1200,
  },
];
