import axios from "axios"

export const getAnimals =async () => {
    let response = await axios.get("https://animals.azurewebsites.net/api/animals");
    return response.data;
    
}