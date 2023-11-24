import Experience from "./Experience";
import Skills from "./Skills";
import Split from "./Split";
import {useEffect, useRef, useState} from "react";
import {useResume} from "../../ContextHooks/useResumeContext";
import Marker from "../Marker";
import Draggable from "./Draggable";
import draggable from "./Draggable";
import content from "../Content";


function ResumeContent(props){
    const {elements} = props;

    const sendResume=()=>{
        let items = []
        elements.forEach((elem,index)=>{
             items.push({
                item:elem,
                // dateCreated:date,
                position:index,
                itemType:elem.type,
            });
        })
        fetch('http://localhost:8080/resume/getNewResume').then(res=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error("Not OK!");
            }
        }).then(res=>{
            let date = new Date().toISOString()
            let newContent = {
                resumeItems:items,
                dateCreated:date,
            }
            // console.log(newContent);
            newContent.id=res.id;
            fetch('http://localhost:8080/resume/resumes',{
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
        }).catch(err=>{
            console.log(err);
        })

    }
    return(
        <>
            <input type={"button"} onClick={sendResume}/>
            {
                Object.values(elements).map((content,index)=>{
                    console.log(content);
                    switch(content.type){
                        case("experience"):
                            console.log(content)
                            return(
                                <Draggable
                                    content={content}
                                    index={index}
                                    key={index}
                                    startDrag={props.startDrag}
                                    stopDrag={props.dropElem}
                                    dragged={content.dragged!==undefined?content.dragged:false}
                                    swapElement={props.swapElem}
                                >
                                    <Experience
                                        key={index}
                                        content={content}
                                    />
                                </Draggable>
                            )
                            break;
                        case("skills"):
                            return(
                                <Draggable
                                    content={content}
                                    index={index}
                                    key={index}
                                    startDrag={props.startDrag}
                                    stopDrag={props.dropElem}
                                    dragged={content.dragged!==undefined?content.dragged:false}
                                    swapElement={props.swapElem}
                                >
                                    <Skills
                                        key={index}
                                        content={content}
                                    />
                                </Draggable>

                            )
                            break;
                        case("split"):
                            return(
                                <Split
                                    index={index}
                                    key={index}
                                    updateElement={updateElement}
                                    startDrag={props.startDrag}
                                    stopDrag={props.stopDrag}
                                    content={content}
                                />
                            )
                            break;
                    }
                })}
        </>
    )
}export default ResumeContent;