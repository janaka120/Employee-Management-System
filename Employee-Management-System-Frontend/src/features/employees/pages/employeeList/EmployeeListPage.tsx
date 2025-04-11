import { useAppDispatch, useAppSelector } from "../../../../store/store-hooks";
import { selectEmployeeList, setEmployeeList } from "../../employeeSlice";
import EmployeesTable from "./components/EmployeesTable";

function EmployeeListPage() {
  const employeeList = useAppSelector(selectEmployeeList);
  const dispatch = useAppDispatch();
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
