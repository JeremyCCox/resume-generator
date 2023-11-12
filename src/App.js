import TestComp from "./TestComp";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./LayoutComps/Layout";
import HomePage from "./LayoutComps/HomePage";
import Resume from "./LayoutComps/Resume/Resume";
import "./static/styles.css"
import {ResumeProvider} from "./ContextHooks/useResumeContext";

function App(){

    return(

        <BrowserRouter>
            <Routes>
                <Route path={"/*"} element={
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
                </Route>
                {/*<Route element={<HttpChallenge>}/>*/}
            </Routes>
        </BrowserRouter>
    );

}export default App;