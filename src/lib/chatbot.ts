import { orders, shippingInfo } from "@/data/orders";
import type { BotResult, IntentState } from "@/types/chat";

export const IDLE: IntentState = { intent: "" };

const RETURN_POLICY =
  "We offer 30-day returns. The item must be unused and in its original packaging. More info: https://northstar.com/returns";

function extractPeopleCount(text: string): number | null {
  if (text.includes("solo")) return 1;
  const digitMatch = text.match(/\d+/);
  if (digitMatch) return parseInt(digitMatch[0], 10);
  if (text.includes("family") || text.includes("group")) return 4;
  return null;
}

function tryPivot(text: string, currentState: IntentState): BotResult | null {
  if (currentState.intent === "tracking") {
    const digits = text.replace(/\D/g, "");
    if (digits.length >= 3) return null;
  }

  if (currentState.intent === "recommend-people") {
    if (extractPeopleCount(text) !== null) return null;
  }

  if (currentState.intent === "tracking-delivered-followup") {
    if (
      text.includes("return") ||
      text.includes("exchange") ||
      text.includes("no") ||
      text.includes("yes") ||
      text.includes("good") ||
      text.includes("fine") ||
      text.includes("great")
    ) {
      return null;
    }
  }

  if (currentState.intent === "recommend-weather") {
    if (
      text.includes("cold") ||
      text.includes("rain") ||
      text.includes("wet") ||
      text.includes("warm") ||
      text.includes("hot") ||
      text.includes("snow")
    ) {
      return null;
    }
  }

  const newIntentResult = handleNewIntent(text);
  if (newIntentResult.message.startsWith("Sorry, I didn't understand")) {
    return null;
  }

  return {
    message: `No problem — sounds like you'd like to switch topics. ${newIntentResult.message}`,
    nextIntent: newIntentResult.nextIntent,
  };
}

function handleActiveFlow(text: string, currentState: IntentState): BotResult {
  switch (currentState.intent) {
    case "tracking": {
      const orderNumber = text.replace(/\D/g, "");
      const order = orders[orderNumber];
      if (!order) {
        return {
          message:
            "Invalid order number. Please double check and try again.",
          nextIntent: IDLE,
        };
      }
      if (order.delivered) {
        return {
          message: `${order.status} Is everything okay with your delivery, or do you need help with a return?`,
          nextIntent: { intent: "tracking-delivered-followup" },
        };
      }
      return { message: order.status, nextIntent: IDLE };
    }

    case "tracking-delivered-followup": {
      if (
        text.includes("return") ||
        text.includes("exchange") ||
        text.includes("no")
      ) {
        return { message: RETURN_POLICY, nextIntent: IDLE };
      }
      return {
        message: "Great to hear! Let me know if you need anything else.",
        nextIntent: IDLE,
      };
    }

    case "recommend-people": {
      const peopleCount = extractPeopleCount(text);
      if (peopleCount === null) {
        return {
          message:
            "Sorry, how many people will be going? (e.g. 1, 2, or a family group)",
          nextIntent: currentState,
        };
      }
      return {
        message: "What weather conditions are you expecting?",
        nextIntent: { intent: "recommend-weather", data: { peopleCount } },
      };
    }

    case "recommend-weather": {
      const peopleCount = currentState.data?.peopleCount ?? 1;
      let recommendation: string;

      if (text.includes("cold")) {
        recommendation = "Sleeping Bag";
      } else if (text.includes("rain") || text.includes("wet")) {
        recommendation = "Waterproof Gear";
      } else if (peopleCount >= 3) {
        recommendation = "Family Tent";
      } else if (peopleCount === 1) {
        recommendation = "Backpack";
      } else {
        recommendation = "Tent";
      }

      return {
        message: `Based on that, I'd recommend checking out our ${recommendation} category.`,
        nextIntent: IDLE,
      };
    }

    default:
      return handleNewIntent(text);
  }
}

function handleNewIntent(text: string): BotResult {
  if (
    text.includes("how long") ||
    text.includes("shipping time") ||
    text.includes("shipping speed") ||
    text.includes("how fast") ||
    (text.includes("shipping") && text.includes("expedited")) ||
    (text.includes("shipping") && text.includes("standard"))
  ) {
    return {
      message: `${shippingInfo.standard} ${shippingInfo.expedited}`,
      nextIntent: IDLE,
    };
  }

  if (
    text.includes("where is my order") ||
    text.includes("track") ||
    text.includes("shipment") ||
    text.includes("order status") ||
    text.includes("delivery status") ||
    text.includes("check my")
  ) {
    return {
      message: "Please enter your order number.",
      nextIntent: { intent: "tracking" },
    };
  }

  if (text.includes("return") || text.includes("exchange")) {
    return { message: RETURN_POLICY, nextIntent: IDLE };
  }

  if (
    text.includes("recommend") ||
    text.includes("gear") ||
    text.includes("camping") ||
    text.includes("hiking")
  ) {
    return {
      message: "How many people will be going?",
      nextIntent: { intent: "recommend-people" },
    };
  }

  return {
    message:
      "Sorry, I didn't understand that. I can help with order tracking, returns, product recommendations, or connect you with a live agent.",
    nextIntent: IDLE,
  };
}

export function getBotResponse(
  input: string,
  currentState: IntentState
): BotResult {
  const text = input.toLowerCase().trim();

  if (
    text.includes("human") ||
    text.includes("agent") ||
    text.includes("talk to someone") ||
    text.includes("customer service")
  ) {
    return {
      message: "Connecting you to a live agent...",
      nextIntent: IDLE,
    };
  }

  if (currentState.intent !== "") {
    const pivot = tryPivot(text, currentState);
    if (pivot) return pivot;
    return handleActiveFlow(text, currentState);
  }

  return handleNewIntent(text);
}
