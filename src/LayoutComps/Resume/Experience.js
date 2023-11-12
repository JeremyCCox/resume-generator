import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useResume} from "../../ContextHooks/useResumeContext";
import Draggable from "./Draggable";

function Experience(props){
    let {content,index} = props;
    // const [height, setHeight] = props(height);

    // // const [hidden,setHidden]=useState(false)
    // const heightRef = useRef();
    // useEffect(()=>{
    //     if(heightRef.current){
    //         console.log(heightRef.current.offsetTop)
    //         let newContent = Object.assign({},content);
    //         newContent.top=heightRef.current.offsetTop;
    //         updateElement(index, newContent)
    //     }
    // },[])
    // const doDrag=(e)=>{
    //     startDrag(e);
    //     // setHidden(true);
    // }
    //
    // const undoDrag=(e)=>{
    //     stopDrag(e);
    //     // setHidden(false);
    // }

    return(
        // <Draggable >
            <div className={"experience"} >
                <h4>
                    {content.title}
                </h4>
                <h5>{content.date}</h5>
                <p>{content.description}</p>
                <ul>
                    {Object.values(content.tasks).map(task=>{
                        return(<li key={task}>{task}</li>)
                    })}
                </ul>
            </div>
        // </Draggable>

    )
}export default Experience;