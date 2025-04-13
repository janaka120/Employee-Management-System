import { SubmitHandler } from "react-hook-form";
import { message } from "antd";
import {
  AddEmployeeDataI,
  EmployeeFormDataI,
  GenderType,
} from "../../employeeTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEmployee } from "../../services/employeesApi";
import EmployeeForm from "../../components/EmployeeForm";

const AddEmployeeDetailsPage = () => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess } = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      message.success("Form data saved successfully!");
    },
    onError: (err: Error) => {
      message.error(
        `Failed to save data: ${err.message || "Something went wrong."}`
      );
    },
  });

  const onSubmit: SubmitHandler<EmployeeFormDataI> = async (data) => {
    console.log("Form Submitted Data:", data);
    const employeeData: AddEmployeeDataI = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      gender: data.gender as GenderType,
      dob: data.dob,
      joinedDate: data.joinedDate,
    };
    mutate(employeeData);
  };
  return <EmployeeForm onSubmit={onSubmit} isSuccess={isSuccess} />;
};

export default AddEmployeeDetailsPage;
