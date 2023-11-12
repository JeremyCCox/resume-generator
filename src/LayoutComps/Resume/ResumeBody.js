import ResumeContent from "./ResumeContent";
import ResumeContact from "./ResumeContact";
import {useEffect, useLayoutEffect, useRef, useState} from "react";

function ResumeBody(props){
    const [resume,setResume] = props.resume;
    const [bodyHeight,setBodyHeight] = useState();

    const updateElements=(elements)=>{
        let newResume = Object.assign([],resume);
        // console.log(elements);
        newResume.content = elements;
        setResume(newResume);
    }
    const heightRef = useRef()


    useLayoutEffect(()=>{
       if(heightRef.current){
           setBodyHeight(heightRef.current.scrollHeight)
           // console.log(heightRef.current)
       }
    },[])



    return (
        <>
            <div className={"resume-body"}>
                {/*{bodyHeight}*/}
                <ResumeContact contact={resume.contact} />
                <ResumeContent elements={resume.content} bodyHeight={bodyHeight} updateElements={updateElements}/>
            </div>
        </>

    )
}export default ResumeBody;