import {createContext, useContext, useState,useReducer} from "react";

const CYOAContext = createContext()

function listReducer(state,action){
    switch (action.type){
        case("insert"):
            return(
                [
                    ...state,
                    action.item
                ]
            )
        case ("delete"):
            return(

                state.filter(item=>{
                    return item.id !== action.item.id;
                })
            )
        case ("swap"):
            let newState = Object.assign([],state);
            newState.splice(action.itemIndex,0,...newState.splice(action.dragIndex,1))
            return(
                newState
            )
        case("move"):
            let item = Object.assign({},state[action.index]);
            action.send({type:"insert",item:item})
            return(
                state.filter(filter=>{
                    return filter.id !== item.id;
                })
            )
        case("tag"):
            let list = Object.assign([],state);
            list[action.index].tag=action.tag
            return(
                list
            )

        default:

    }
}
export const CYOAProvider = ({children})=>{
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
    ])
    const [resumeItems, elementDispatch] = useReducer(listReducer,[],undefined)

    const getCards = ()=>{
        return cards;
    }





    return (
        <CYOAContext.Provider
            value={{
                getCards
            }}
        >
            {children}
        </CYOAContext.Provider>
    )
}

export const useCYOA =()=>{
    return useContext(CYOAContext);
}