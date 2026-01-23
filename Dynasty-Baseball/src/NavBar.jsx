import './NavBar.css'
import { Link } from "react-router";

function NavBar(){
   return <div class="nav-container">
      <div class="dropdown">
         <div class="nav-item">Team Pages</div>
         <div class="hover-content">
            <Link to="teampage/Tyler">Tyler</Link>
         </div>
         
      </div>
      <div class="nav-item">Draft Central</div>
   </div>

}
export default NavBar