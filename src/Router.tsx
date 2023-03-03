import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AnimalDetails } from "./components/animalPage/animalDetails";
import { Home } from "./components/home/home";
import { ZooAnimals } from "./components/zoo/zooAnimals";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <Home/>,
                index: true
            },
            {
                path: '/zoo',
                element: <ZooAnimals/>
            },
            {
                path: '/animal/:id',
                element: <AnimalDetails/>
            }
        ]
            },
    
])