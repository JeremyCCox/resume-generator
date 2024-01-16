import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useResume} from "../../../ContextHooks/useResumeContext";
import Draggable from "../DraggableOld";
import axios from "axios";

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
    const sendExperience=()=>{
        // axios.get("http://localhost:8080/resume/string",(req,res)=>{
        //     res.header("Access-Control-Allow-Origin","*")
        // }).then(res=>{
        //     console.log(res);
        // }).catch(err=>{
        //     console.log(err);
        // })
        console.log(content);
        let date = new Date().toISOString();
        let newContent = {
            item:content,
            // dateCreated:date,
            position:1,
            itemType:"experience",
        }
        fetch('http://localhost:8080/resume/experience',{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                // "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify(newContent)
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err);
        })
    }

    return(
        // <Draggable >
            <div className={"experience"} >
                <h4>
                    {content.title}
                </h4>
                <h5>{content.date}</h5>
                <p>{content.description}</p>
                <ul>
                    {Object.values(content.items).map(item=>{
                        return(<li key={item.description}>{item.description}</li>)
                    })}
                </ul>
                {/*<input type={"button"} onClick={sendExperience}/>*/}
            </div>
        // </Draggable>

    )
}export default Experience;