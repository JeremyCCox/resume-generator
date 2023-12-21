import Experience from "./ResumeItems/Experience";
import Skills from "./ResumeItems/Skills";
import Split from "./ResumeItems/Split";
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
        fetch('http://localhost:8080/resume/getNewResume').then(res=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error("Not OK!");
            }
        }).then(res=>{
            let date = new Date().toISOString()
            elements.forEach((elem,index)=>{
                elem.position= index;
                items.push({
                    item:elem,
                    // dateCreated:date,
                    position:index,
                    itemType:elem.type,
                });
            })
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
    const listAll=()=>{
        fetch("http://localhost:8080/resume/all").then(res=>{
            console.log(res);
        })
    }

    return(
        <>
            <input type={"button"} onClick={sendResume} value={"send resume"}/>
            <input type={"button"} onClick={listAll} value={"list all"}/>
            {/*<Draggable*/}
            {/*                content={item}*/}
            {/*                startDrag={startDrag}*/}
            {/*                stopDrag={dropElement}*/}
            {/*                dragged={dragged.id===item.id}*/}
            {/*                selected={selected.id===item.id}*/}
            {/*                toggleSelect={toggleSelect}*/}
            {/*                swapElement={swapElement}*/}
            {/*                index={index}*/}
            {/*                key={index}*/}
            {/*            >*/}
            {/*                <p>{item.text} index: {index}</p>*/}
            {/*            </Draggable>*/}
            {
                Object.values(elements).map((content,index)=>{
                    switch(content.type){
                        case("experience"):
                            return(

                                <Draggable
                                    content={content}
                                    index={index}
                                    key={index}
                                    startDrag={props.startDrag}
                                    stopDrag={props.dropElem}
                                    dragged={props.dragged.id === content.id}
                                    swapElement={props.swapElem}
                                    selected={props.selected.id===content.id}
                                    toggleSelect={props.toggleSelect}
                                >
                                    <Experience
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