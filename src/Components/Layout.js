import { Link, Outlet } from "react-router-dom";

export default function Layout() {

  return (
    <>
      <div>
        <div> Search Book </div>
        <Link to="/">Home</Link>
        <Link to="/favorites" key="keyToRerender">Favorites</Link>
      </div>
      <Outlet />
    </>
  )
}