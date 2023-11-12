import Experience from "./Experience";
import Skills from "./Skills";
import FullModal from "../Modal/FullModal";
import Loading from "../Loading";
import {useEffect, useState} from "react";
import Split from "./Split";
import ResumeContent from "./ResumeContent";
import ResumeBody from "./ResumeBody";
import ResumeEditor from "./ResumeEditor";
import {useResume} from "../../ContextHooks/useResumeContext";
import resume from "./Resume";

function Resume(){
    const [reportUri, setReportUri] = useState("")
    const [showReportModal, setShowReportModal] = useState(false)
    const resume = useResume();
    const [exResume,setExResume] = useState(useResume().getExResume());
    const getPdf=()=>{
        return new Promise(resolve => {
            fetch("http://localhost:8080/thymeleaf/pageSize",{
                method:"Post",
                headers:{
                    Accept:"application/pdf",
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({type:"legal"}),
            }).then(res=>{
                console.log(res);
                if(res.ok){
                    return res.blob();
                }else{
                    throw new Error(res.status);
                }
            }).then(data=>{
                console.log(data)
                resolve(data)
            }).catch(error=>{
                console.error(error)
            })
        })

    }
    const addHeight=(value)=>{
        console.log(height)
        console.log(value)
        setHeight(height + value);
    }
    const showPdf=()=>{
        setReportUri("");
        setShowReportModal(true);
        getPdf().then(res => {
            setReportUri(window.URL.createObjectURL(res))
            console.log(window.URL.createObjectURL(res))
        })
    }
    const clearPdf=()=>{
        setReportUri("");
        setShowReportModal(false);
    }
    const refreshPDF=()=>{
        setReportUri("");
        getPdf().then(res => {
            setReportUri(window.URL.createObjectURL(res))
        })
    }
    const [cumHeight, setCumHeight]=useState()
    useEffect(()=>{
        // console.log(exResume.content)
        calcTotalHeight()
    },[exResume])
    const calcTotalHeight=()=>{
        let newCumHeight = 0;
        exResume.content.forEach(value => {
            if(value.hasOwnProperty("height")){
                newCumHeight += value.height;
            }
        })
        setCumHeight(newCumHeight);
    }

    return(
        <>
            <ResumeEditor>
                <ResumeBody resume={[exResume,setExResume]}/>
            </ResumeEditor>
            <input type={"button"} value={"Get as PDF"} onClick={showPdf}/>
            <FullModal modalType={"reportModal"} show={showReportModal} setShow={setShowReportModal}>
                {(reportUri === null || reportUri === "")?
                    <Loading/>
                    :
                    <>
                        <iframe src={reportUri}></iframe>
                        <input type={"button"} onClick={clearPdf} value={"Clear PDF"}/>
                        <input type={"button"} onClick={refreshPDF} value={"Refresh PDF "}/>
                    </>
                }
            </FullModal>
        </>
    )
}export default Resume;