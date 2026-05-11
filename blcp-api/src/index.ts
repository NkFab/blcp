import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./database";
import "./events"; // Ensure events are registered

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.log("Error during database connection initialization:", error);
  }
  const PORT = process.env.PORT || 3001;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
})();
