import TestComp from "./TestComp";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./LayoutComps/Layout";
import HomePage from "./LayoutComps/HomePage";
import Resume from "./LayoutComps/Resume/Resume";
import "./static/styles.css"
import {ResumeProvider} from "./ContextHooks/useResumeContext";
import Dev from "./LayoutComps/Dev";
import DevLayout from "./LayoutComps/DevLayout";
import {createGlobalStyle} from "styled-components";


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
                        <Route path={"dev"} element={<Dev/>}/>
                    </Route>
                    <Route path={"/layout"} element={<DevLayout/>}>

                    </Route>
                    {/*<Route element={<HttpChallenge>}/>*/}
                </Routes>
            </BrowserRouter>
        </>
    );

}export default App;