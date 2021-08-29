import { useState } from "react";

export const useForm = (initialData = {}) => {
    const [inputs, setInputs] = useState(initialData);

    const changeHandler = (evt) => {
        const { value, name } = evt.target;
        console.log(value, name);
    }

    return {
        inputs,
        changeHandler
    }
};