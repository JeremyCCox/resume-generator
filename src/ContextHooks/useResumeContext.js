import {createContext, useContext, useState} from "react";
import resume from "../LayoutComps/Resume/Resume";


const ResumeContext = createContext();
export const ResumeProvider=({children})=>{

    const [resumeHeight, setResumeHeight] = useState(0);

    const getResumeHeight=()=>{
        return [resumeHeight,setResumeHeight];
    }
    const addHeight=(value)=>{
        console.log(value)
        console.log(resumeHeight)
        setResumeHeight(resumeHeight + value);
    }
    const Contact ={
        name:"Jeremy Cox",
        title:"Developer & IT Enthusiast",
        phone:"(587)-579-5248",
        email:"Jchristophercox@gmail.com",
        address:"",
    }
    const exResume={
        contact:Contact,
        content:[
            // {
            //     id: 1,
            //     type:"experience",
            //     title:"Atzin, Tlamacazapa, Mexico — System Design & Augmentation",
            //     // date:"MAY 2022 - AUG 2022",
            //     dateFrom:"",
            //     dateTo:"",
            //     description:"Full-time volunteer work with the non-profit civil society organization, Atzin, which provides healthcare to villages in Morelos, Mexico.",
            //     items:[
            //         {description:"Developed and installed a PHP application that allowed managed wireless access in the Tlamacazapa community center"},
            //         {description:"Updated and Upgraded the office computer systems"},
            //         {description:"Taught workers Internet and Computer use safety standards"},
            //     ],
            // },
            // {
            //     id:2,
            //     type:"experience",
            //     title:"Wotherspoon Environmental Inc. WRAP - Software Design, Development & Implementation",
            //     // date:"MAY 2023 - OCT 2023",
            //     dateFrom:"",
            //     dateTo:"",
            //     description:"Designed a Full-Stack system for Data Entry, Data Access and Report Generation.",
            //     items:[
            //         {description:"Designed a new React Frontend."},
            //         {description:"Re-designed their MS-Access Database, and migrated to PostgreSQL."},
            //         {description:"Used Spring Boot for Data Security, Persistence & Connectivity."},
            //         {description:"Created a PDF Generator to Streamline their report creation process."},
            //         {description:"Packaged an Offline version of the WRAP Application, for remote use."},
            //     ],
            // },
            // {
            //     id:3,
            //     type:"experience",
            //     title:"Joes Bicycle Garage",
            //     // date:"May 2023 - July 2023",
            //     dateFrom:"",
            //     dateTo:"",
            //     description:"Designed a Full-Stack system for Data Entry, Data Access and Report Generation.",
            //     items:[
            //         {description:"Designed a new React Frontend."},
            //         {description:"Re-designed their MS-Access Database, and migrated to PostgreSQL."},
            //         {description:"Used Spring Boot for Data Security, Persistence & Connectivity."},
            //         {description:"Created a PDF Generator to Streamline their report creation process."},
            //         {description:"Packaged an Offline version of the WRAP Application, for remote use."},
            //     ],
            // },
                    {
                        id:4,
                        type:"skills",
                        title:"Personal Skills",
                        skills:[
                            "Able to work in small or large groups",
                        ],
                    },
            // {
            //     type:"split",
            //     content:[
            //         {
            //             type:"skills",
            //             title:"Developer Skills",
            //             skills:[
            //                 "Java",
            //                 "SQL",
            //                 "Python",
            //                 "JavaScript",
            //                 "HTML",
            //                 "CSS",
            //                 "PHP",
            //                 "Docker",
            //             ],
            //         },
            //         {
            //             type:"skills",
            //             title:"Personal Skills",
            //             skills:[
            //                 "Able to work in small or large groups",
            //             ],
            //         },
            //     ],
            // }
        ]
    }
    const getExResume=()=>{
        return exResume;
    }
    return (
        <ResumeContext.Provider value={
            {
                getResumeHeight,
                addHeight,
                getExResume,
            }
        }>
            {children}
        </ResumeContext.Provider>
    )
}
export const useResume=()=>{
    return useContext(ResumeContext);
}