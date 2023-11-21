import { endpoints } from "../../constant";
import axios from "axios";

export const getSuggestedLocation = async (text, limit) => {
    try {
        let finalLimit = 8;
        if(limit){
            finalLimit = limit
        }
        const url = `${endpoints.autoComplete}?location=${text}&limit=${finalLimit}`;
        const {data} = await axios.get(url)

        if(data){
            return data
        }
        return []
    } catch (error) {
        console.log(error.message);
        return []
    }
}