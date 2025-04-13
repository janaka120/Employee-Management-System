import { SubmitHandler } from "react-hook-form";
import { message } from "antd";
import {
  EmployeeFromDataI,
  EmployeeFormDataI,
  GenderType,
  EmployeeI,
} from "../../employeeTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  employeeDetailsQueryKey,
  getEmployeeDetails,
  updateEmployee,
} from "../../services/employeesApi";
import EmployeeForm from "../../components/EmployeeForm";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployeeDetailsPage = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const queryKey = employeeDetailsQueryKey(employeeId);
  const queryClient = useQueryClient();

  const {
    data: selectedEmployee,
    isLoading,
    isError,
    error,
  } = useQuery<
    EmployeeI,
    Error,
    EmployeeI,
    ReturnType<typeof employeeDetailsQueryKey>
  >({
    queryKey,
    queryFn: getEmployeeDetails,
    enabled: !!employeeId,
    retry: 3,
  });

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

  if (isLoading) {
    return <div>Loading employee details...</div>;
  }

  if (isError) {
    return <div>Error loading employee details: {error?.message}</div>;
  }

  return (
    <EmployeeForm
      onSubmit={onSubmit}
      isSuccess={isSuccess}
      data={selectedEmployee}
    />
  );
};

export default EditEmployeeDetailsPage;
