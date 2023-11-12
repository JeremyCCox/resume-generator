import {useEffect, useRef} from "react";

function Skills(props){
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
        <div className={"skill"} id={index} draggable={true} onDragEnd={stopDrag} onDrag={startDrag} >
            <h3>{content.title}</h3>
            <ul>
                {Object.values(content.skills).map(skill=>{
                    return(<li>{skill}</li>)
                })}
            </ul>
        </div>
    )
}export default Skills;