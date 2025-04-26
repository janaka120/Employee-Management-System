import { MouseEventHandler, ReactNode } from "react";
import { Link, useNavigate, To } from "react-router-dom";
import {
  selectIsEmployeeFormDirty,
  setIsShowFormChangeAlert,
  setSelectedRoute,
} from "../features/employees/EmployeeSlice";
import { useAppSelector } from "../store/store-hooks";
import { useDispatch } from "react-redux";

interface TrackLinkI extends React.PropsWithChildren {
  to: To;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children?: ReactNode;
  [key: string]: any;
}

const TrackLink = ({ to, onClick, children, ...rest }: TrackLinkI) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFormDirty = useAppSelector(selectIsEmployeeFormDirty);

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (isFormDirty) {
      dispatch(setIsShowFormChangeAlert(true));
      dispatch(setSelectedRoute(to));
      event.preventDefault();
      return;
    }
    if (onClick) {
      onClick(event);
    }
    navigate(to);
  };

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
};

export default TrackLink;
