import styled,{keyframes} from "styled-components";
import BreadCrumbs from "../BreadCrumbs";
import {useEffect, useState} from "react";
import {Outlet, useNavigate, useParams} from "react-router";
import CYOACategory from "./CYOACategory";
import CYOACards from "./CYOACards";
import Resume from "../Resume/Resume";
import {useResume} from "../../ContextHooks/useResumeContext";
import {useCYOA, useCYOAContext} from "../../ContextHooks/useCYOAContext";
import Draggable from "../../Draggable/Draggable";
import {useDraggable} from "../../Draggable/useDraggable";
import CYOACategoryCards from "./CYOACategoryCards";
import Loading from "../Loading";
import FullModal from "../Modal/FullModal";
import ColoredButtons from "../Inputs/ColoredButtons";
import PageSizes from "../Inputs/PageSizes";
import PhotoSelect from "../Inputs/PhotoSelect";


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
  //min-height: 30px;
  //margin: 10px;
  min-width:4.25in;
  max-width: 8.5in;
  //max-height: 11in;
  width: auto;
  //height: auto;
  min-height: 5.5in;
  font-family: monospace, sans-serif;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*flex-wrap: wrap;*/
  background-color: ${props=>props.color};
  padding: 15px;
  margin:auto;
`
const DraggableElement = styled.div`
  border: ${props=> props.selected?"blue solid 2px":"peachpuff solid 2px"};
  outline: ${props=> props.selected?"blue solid 2px":"transparent solid 2px"};
  border-radius: 5px;
  padding: 20px;
  //border: dashed black 2px;
  min-height: 50px;
  margin: 10px;
  // position: ${props=> props.selected?"absolute":"relative"};
  // top: ${props=> props.selected?"absolute":"relative"};
  // bottom: ${props=> props.selected?"absolute":"relative"};
  transition: .2s;
`

function CYOABody(){
    const [paths, setPaths] = useState([{location:"categories",title:"Main",teaserList:["One","Two","Three"]}])
    const CYOAProvider = useCYOA();
    const [showModal, setShowModal] = useState(false)
    const [reportUri,setReportUri ] = useState("")
    const contact ={
        type:"contact",
        name:"Jeremy Cox",
        title:"Developer & IT Enthusiast",
        phone:"(587)-579-5248",
        email:"Jchristophercox@gmail.com",
        address:"1221 B Kensington Rd NW, Calgary, AB T2N 3P8",
    }
    const [cards, setCards] = useState([
        {location:"frontend",title:"Front End",teaserList:["One","Two","Three"],
            list:[
                {
                    id:0,
                    title:"WRAP - Desktop Application",
                    type:"experience",
                    description:"React APP converted to Desktop Application with Electron.js",
                    items:[
                        {description: "Complete user experience overhaul"},
                        {description:"Visual redesign"},
                        {description:"Used IndexedDB for offline data persistence"}
                    ]
                },
                {
                    id:1,
                    title:"WRAP - Report Generation",
                    type:"experience",
                    description:"Thymeleaf Template Engine - Server Side Rendering",
                    items:[
                        {description:"Designed report templates"},
                        {description:"Dynamic report generation using Database & User-submitted data"},
                    ]
                },
                {
                    id:2,
                    title:"Dynamic Background Project",
                    type:"experience",
                    description:"React APP for dynamic backgrounds",
                    items:[
                        {description:"Uses Styled-Components"},
                        {description:"Desktop & Mobile functionality"},
                    ]
                },

            ]},
        {location:"backend",title:"Back End",teaserList:["Four","Two","Zero"],
            list:[
                {
                    id:3,
                    title:"WRAP - Spring MVC Backend",
                    type:"experience",
                    description:"User Authentication, Report Generation & Data Access/Persistence. ",
                    items:[
                        {description:"JPA/CRUD Repository Model configured with Postgres Database"},
                        {description:"Spring Security, With JWT and HTTPS"},
                        {description:"Dynamic report generation with Thymeleaf"},
                    ]
                },
                {
                    id:4,
                    title:"Atzin, Mexico — MikroTik Configuration",
                    type:"experience",
                    // date:"MAY 2022 - AUG 2022",
                    description:"Custom configuration on MikroTik hAP mini for managed wireless access.",
                    items:[
                        {description:"User management & Authentication scripts"},
                        {description:"Setup RADIUS - not implemented due to network concerns"},
                        {description:"Network configuration"},
                    ],
                },
                {
                    id:5,
                    title:"Simple Music Display",
                    type:"experience",
                    description:"Nextjs Audio file storage & streaming service",
                    items:[
                        {description:"Using Mongodb Nextjs Drivers"},
                        {description:"Used Pages routing & App router"},
                        {description:"File Metadata access and manipulation"},
                        {description:"Audio storage and streaming"}
                    ]
                }
                // {
                //     id:5,
                //     title:"Joe's Bicycle Garage",
                //     description:"Consulted Joe's Bicycle Garage on their needs, costs and the feasibility of implementing a rental service",
                //     items:[
                //         "Designed a prototype bicycle rental service",
                //         "Analyzed & tested competing services",
                //         "Implemented Booqable rental service in wordpress"
                //     ]
                // },

            ]},
        {location:"database",title:"Database",teaserList:["One","Two","Three"],
            list:[
                {
                    id:6,
                    title:"WRAP - Postgres Database",
                    type:"experience",
                    // date:"MAY 2022 - AUG 2022",
                    description:"Migrated Microsoft Access data to Postgresql, and augmented the schema for the WRAP application",
                    items:[
                        {description: "User management & Authentication scripts"},
                        {description:"Setup RADIUS - not implemented due to network concerns"},
                        {description:"Network configuration"},
                    ],
                },
                {
                    id:7,
                    title:"",
                    type:"experience",
                    description:"Consulted Joe's Bicycle Garage on their needs, costs and the feasibility of implementing a rental service",
                    items:[
                        {description:"Designed a prototype bicycle rental service"},
                        {description:"Analyzed & tested competing services"},
                        {description:"Implemented Booqable rental service in wordpress"}
                    ]
                },
            ]
        }
    ]);
    const refreshPDF = ()=>{
        setReportUri("")
        doTest()
    }
    const doTest = ()=>{
        let resume = {
            pageSize:pageSize,
            pageColor:pageColor,
            photoSelect:photo,
            resumeItems :[contact,...draggable.getElements()],
        }
        // resume.resumeItems.push(contact)
        fetch("http://localhost:8080"+"/thymeleaf/resume",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(resume)
        }).then(res=>{
            console.log(res)
            if(res.ok){
                return res.blob()
            }
        }).then(data=> {
            let report = new Blob([data], {type:'application/pdf'})
            setReportUri(window.URL.createObjectURL(report))
            setShowModal(true)
        }).catch(err=>{
            console.log(err)
        })
    }
    const draggable = useDraggable();
    const [pageSize , setPageSize ]= useState("letter")
    const [pageColor,setPageColor] = useState("white")
    const [photo, setPhoto] = useState(0)
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
            {/*<BreadCrumbs setPaths={setPaths} paths={paths}/>*/}
            <CYOACards  paths={paths} setPaths={setPaths}/>
            <CYOACategoryCards cards={cards}/>
            <input type={"button"} onClick={doTest}/>
            <PhotoSelect selected={[photo,setPhoto]}/>
            <ColoredButtons handleClick={e=>setPageColor(e.target.id)}/>
            <PageSizes backgroundColor={pageColor} handleClick={e=>setPageSize(e.target.id)} selected={pageSize}/>
            <Dropzone onDragOver={draggable.addNewElement} color={pageColor} pagesize={pageSize}>
                {Object.values(draggable.contentElements).map((element,index)=>{
                    return(
                        <Draggable
                            content={element}
                            mouse={draggable.mouse}
                            index={index}
                        >

                            <DraggableElement id={element.id} selected={draggable.dragged.id === element.id} onDoubleClick={draggable.deleteElement}>
                                <h3>{element.title}</h3>
                                <p>{element.description}</p>
                                {Object.values(element.items).map(listItem =>{
                                    return(<li><span>{listItem.description}</span></li>)
                                })}
                            </DraggableElement>
                        </Draggable>
                        // <p> {element.desc}</p>
                    )
                })}
            </Dropzone>
            {/*<input type={"button"} onClick={addElem}/>*/}
            <FullModal modalType={"reportModal"} show={showModal} setShow={setShowModal}>
                {(reportUri === null || reportUri === "")?
                    <Loading/>
                    :
                    <>
                        <iframe src={reportUri}></iframe>
                        {/*<input type={"button"} onClick={clearPdf} value={"Clear PDF"}/>*/}
                        <input type={"button"} onClick={refreshPDF} value={"Refresh PDF "}/>
                    </>
                }
            </FullModal>
        </CYOABase>
    )
}export default CYOABody;