import { useContext } from "react";
import { AppContext } from "../App.context";

const Error =  () => {
    const {error} = useContext(AppContext);
    return(
    <h3>{error} , Try to register token again! </h3>
);}

export default Error;