// Filtrera trådar baserat på användarens sökinput
export const filterThreads = (threads, searchInput) => {
  return threads.filter((thread) => {
    return (
      thread.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      thread.content.toLowerCase().includes(searchInput.toLowerCase())
    );
  });
};
