import styled,{keyframes} from "styled-components";
import BreadCrumbs from "../BreadCrumbs";
import {useState} from "react";
import {Outlet, useNavigate, useParams} from "react-router";
import CYOACategory from "./CYOACategory";
import CYOACards from "./CYOACards";
import Resume from "../Resume/Resume";
import {useResume} from "../../ContextHooks/useResumeContext";
import {useCYOA, useCYOAContext} from "../../ContextHooks/useCYOAContext";


const CYOABase=styled.div`
  display: grid;
`
const CYOAContent=styled.div.attrs(props=>({
    style:{
        flexBasis: props.flexBasis
    },
}))`
    
`
function CYOABody(){
    const [paths, setPaths] = useState([{location:"categories",title:"Main",teaserList:["One","Two","Three"]}])
    const CYOAProvider = useCYOA();
    const cards = CYOAProvider.getCards();
    // const addElem=()=>{
    //     let newList = Object.assign([],addList);
    //     newList.push("New Item "+(newList.length+1))
    //     setAddList(newList)
    // }
    return(
        <CYOABase>
            <BreadCrumbs setPaths={setPaths} paths={paths}/>
            {/*<CYOAContent >*/}
                <CYOACards  paths={paths} setPaths={setPaths}/>
            {/*</CYOAContent>*/}
                <CYOACategory cards={cards} paths={paths} setPaths={setPaths}/>
            {/*<CYOAContent >*/}
            {/*    <Outlet context={[paths,setPaths]} />*/}
            {/*</CYOAContent>*/}


            {/*<input type={"button"} onClick={addElem}/>*/}
        </CYOABase>
    )
}export default CYOABody;