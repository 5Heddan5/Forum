// API/AddThread.js
const API_URL = "http://localhost:3000/threads";

// Funktion för att hämta alla trådar
export const getThreads = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// Funktion för att lägga till tråd (samma som tidigare)
export const addThread = async (threadData) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(threadData),
    });

    if (!response.ok) {
      throw new Error("Failed to add thread");
    }

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
