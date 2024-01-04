import TestComp from "./TestComp";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./LayoutComps/Layout";
import HomePage from "./LayoutComps/HomePage";
import Resume from "./LayoutComps/Resume/Resume";
import "./static/styles.css"
import {ResumeProvider} from "./ContextHooks/useResumeContext";
import Dev from "./LayoutComps/Dev";
import DevLayout from "./LayoutComps/DevLayout";
import styled, {createGlobalStyle} from "styled-components";
import CYOABody from "./LayoutComps/ResumeCYOA/CYOABody";
import {Outlet} from "react-router";
import CYOACards from "./LayoutComps/ResumeCYOA/CYOACards";
import CYOACategory from "./LayoutComps/ResumeCYOA/CYOACategory";
import {CYOAProvider} from "./ContextHooks/useCYOAContext";
import {DraggableProvider} from "./ContextHooks/useDraggable";

const CYOABase=styled.div`
`

function App(){
    const GlobalStyle = createGlobalStyle`
      body{
        margin: 0;
        //padding: 0;
      }
    `

    return(
        <>
            <GlobalStyle/>
            <BrowserRouter>
                <Routes>
                    <Route path={"/*"} element={
                        // <DevLayout/>
                        <Layout>

                        </Layout>
                    }>
                        <Route path={""}/>
                        <Route path={"home"} element={<HomePage/>}/>
                        <Route path={"resume"} element={
                            <ResumeProvider>
                                <Resume/>
                            </ResumeProvider>
                        }/>
                        <Route path={"categories/*"}  element={
                            <CYOAProvider>
                                <DraggableProvider elements={"test1"}>
                                    <CYOABody/>
                                </DraggableProvider>
                            </CYOAProvider>
                        }>
                            <Route path={":category"} element={<CYOACategory/>}/>
                            {/*<Route path={":category"} element={<CYOACategory/>}/>*/}
                            {/*<Route path={""} element={<CYOACards/>}/>*/}
                            {/*<Route path={""} element={<CYOABody/>}/>*/}
                        </Route>
                        <Route path={"dev"} element={<DraggableProvider elements={"test1"}><Dev/></DraggableProvider>}/>
                    </Route>
                    {/*<Route path={"/layout"} element={<DevLayout/>}>*/}

                    {/*</Route>*/}
                    {/*<Route element={<HttpChallenge>}/>*/}
                </Routes>
            </BrowserRouter>
        </>
    );

}export default App;