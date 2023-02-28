import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Animal } from "./components/animal/animal";
import { Animals } from "./components/animals/animals";
import { Home } from "./components/home/home";

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
                path: '/animals',
                element: <Animals/>
            },
            {
                path: '/animal/:id',
                element: <Animal/>
            }
        ]
            },
    
])