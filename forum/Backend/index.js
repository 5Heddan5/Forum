import express from "express";
import cors from "cors";
import threadRoutes from "./routes/threadRoutes.js"; // Importera trådrutter

const app = express();

app.use(express.json()); 
app.use(cors()); 

app.use("/threads", threadRoutes); // Använd trådrutter

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
