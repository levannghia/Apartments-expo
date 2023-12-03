import axios from "axios";

export const handleError = (error) => {
    if(axios.isAxiosError(error)){
        if(error.response) return alert((error.response.data).detail);
        return alert(error.message);
    }
}