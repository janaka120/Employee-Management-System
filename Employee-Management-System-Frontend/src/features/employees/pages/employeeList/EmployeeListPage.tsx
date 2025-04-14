import { useEffect } from "react";
import { Alert, message, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../store/store-hooks";
import { selectEmployeeList, setEmployeeList } from "../../EmployeeSlice";
import EmployeesTable from "./components/EmployeesTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee, getAllEmployees } from "../../services/EmployeesApi";
import LoadingIndicator from "../../../../components/LoadingIndicator";

const { Title } = Typography;

const EmployeeListPage = () => {
  const employeeList = useAppSelector(selectEmployeeList);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const {
    data: fetchedEmployees,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });

  useEffect(() => {
    if (fetchedEmployees) {
      dispatch(setEmployeeList(fetchedEmployees));
    }
  }, [dispatch, fetchedEmployees]);

  const { mutate } = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      message.success("Employee deleted successfully!");
    },
    onError: (err: Error) => {
      message.error(
        `Failed to delete employee: ${err.message || "Something went wrong."}`
      );
    },
  });

  if (isLoading) {
    return <LoadingIndicator text="Loading employees..." />;
  }

  if (isError) {
    return (
      <Alert
        message="Error loading employees"
        description={
          error instanceof Error ? error.message : "An unknown error occurred"
        }
        type="error"
        showIcon
      />
    );
  }
  return (
    <>
      <Title level={2}>Employees Summary</Title>
      <EmployeesTable list={employeeList} deleteHandler={mutate} />
    </>
  );
};

export default EmployeeListPage;
