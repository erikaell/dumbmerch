import { Outlet } from "react-router-dom"
import NavbarAdmin from "./NavbarAdmin"


function LayoutUser () {
    return (
        <div>
            <NavbarAdmin />
            <div>
              <Outlet />
            </div>
        </div>
    )
}

export default LayoutUser;