import React, { ReactNode } from 'react';
import FormItem from './FormItem';

interface FormProps {
  form: ReactNode;
  layout: string;
  onFinish: () => void;
  children?: ReactNode;
}

const mockForm = {
  setFieldsValue: jest.fn(),
  resetFields: jest.fn(),
  validateFields: jest.fn(),
  submit: jest.fn(),
};

const useForm = jest.fn(() => [mockForm]);

const Form: React.FC<FormProps> & { Item: typeof FormItem; useForm: typeof useForm } = ({
  layout,
  onFinish,
  children,
}) => {
  return (
    <>
      <div data-testid="form-layout">{layout}</div>
      <button type="button" data-testid="form-button" onClick={onFinish} />
      {children}
    </>
  );
};

Form.Item = FormItem;
Form.useForm = useForm;

export default Form;