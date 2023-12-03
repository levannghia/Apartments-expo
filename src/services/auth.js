import axios from "axios";
import { endpoints } from "../../constant";
import { handleError } from "../utils/handleError";

export const registerUser = async (name, email, password) => {
    try {
        const {data} = await axios.post(endpoints.register, {
            name: name,
            email: email,
            password: password,
            password_confirmation: password,
        });

        if(data) return data
        return null
    } catch (error) {
        handleError(error);
        // console.log(error);
    }
}

export const loginUser = async (email, password) => {
    try {
        const {data} = await axios.post(endpoints.login, {
            email: email,
            password: password,
        })
        // console.log("data: ", data);
        if(data) return data;
        return null;
    } catch (error) {
        handleError(error)
    }
}