import {
  selectIsShowFormChangeAlert,
  selectSelectedRoute,
  setIsEmployeeFormDirty,
  setIsShowFormChangeAlert,
} from "../EmployeeSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

const ChangeWarningDialog = () => {
  const dispatch = useAppDispatch();
  const showAlert = useAppSelector(selectIsShowFormChangeAlert);
  const navigate = useNavigate();
  const selectedRoute = useAppSelector(selectSelectedRoute);

  return (
    <Modal
      title="Form has been modified"
      open={showAlert || false}
      onOk={() => {
        dispatch(setIsShowFormChangeAlert(false));
        dispatch(setIsEmployeeFormDirty(false));
        if (selectedRoute) navigate(selectedRoute);
      }}
      onCancel={() => {
        dispatch(setIsShowFormChangeAlert(false));
      }}
    >
      <p>
        You will lose your unsaved changes. Are you sure you want to close this
        form?
      </p>
    </Modal>
  );
};

export default ChangeWarningDialog;
