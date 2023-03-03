
export const LS_KEY = "listOfAnimals";


export const getFromLS = <T>(): T[]  =>{
    const getAnimalStatus = localStorage.getItem (LS_KEY) || "[]";
    return JSON.parse (getAnimalStatus);
}

export const saveToLS = <T>(saveAnimal:T): T[] => {
    const saveAnimalStatus = localStorage.setItem (LS_KEY, "[]");
    console.log("saving id");
    return JSON.parse(saveAnimalStatus!);
}