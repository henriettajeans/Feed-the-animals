import axios from "axios";

interface ITempAnimal{
    id:string;
}

export const getEverythingAnimal = async (id: string)=>{
    let response = await axios.get("https://animals.azurewebsites.net/api/animals");
    return response.data.filter((animal: ITempAnimal)=> String(animal.id) === id)[0];
}