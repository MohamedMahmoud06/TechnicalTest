import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProduct1 from "./Components/AddProduct1";
import Home from "./Components/Home";

function App() {
  const router = createBrowserRouter([
{path:"/",element: <Home /> },
{path:"/home",element:<Home /> },
{path:"/add",element: <AddProduct1 /> },
{path:"*",element: <h1 className="text-center text-red-600 justify-center align-middle text-9xl">Not found</h1> },


])
  return <>
 
 <RouterProvider router={router}/>
  </>
}

export default App;
