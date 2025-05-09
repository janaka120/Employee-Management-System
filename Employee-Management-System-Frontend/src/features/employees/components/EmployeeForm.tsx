import { useEffect } from "react";
import { useForm, Controller, SubmitHandler, useWatch } from "react-hook-form";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Typography,
  message,
  Row,
  Col,
  Radio,
  Flex,
} from "antd";
import dayjs from "dayjs";

import { EmployeeFormDataI, EmployeeI } from "../EmployeeTypes";
import {
  DEFAULT_EMPLOYEE_FORM,
  GENDER_MENU,
  VALID_EMAIL_REGEX,
} from "../../../constants/EmployeeConstant";
import {
  formatDate,
  isJoinedDateAfterDOB,
  validateDate,
  validName,
  validPhoneNumber,
} from "../../../utils/helpers";
import usePageChangeListerHook from "../hooks/usePageChangeListerHook";
import { setIsEmployeeFormDirty } from "../EmployeeSlice";
import { useAppDispatch } from "../../../store/store-hooks";
import ChangeWarningDialog from "./ChangeWarningDialog";
import "./styles/EmployeeForm.css";

const { Title } = Typography;

interface EmployeeFormI {
  onSubmit: SubmitHandler<EmployeeFormDataI>;
  isSuccess: boolean;
  data?: EmployeeI;
  onCancel: () => void;
}

const GENDER_RADIO_OPTIONS = GENDER_MENU.map((gender) => {
  return { value: gender, label: gender };
});

const EmployeeForm = ({
  onSubmit,
  isSuccess,
  data,
  onCancel,
}: EmployeeFormI) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EmployeeFormDataI>({
    defaultValues: data || DEFAULT_EMPLOYEE_FORM,
    mode: "onBlur",
  });

  const dispatch = useAppDispatch();
  usePageChangeListerHook(isDirty);

  useEffect(() => {
    if (data?.uuid) {
      reset(data);
    }
  }, [data, reset]);

  const onError = (formErrors: typeof errors) => {
    console.error("Form validation errors:", formErrors);
    message.error("Please correct the errors in the form.");
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  useEffect(() => {
    dispatch(setIsEmployeeFormDirty(isDirty));
  }, [isDirty, dispatch]);

  const dateOfBirth = useWatch({ control, name: "dob" });

  return (
    <div className="formContainer">
      <Title level={2}>
        {data?.uuid ? "Update Employee" : "Add New Employee"}
      </Title>
      <Form
        layout="vertical"
        labelCol={{ span: 8 }}
        onFinish={handleSubmit(onSubmit, onError)}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="First Name"
              help={errors.firstName?.message}
              validateStatus={errors.firstName ? "error" : ""}
            >
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: "First name is required",
                  validate: validName,
                }}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter first name" />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Last Name"
              help={errors.lastName?.message}
              validateStatus={errors.lastName ? "error" : ""}
            >
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: "Last name is required",
                  validate: validName,
                }}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter last name" />
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Email Address"
          help={errors.email?.message}
          validateStatus={errors.email ? "error" : ""}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: VALID_EMAIL_REGEX,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter email address"
                type="email"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          help={errors.phone?.message}
          validateStatus={errors.phone ? "error" : ""}
        >
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone number is required",
              validate: validPhoneNumber,
            }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter phone number" />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Gender"
          help={errors.gender?.message}
          validateStatus={errors.gender ? "error" : ""}
        >
          <Controller
            name="gender"
            control={control}
            rules={{
              required: "Please select a gender",
            }}
            render={({ field }) => (
              <Radio.Group {...field} options={GENDER_RADIO_OPTIONS} />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          help={errors.dob?.message}
          validateStatus={errors.dob ? "error" : ""}
        >
          <Controller
            name="dob"
            control={control}
            rules={{
              required: "Date of birth is required",
              validate: validateDate,
            }}
            render={({ field }) => (
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Select date of birth"
                onChange={(date) => field.onChange(formatDate(date))}
                onBlur={field.onBlur}
                value={field.value ? dayjs(field.value) : null}
                name={field.name}
                ref={field.ref}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Joined Date"
          help={errors.joinedDate?.message}
          validateStatus={errors.joinedDate ? "error" : ""}
        >
          <Controller
            name="joinedDate"
            control={control}
            rules={{
              required: "Joined date is required",
              validate: {
                isAfterDOB: (value) => isJoinedDateAfterDOB(value, dateOfBirth),
              },
            }}
            render={({ field }) => (
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Select joined date"
                onChange={(date) => field.onChange(formatDate(date))}
                onBlur={field.onBlur}
                value={field.value ? dayjs(field.value) : null}
                name={field.name}
                ref={field.ref}
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Flex wrap gap="small" align="flex-start">
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              disabled={!isDirty || isSubmitting}
            >
              {data?.uuid ? "Update Employee" : "Add Employee"}
            </Button>
            <Button
              htmlType="button"
              onClick={() => reset()}
              disabled={!isDirty || isSubmitting}
            >
              Reset
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={onCancel}>
              Cancel
            </Button>
          </Flex>
        </Form.Item>
      </Form>
      <ChangeWarningDialog />
    </div>
  );
};

export default EmployeeForm;
