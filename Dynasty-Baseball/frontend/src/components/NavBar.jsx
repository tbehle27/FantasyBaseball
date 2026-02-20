import '../styles/NavBar.css'
import { Link } from "react-router";

function NavBar(){
   return <div className="nav-container">
      <div className="dropdown">
         <div className="nav-item">Team Pages</div>
         <div className="hover-content">
            <Link to="teampage/Tyler">Tyler</Link>
         </div>
         
      </div>
      <div className="nav-item">Draft Central</div>
   </div>
}
export default NavBar