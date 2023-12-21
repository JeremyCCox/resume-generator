import styled, {createGlobalStyle} from 'styled-components'
import TestComp from "../TestComp";
import img from '/public/jeremy-horizontal.jpg';
import pano from '../static/panorama.jpg';
import NavBar from "./NavBar";
import DynamicBackground from "./DynamicBackground/DynamicBackground";
const TestStyled = styled.div`
      background-color: white;
    `
const GlobalStyle = createGlobalStyle`
      body{
        // background-image: url(${pano});
        // background-repeat: no-repeat;
        // background-size: cover;
        // background-position-x: 50%;
        // height: 100vh;
      }
    `


function DevLayout(props){
    return(
        <>
            {/*<GlobalStyle/>*/}
            <DynamicBackground/>
            {/*<TestStyled>*/}
            {/*    <TestComp/>*/}
            {/*</TestStyled>*/}
        </>
    )
}export default DevLayout;