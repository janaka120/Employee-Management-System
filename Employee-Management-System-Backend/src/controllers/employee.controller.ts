import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { Employee } from "../types/employee.interface";
import { readEmployees, writeEmployees } from "../utils/file.read.write.utils";
import {
  isValidDate,
  isValidEmail,
  isValidPastDate,
  isValidPhoneNumber,
} from "../utils/validation.utils";

// GET /api/employees
export const getAllEmployees = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await readEmployees();
    res.status(200).json({ data: employees, status: "success" });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error fetching employees",
      error: error.message,
    });
  }
};

// GET /api/employees/:id
export const getEmployeeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await readEmployees();
    const employee = employees.find((i) => i.uuid === req.params.id);
    if (employee) {
      res.status(200).json({ data: employee, status: "success" });
    } else {
      res.status(404).json({ message: "Employee not found", status: "fail" });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error fetching employee",
      error: error.message,
    });
  }
};

// POST /api/employees - Create a new item
export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { firstName, lastName, email, phone, gender, dob, joinedDate } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !gender ||
      !isValidPastDate(dob) ||
      !isValidDate(joinedDate) ||
      !isValidEmail(email) ||
      !isValidPhoneNumber(phone)
    ) {
      res
        .status(400)
        .json({ status: "fail", message: "Employee details is required" });
      return;
    }

    const employees = await readEmployees();
    const newEmployee: Employee = {
      uuid: uuidv4(),
      firstName,
      lastName,
      email,
      phone,
      gender,
      dob: dob,
      joinedDate: joinedDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    employees.push(newEmployee);
    await writeEmployees(employees);

    res.status(201).json({ data: newEmployee, status: "success" });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error creating item",
      error: error.message,
    });
  }
};

// PUT /api/employees/:id
export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { firstName, lastName, email, phone, gender, dob, joinedDate } =
      req.body;
    const employeeId = req.params.id;
    const employees = await readEmployees();
    const employeeIndex = employees.findIndex((i) => i.uuid === employeeId);

    if (employeeIndex === -1) {
      res.status(404).json({ status: "fail", message: "Employee not found" });
      return;
    }
    const updatedEmployee = {
      ...employees[employeeIndex],
      firstName:
        firstName !== undefined
          ? firstName
          : employees[employeeIndex].firstName,
      lastName:
        lastName !== undefined ? lastName : employees[employeeIndex].lastName,
      gender: gender !== undefined ? gender : employees[employeeIndex].gender,
      email: email !== undefined ? email : employees[employeeIndex].email,
      phone: phone !== undefined ? phone : employees[employeeIndex].phone,
      dob: dob !== undefined ? dob : employees[employeeIndex].dob,
      joinedDate:
        joinedDate !== undefined
          ? joinedDate
          : employees[employeeIndex].joinedDate,
      updatedAt: new Date(),
    };

    employees[employeeIndex] = updatedEmployee;
    await writeEmployees(employees);

    res.status(200).json({ status: "success", data: updatedEmployee });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error updating item",
      error: error.message,
    });
  }
};

// DELETE /api/employees/:id - Delete an employee
export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employeeId = req.params.id;
    const employees = await readEmployees();
    const initialLength = employees.length;
    const filteredEmployees = employees.filter((i) => i.uuid !== employeeId);

    if (filteredEmployees.length === initialLength) {
      res.status(404).json({ status: "fail", message: "Employee not found" });
      return;
    }

    await writeEmployees(filteredEmployees);
    res.status(200).json({ data: employeeId, status: "success" });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error deleting employee",
      error: error.message,
    });
  }
};
