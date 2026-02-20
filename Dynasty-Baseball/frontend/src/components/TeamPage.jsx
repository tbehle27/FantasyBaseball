import { useParams } from "react-router";
import '../styles/TeamPage.css';
function TeamPage(){
    const { manager } = useParams();
    return <>
            <h1>Welcome to { manager }'s team page</h1>   
            </>
    }
export default TeamPage