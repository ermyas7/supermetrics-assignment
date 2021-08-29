import { useState } from "react";

export const useForm = (initialData = {}) => {
    const [inputs, setInputs] = useState(initialData);

    const changeHandler = (evt) => {
        const { value, name } = evt.target;
        setInputs({...inputs, name: value});
    }

    return {
        inputs,
        changeHandler
    }
};