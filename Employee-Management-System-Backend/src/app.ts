// src/app.ts
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import employeeRoutes from "./routes/employee.routes";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Node server running!");
});

app.use("/api/employees", employeeRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Resource not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
