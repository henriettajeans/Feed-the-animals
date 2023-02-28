import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal"
import { getEverythingAnimal } from "../../services/getEverythingAnimal";
import './animal.scss';

export const Animal =(()=>{
    const [animal, setAnimal] = useState<IAnimal>();
    const { id } = useParams();
    useEffect(() => {
        getDataById();
      },[]);
        const getDataById = async () =>{
            let response = await getEverythingAnimal( id! );
            setAnimal(response);
        }
        const rightNow = new Date();
        const previousFeedTime = localStorage.getItem(animal?.id!);
         const previous = new Date(previousFeedTime!);

    function handleClick(){
           let loggedTime : any = window.localStorage.setItem(animal?.id!, rightNow.toString());
        if (previous.getHours() + 3 < rightNow.getHours()){
            return(
                <div>
                    {animal?.isFed && <p>{loggedTime}</p>}
                </div>
            )
        }
        }
        
   
        // useEffect(()=>{
        //     previousFeedTime();
        // },[]);
    return(
        <article>
        <h2>Välkommen in till {animal?.name}</h2>
        <p>{animal?.latinName}</p>
        <p>{animal?.shortDescription}</p>
        <img src={animal?.imageUrl} alt="Bilden saknas"/>
        <p>{animal?.longDescription}</p>
        <button onClick={handleClick}>Mata</button><span>Kom tillbaka om 3 timmar</span>
        </article>
    );
})

   

    

//   const handleClick = function isFedButton(){
//     const [clicked, setClicked] = useState <IButtonFed[]>([]);
//     localStorage.setItem(animal?.id!, new Date().toString());
//     (console.log("Button was pressed"))
//     const rightNow = new Date();
// const previousFeedTime = localStorage.getItem(animal?.id!);
// const previous = new Date();
// // localStorage.setItem(animal?.id!, new Date().toString());
//     if 
//     (previous.getHours() +3 < rightNow.getHours() ){

//     }
//     isFedButton();

// }
// const isFedButton = () =>{
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const [clickedButton, setClickedButton] = useState<IButtonFed>()
    
//     const buttonHandler = (event: any) => {
//         event.preventDefault();
//     setClickedButton();
//     console.log({setClickedButton})