export interface IAnimal {
    id: string,
    name: string,
    latinName: string,
    shortDescription: string,
    longDescription: string,
    imageUrl: string,
    medicine: string,
    isFed: boolean, 
    lastFed: string
}

export interface IAnimalIntro {
    imageUrl: string | undefined
    id: string,
    name: string,
    imgUrl: string
}