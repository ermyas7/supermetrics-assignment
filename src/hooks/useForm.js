import { useState } from "react";

export const useForm = (initialData = {}) => {
    const [inputs, setInputs] = useState(initialData);

    const changeHandler = (evt) => {
        const { value, name } = evt.target;
        setInputs({...inputs, [name]: value});
    }

    const submitHandler = (evt, cb = () => {}) => {
        evt.preventDefault();
        cb();
        clearForm();
    }

    const clearForm = () => {
        const clearedInputs = Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, '']));
        setInputs(clearedInputs);
    };

    return {
        inputs,
        changeHandler,
        submitHandler
    }
};