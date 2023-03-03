import axios from "axios";
import { IAnimalDetails } from "../models/IAnimalDetails";



export const getEverythingAnimal = async (id: string)=>{
    let response = await axios.get<IAnimalDetails>("https://animals.azurewebsites.net/api/animals");
    return response.data;
}

export const getAnimals =async () => {
    let response = await axios.get<IAnimalDetails[]>("https://animals.azurewebsites.net/api/animals");
    return response.data;
}

