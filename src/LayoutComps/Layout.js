import {Outlet} from "react-router";
import Title from "./Title";
import Content from "./Content";
import Foot from "./Foot";

function Layout(props){

    return(
        <>
            <div className={"page-layout"}>
                <Title/>
                <Content>
                    <Outlet/>
                </Content>
            </div>
            <Foot/>
        </>

    )

}export default Layout;