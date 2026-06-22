export type Message = {
  sender: "user" | "bot";
  text: string;
};

export type IntentState = {
  intent:
    | ""
    | "tracking"
    | "tracking-delivered-followup"
    | "recommend-people"
    | "recommend-weather";
  data?: { peopleCount?: number };
};

export type BotResult = {
  message: string;
  nextIntent: IntentState;
};
