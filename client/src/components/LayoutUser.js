import { Outlet } from "react-router-dom"
import NavbarUser from "./NavbarUser"


function LayoutUser () {
    return (
        <div>
            <NavbarUser />
            <div>
              <Outlet />
            </div>
        </div>
    )
}

export default LayoutUser;