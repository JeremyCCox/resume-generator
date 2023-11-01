import {Outlet} from "react-router";
import Title from "./Title";

function Layout(){

    return(
        <div className={"page-layout"}>
            <Title>

            </Title>
            <Outlet/>
        </div>
    )

}export default Layout;