import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { addThread } from "../API";


export default function AddThreadView() {
  const [thread, setThread] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setThread(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!thread.trim()) return; // Prevent empty thread submission

    try {
      // Lägg till tråden via API-anropet
      await addThread({ title: thread });

      navigate("/"); // Om lyckad, navigera till hemsidan
    } catch (error) {
      console.error("Error adding thread:", error);
    }
  };

  return (
    <div>
      <div className="thread-container">
        <h1>Add Thread</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={thread}
            onChange={handleChange}
            placeholder="Enter title..."
            required
          />
          <div className="button-group">
            <button type="submit">Add Thread</button>
            <button type="button" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
