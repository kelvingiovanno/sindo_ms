import { RouterProvider as Router }  from "react-router";
import router from "./router";

const RouterProvider = () => {
    return <Router router={router}/>;
}

export default RouterProvider;