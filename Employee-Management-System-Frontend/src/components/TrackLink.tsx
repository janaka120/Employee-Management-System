import { MouseEventHandler, ReactNode } from "react";
import { Link, useNavigate, To, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (location.pathname === to) {
      return;
    }
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
