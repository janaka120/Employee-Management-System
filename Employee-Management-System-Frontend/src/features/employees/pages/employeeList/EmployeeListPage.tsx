import { useEffect } from "react";
import { Alert } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../store/store-hooks";
import { selectEmployeeList, setEmployeeList } from "../../employeeSlice";
import EmployeesTable from "./components/EmployeesTable";
import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../../services/employeesApi";

function EmployeeListPage() {
  const employeeList = useAppSelector(selectEmployeeList);
  const dispatch = useAppDispatch();

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
        <EmployeesTable list={employeeList} />
      </div>
    </div>
  );
}

export default EmployeeListPage;
