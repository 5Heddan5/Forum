// views/AddThreadView.js
import { useNavigate } from "react-router-dom";
import { addThread } from "../API";
import ThreadForm from "../Components/ThreadForm";

export default function AddThreadView() {
  const navigate = useNavigate();

  const handleSubmit = async (newThread) => {
    try {
      await addThread(newThread);
      navigate("/"); // Gå tillbaka till startsidan efter att ha lagt till tråden
    } catch (error) {
      console.error("Error adding thread:", error);
    }
  };

  return (
    <div>
      <ThreadForm onSubmit={handleSubmit} onCancel={() => navigate("/")} />
    </div>
  );
}
