import React, { ReactNode, MouseEventHandler, ChangeEventHandler, JSX } from 'react';

/*
type ItemProps = {
    name: string,
    label: string,
    rules: ReactNode,
    children: ReactNode,
};

type FormProps = {
    form: any,
    layouyt: string,
    onFinish: MouseEventHandler<HTMLButtonElement>,
    useForms: Function,
}

type FormType = {
    Form: typeof Form,
    useForm: Function,
    Item: typeof Item
}
*/

/*
export const Form = {
    render: ({ form, layouyt, onFinish }: FormProps) => {
      return(
        <>
          <div data-test-id='form'>{form}</div>
          <div data-test-id='form-layout'>{layouyt}</div>
          <button type='button' data-test-id="form-button" onClick={onFinish}/>
        </>
      )
    },
    useForm: () => {
      return [{
        setFieldsValue: mockSetFieldsValue,
        resetFields: mockResetFields,
      }] 
    },
    Item: ({ name, label, rules, children }: ItemProps) => {
      return(
          <>
              <div className='itemName' data-test-id="item-name">{name}</div>
              <div className='itemLabel' data-test-id="item-label">{label}</div>
              <div className='ItemRule' data-test-id="item-rules">{rules}</div>
              <div className='ItemChildren' data-test-id="item-children">{children}</div>
          </>
      )
    }
}
*/

export const mockSetFieldsValue = jest.fn();
export const mockResetFields = jest.fn();

const FormComponent = ({ form, layouyt, onFinish }) => {
    return(
          <>
            <div data-test-id='form'>{form}</div>
            <div data-test-id='form-layout'>{layouyt}</div>
            <button type='button' data-test-id="form-button" onClick={onFinish}/>
          </>
    )
};
  
  const useForm = () => {
    return [{
      setFieldsValue: mockSetFieldsValue,
      resetFields: mockResetFields,
    }] 
  };
  
  const Item = ({ name, label, rules, children }) => {
    return(
        <>
            <div className='itemName' data-test-id="item-name">{name}</div>
            <div className='itemLabel' data-test-id="item-label">{label}</div>
            <div className='ItemRule' data-test-id="item-rules">{rules}</div>
            <div className='ItemChildren' data-test-id="item-children">{children}</div>
        </>
    )
  };

const mockedForm = FormComponent;
mockedForm.Item = Item;
mockedForm.useForm = useForm;
  
export default mockedForm;