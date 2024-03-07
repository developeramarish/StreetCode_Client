import React, { ReactNode, MouseEventHandler, ChangeEventHandler, JSX } from 'react';
import Form from './es/form/Form';

//export {default as Form} from './es/form/Form';


type ModalProps = {
  title: string,
  open: boolean,
  onOk: MouseEventHandler<HTMLButtonElement>,
  onCancel: MouseEventHandler<HTMLButtonElement>,
  children: ReactNode,
}

type InputProps = {
  maxLength: number,
  showCount: boolean,
};

type ButtonProps = {
  className: string,
  onClick: MouseEventHandler<HTMLButtonElement>,
  children: ReactNode,
};

type PopoverProps = {
  content: string,
  trigger: string,
  children: ReactNode,
}

type SelectProps = {
  className: string,
  onSelect: MouseEventHandler<HTMLButtonElement>,
  mode: string,
  onDeselect: MouseEventHandler<HTMLButtonElement>,
  value: Array<any>,
  children: ReactNode,
}

type UploadFileProps = {

}

interface UploadProps {
  name?: string;
  action?: string;
  headers?: Record<string, string>;
  method?: 'POST' | 'PUT';
  withCredentials?: boolean;
  multiple?: boolean;
  accept?: string;
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
  onChange?: (info: { file: File; fileList: File[]; event: Event }) => void;
  onSuccess?: (response: any, file: File, xhr: XMLHttpRequest) => void;
  onError?: (error: Error, file: File) => void;
  onProgress?: (event: { percent: number }, file: File) => void;
  customRequest?: (option: any) => void;
  data?: Record<string, unknown>;
  listType?: 'text' | 'picture' | 'picture-card';
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
}

type CheckboxProps = {
  checked: boolean,
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const mockSetFieldsValue = jest.fn();
export const mockResetFields = jest.fn();

type OptionProps = {
  key?: string,
  value?: string
}

export const mockConfig = jest.fn();

export const Modal = ({ title, open, onOk, onCancel, children }: ModalProps) => {
  return (
    <>
      <div className='modalTitle'>{title}</div>
      <div className="isModalOpen">{JSON.stringify(open)}</div>
      <button type='button' className='modalOkButton' onClick={onOk}>okButton</button>
      <button type='button' className='modalCancelButton' onClick={onCancel}>cancelButton</button>
      <div className='modal-children'>{children}</div>
    </>
  )
};

export const Upload = ({ children, ...props }: UploadProps) => {
  return (
    <div data-testid="mock-upload" {...props}>
      {children}
    </div>
  );
};

export const Input = ({ maxLength, showCount }: InputProps) => {

  return (
    <>
      <div data-test-id="max-lenght">{maxLength}</div>
      <div data-test-id="show-count">{showCount}</div>
    </>
  )
};

export const Button = ({ className, onClick, children }: ButtonProps) => {

  return (
    <>
      <div data-test-id="button-class" className={className} />
      <button type='button' data-test-id="button-button" onClick={onClick} />
      <div data-test-id="modal-children">{children}</div>
    </>

  )
};

export const message = {
  config: mockConfig,
};

export const Popover = ({ content, trigger, children }: PopoverProps) => {
  return (

    <>
      <div data-test-id="popover-content">{content}</div>
      <div data-test-id="popover-trigger">{trigger}</div>
      <div data-test-id="popover-children">{children}</div>
    </>
  )
};

const Option = ({ key, value }: OptionProps) => {
  return (
    <>
      <div data-test-id="option-key">{key}</div>
      <div data-test-id="option-value">{value}</div>
    </>
  )
}

const Select = ({ className, onSelect, mode, onDeselect, value, children }: SelectProps) => {
  return (
    <>
      <div className={className} data-test-id="select-class-name" />
      <button type='button' data-test-id="select-on-select" onClick={onSelect} />
      <div data-test-id="select-mode">{mode}</div>
      <button type='button' data-test-id="select-on-deselect" onClick={onDeselect} />
      <div data-test-id="select-value">{value}</div>
      <div data-test-id="select-children">{children}</div>
    </>
  )
};


Select.Option = Option;

export { Select };

/*
export const UploadFile = () => {
  return(
    <>
      
    </>
  )
};
*/


export const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  return (
    <>
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span>Checkbox Label</span>
      </label>
    </>
  )
};
export { Form };

//export const Form = mockedForm;

// export const mockSetFieldsValue = jest.fn();
// export const mockResetFields = jest.fn();


// type useFormProps = {
//   setFieldsValue: typeof mockSetFieldsValue,
//   resetFields: typeof mockResetFields,
// }

// type ItemProps = {
//   name: string,
//   label: string,
//   rules: ReactNode,
//   children: ReactNode,
// };

// type FormProps = {
//   form: ReactNode,
//   layout: string,
//   onFinish: MouseEventHandler<HTMLButtonElement>,
//   useForm: () => any
// }

// declare const Form: FormProps;
// export default Form;
