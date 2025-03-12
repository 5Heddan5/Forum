const API_URL = "http://localhost:3000/threads"; // Local API URL

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
export const getAllThreads = async () => {
  const response = await fetch(API_URL);
  return response.json();
};


export const getThreadById = async (id) => {
  const response = await fetch(`http://localhost:3000/threads/${id}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch thread with id: ${id}, Status: ${response.status}`
    );
  }

  return response.json();
};

export const updateThread = async (id, updatedThread) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedThread),
  });

  if (!response.ok) {
    throw new Error("Failed to update thread");
  }

  return response.json();
};

export const getComments = async (threadId) => {
  const response = await fetch(`${API_URL}/${threadId}/comments`);
  if (!response.ok) throw new Error("Failed to fetch comments");
  return response.json()
};

export const addComment = async (threadId, comment) => {
  const response = await fetch(`${API_URL}/${threadId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (!response.ok) throw new Error("Failed to add comment");
  return response.json();
};