import App from './App';
import TeamPage from "./components/TeamPage";
import ErrorPage from "./components/ErrorPage";

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
