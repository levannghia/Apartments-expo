import { endpoints } from "../../constant";
import axios from "axios";

export const getSuggestedLocation = async (text, limit) => {
    try {
        let finalLimit = 8;
        if(limit){
            finalLimit = limit
        }
        const url = `${endpoints.autoCompeleteEndpoint}?location=${text}&limit=${finalLimit}`;
        const {data} = await axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
        })

        if(data){
            return data
        }
        return []
    } catch (error) {
        console.log(error);
        return []
    }
}