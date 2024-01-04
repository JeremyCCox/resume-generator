import styled,{keyframes} from "styled-components";
import BreadCrumbs from "../BreadCrumbs";
import {useEffect, useState} from "react";
import {Outlet, useNavigate, useParams} from "react-router";
import CYOACategory from "./CYOACategory";
import CYOACards from "./CYOACards";
import Resume from "../Resume/Resume";
import {useResume} from "../../ContextHooks/useResumeContext";
import {useCYOA, useCYOAContext} from "../../ContextHooks/useCYOAContext";
import ResumeBody from "../Resume/ResumeBody";
import {useDraggable} from "../../ContextHooks/useDraggable";
import DraggableCopy from "../Resume/DraggableCopy";
import Draggable from "../Resume/Draggable";


const CYOABase=styled.div`
  display: grid;
`
const CYOAContent=styled.div.attrs(props=>({
    style:{
        flexBasis: props.flexBasis
    },
}))`
    
`
const Dropzone=styled.div`
  border: dashed black 2px;
  min-height: 30px;
  margin: 10px;
`
const DraggableElement = styled.div`
  border: dashed black 2px;
  min-height: 30px;
  margin: 10px;
`

function CYOABody(){
    const [paths, setPaths] = useState([{location:"categories",title:"Main",teaserList:["One","Two","Three"]}])
    const CYOAProvider = useCYOA();
    const [cards, setCards] = useState([
        {location:"frontend",title:"Front End",teaserList:["One","Two","Three"],
            list:[
                {
                    id:0,
                    title:"WRAP - Desktop Application",
                    desc:"React APP converted to Desktop Application with Electron.js",
                    items:[
                        "Complete user experience overhaul",
                        "Visual redesign",
                        "Used IndexedDB for offline data persistence"
                    ]
                },
                {
                    id:1,
                    title:"WRAP - Report Generation",
                    desc:"Thymeleaf Template Engine - Server Side Rendering",
                    items:[
                        "Designed report templates",
                        "Dynamic report generation from Database & User-submitted data",
                    ]
                },
                {
                    id:2,
                    title:"Dynamic Background Project",
                    desc:"React APP for dynamic backgrounds",
                    items:[
                        "Uses Styled-Components",
                        "Desktop & Mobile functionality",
                    ]
                },

            ]},
        {location:"backend",title:"Back End",teaserList:["Four","Two","Zero"],
            list:[
                {
                    id:3,
                    title:"WRAP - Spring MVC Backend",
                    desc:"User Authentication, Report Generation & Data Access/Persistence. ",
                    items:[
                        "JPA/CRUD Repository Model configured with Postgres Database",
                        "Spring Security, With JWT and HTTPS",
                        "Dynamic report generation with Thymeleaf",
                    ]
                },
                {
                    id:4,
                    title:"Atzin, Mexico — MikroTik Configuration",
                    // date:"MAY 2022 - AUG 2022",
                    desc:"Custom configuration on MikroTik hAP mini for managed wireless access.",
                    items:[
                        "User management & Authentication scripts",
                        "Setup RADIUS - not implemented due to network concerns",
                        "Network configuration",
                    ],
                },
                {
                    id:5,
                    title:"Joe's Bicycle Garage",
                    desc:"Consulted Joe's Bicycle Garage on their needs, costs and the feasibility of implementing a rental service",
                    items:[
                        "Designed a prototype bicycle rental service",
                        "Analyzed & tested competing services",
                        "Implemented Booqable rental service in wordpress"
                    ]
                },

            ]},
        {location:"database",title:"Database",teaserList:["One","Two","Three"],
            list:[
                {
                    id:6,
                    title:"Atzin, Mexico — MikroTik Configuration",
                    // date:"MAY 2022 - AUG 2022",
                    desc:"Custom configuration on MikroTik hAP mini for managed wireless access.",
                    items:[
                        "User management & Authentication scripts",
                        "Setup RADIUS - not implemented due to network concerns",
                        "Network configuration",
                    ],
                },
                {
                    id:7,
                    title:"Joe's Bicycle Garage",
                    desc:"Consulted Joe's Bicycle Garage on their needs, costs and the feasibility of implementing a rental service",
                    items:[
                        "Designed a prototype bicycle rental service",
                        "Analyzed & tested competing services",
                        "Implemented Booqable rental service in wordpress"
                    ]
                },
            ]
        }
    ]);

    const draggable = useDraggable();

    useEffect(()=>{
        let items=[]
        console.log(cards)
        Object.values(cards).map(card=>{
            items.push(...card.list)
        })
        draggable.elementDispatch({type:"reset",items:items});
    },[])
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
            <Dropzone onDragOver={draggable.addNewElement}>
                {Object.values(draggable.contentElements).map((element,index)=>{
                    return(
                        <DraggableCopy
                            content={element}
                            index={index}
                        >
                                {element.desc}
                            {/*<CYOACategoryOption>*/}

                            {/*</CYOACategoryOption>*/}
                        </DraggableCopy>
                        // <p> {element.desc}</p>
                    )
                })}
            </Dropzone>

            {/*<input type={"button"} onClick={addElem}/>*/}
        </CYOABase>
    )
}export default CYOABody;