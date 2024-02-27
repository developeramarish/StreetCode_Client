import React from 'react';

type FormItemProps = {
    name: string,
    label: string,
}

const FormItem = ({ name, label }: FormItemProps) => {
    return(
        <>
            <div data-test-id="form-item-label">{label}</div>
            <div data-test-id="form-item-name">{name}</div>
        </>
    )
};

export default FormItem;
