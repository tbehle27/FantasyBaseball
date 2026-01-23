import App from './App';
import TeamPage from "./TeamPage";
import ErrorPage from "./ErrorPage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "teampage/:manager",
        element: <TeamPage />,
    }
];
export default routes;