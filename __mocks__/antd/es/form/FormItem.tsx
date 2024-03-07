import React, { ReactNode } from 'react';

type FormItemProps = {
    name: string;
    label: string;
    rules?: any[];
    children?: ReactNode;
}

const FormItem: React.FC<FormItemProps> = ({ name, label, rules, children }) => {
    return (
        <>
            <div data-test-id="form-item-label">{label}</div>
            <div data-test-id="form-item-name">{name}</div>
            {children }
        </>
    )
};

export default FormItem;
