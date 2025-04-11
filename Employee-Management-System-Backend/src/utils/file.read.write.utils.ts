import fs from "fs/promises";
import path from "path";
import { Employee } from "../types/employee.interface";

const dataPath = path.join(__dirname, "..", "data", "employees.json");

export async function readEmployees(): Promise<Employee[]> {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    if (!data.trim()) {
      return [];
    }
    const employees: Employee[] = JSON.parse(data);
    return employees.map((employee) => ({
      ...employee,
      createdAt: new Date(employee.createdAt),
      updatedAt: new Date(employee.updatedAt),
    }));
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    console.error("Error reading data file:", error);
    throw new Error("Could not read data file.");
  }
}

export async function writeEmployees(employees: Employee[]): Promise<void> {
  try {
    await fs.writeFile(dataPath, JSON.stringify(employees, null, 2));
  } catch (error) {
    console.error("Error writing data file:", error);
    throw new Error("Could not write data file.");
  }
}
