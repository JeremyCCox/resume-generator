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
        <div className={"skill"} >
            <h3>{content.title}</h3>
            <ul>
                {Object.values(content.skills).map(skill=>{
                    return(<li key={skill}>{skill}</li>)
                })}
            </ul>
        </div>
    )
}export default Skills;