import { Link, Outlet } from "react-router-dom";
import "./Layout.css"
export default function Layout() {

  return (
    <>
    <div className="headerContainer">
        <h2> Search Book </h2>
      <div className="linksContainer">
        <Link to="/"><h3>Home</h3></Link>
        <Link to="/favorites" key="keyToRerender"><h3>Favorites</h3></Link>
      </div>
    </div>
      <Outlet />
    </>
  )
}