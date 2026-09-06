const API_URL = "http://localhost:8000";

export const askFarmingBot = async (question) => {
  const response = await fetch(`${API_URL}/ai/chatbot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get farming assistant response");
  }

  return response.json();
};


export const askCustomerBot = async (question) => {
  const response = await fetch(`${API_URL}/ai/faq`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get customer support response");
  }

  return response.json();
};