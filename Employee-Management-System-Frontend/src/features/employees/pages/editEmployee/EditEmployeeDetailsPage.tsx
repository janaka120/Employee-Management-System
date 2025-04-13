import { SubmitHandler } from "react-hook-form";
import { message } from "antd";
import {
  EmployeeFromDataI,
  EmployeeFormDataI,
  GenderType,
} from "../../employeeTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployee } from "../../services/employeesApi";
import EmployeeForm from "../../components/EmployeeForm";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../../store/store-hooks";
import { selectEmployeeList } from "../../employeeSlice";

const EditEmployeeDetailsPage = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const employeeList = useAppSelector(selectEmployeeList);
  const selectedEmployee = employeeList.find((e) => e.uuid === employeeId);

  const { mutate, isSuccess } = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      message.success("Form data updated successfully!");
      navigate(-1);
    },
    onError: (err: Error) => {
      message.error(
        `Failed to update data: ${err.message || "Something went wrong."}`
      );
    },
  });

  const onSubmit: SubmitHandler<EmployeeFormDataI> = async (data) => {
    const employeeData: EmployeeFromDataI = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      gender: data.gender as GenderType,
      dob: data.dob,
      joinedDate: data.joinedDate,
    };
    if (employeeId) {
      mutate({ id: employeeId, data: employeeData });
    }
  };

  return (
    <EmployeeForm
      onSubmit={onSubmit}
      isSuccess={isSuccess}
      data={selectedEmployee}
    />
  );
};

export default EditEmployeeDetailsPage;
