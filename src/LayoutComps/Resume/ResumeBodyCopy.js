import ResumeContent from "./ResumeContent";
import ResumeContact from "./ResumeContact";
import {useEffect, useLayoutEffect, useRef, useState} from "react";

function ResumeBodyCopy(props){
    const [resume,setResume] = props.resume;
    const [bodyHeight,setBodyHeight] = useState();

    const updateElements=(elements)=>{
        let newResume = Object.assign([],resume);
        // console.log(elements);
        newResume.content = elements;
        setResume(newResume);
    }
    const heightRef = useRef()





    return (
        <>
            <div className={"resume-body"} onDragOver={props.addElement}>
                {/*{bodyHeight}*/}
                <ResumeContact contact={resume.contact} />
                <ResumeContent
                    updateElements={props.updateElements}
                    dropElem={props.dropElement}
                    swapElem={props.swapElement}
                    startDrag={props.startDrag}
                    dragged={props.dragged}
                    elements={props.elements}
                    selected={props.selected}
                    toggleSelect={props.toggleSelect}

                />
            </div>
        </>

    )
}export default ResumeBodyCopy;