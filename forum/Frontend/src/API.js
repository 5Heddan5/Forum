const API_URL = "http://localhost:3000/threads"; // Local API URL

export const getAllThreads = async () => {
  const response = await fetch(API_URL);
  return response.json();
};
export const addThread = async (newThread) => {
  const response = await fetch("http://localhost:3000/threads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newThread),
  });

  if (!response.ok) {
    throw new Error("Failed to add thread");
  }

  return await response.json();
};


export const deleteThread = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

export const getThreadById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const updateThread = async (id, updatedThread) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedThread),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
};
