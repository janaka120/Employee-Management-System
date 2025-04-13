import { useEffect } from "react";
import { Alert, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../store/store-hooks";
import { selectEmployeeList, setEmployeeList } from "../../employeeSlice";
import EmployeesTable from "./components/EmployeesTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee, getAllEmployees } from "../../services/employeesApi";

function EmployeeListPage() {
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
    return <div>Loading employees...</div>;
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
    <div>
      <h1>Employee List Page</h1>
      <div>
        <EmployeesTable list={employeeList} deleteHandler={mutate} />
      </div>
    </div>
  );
}

export default EmployeeListPage;
