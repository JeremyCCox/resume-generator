import {useEffect, useRef} from "react";
import ResumeContent from "../ResumeContent";

function Split(props){

    let {content,index,updateElement,startDrag,stopDrag} = props;

    const heightRef = useRef();
    useEffect(()=>{
        if(heightRef.current){
            console.log(heightRef.current.offsetTop)
            let newContent = Object.assign({},content);
            newContent.top=heightRef.current.offsetTop;
            updateElement(index, newContent)
        }
    },[])

    return(
        <div className={"content-split"} id={index} draggable={true} onDragEnd={stopDrag} onDrag={startDrag} >
            <ResumeContent elements={content.content}/>
        </div>
        )
}export default Split;