import TestComp from "./TestComp";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./LayoutComps/Layout";
import "./static/styles.css"

function App(){

    return(

        <BrowserRouter>
            <Routes>
                <Route path={""} element={
                    <Layout>

                    </Layout>
                }>
                    <Route>

                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );

}export default App;