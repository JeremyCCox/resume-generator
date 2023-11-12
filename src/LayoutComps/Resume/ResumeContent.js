import Experience from "./Experience";
import Skills from "./Skills";
import Split from "./Split";
import {useEffect, useRef, useState} from "react";
import {useResume} from "../../ContextHooks/useResumeContext";
import Marker from "../Marker";
import Draggable from "./Draggable";
import draggable from "./Draggable";


function ResumeContent(props){
    const {elements, bodyHeight} = props;
    const [newElements, setNewElements] = useState(Object.assign([],elements))
    const [dragged, setDragged] = useState();
    const [dragX, setDragX]=useState();
    const [dragY, setDragY]=useState();
    const [targetHeight, setTargetHeight]=useState();
    const updateElement=(index, value)=>{
        newElements[index] = value;
        props.updateElements(newElements)
    }
    const startDrag=(e)=>{
        // console.log(e);
        if(e.target.className !== "draggable"){
            return;
        }
        let initialList = Object.assign([],newElements)
        let newDragged = initialList.find(({id})=> id === parseInt(e.target.id))
        if(newDragged !== undefined){
            let draggedIndex = initialList.indexOf(newDragged);
            newDragged.dragged=true;
            setDragged(newDragged);
            // setTargetHeight(newDragged.height)
            initialList[draggedIndex]=newDragged;
            // setNewElements(initialList);
        }

    }
    const swapElement=(e,index)=>{
        e.preventDefault()
        let dragIndex =elements.findIndex(({id})=> id === dragged.id);
        let elems = Object.assign([],elements);
        elems.splice(index,0,...elems.splice(dragIndex,1))
        if(index === dragIndex){
            setNewElements(elems)
            return;
        }
        // console.log(dragged)
        setNewElements(elems)
        // props.updateElements(elems)
    }
    const sortElements=(elements)=>{
        elements.sort((a, b)=>{
            if((a.top) > b.top){
                return 1
            }
            if((a.top) < (b.top)){
                return -1
            }
            if((a.top) === (b.top)){
                return 1
            }
        })
        return elements
    }
    const dropElement=(e)=>{
        let elems = Object.assign([],newElements);
        let dragIndex = elems.findIndex(({id})=>id=== dragged.id);
        elems[dragIndex].dragged=undefined;
        // console.log(elems[dragIndex]);
        props.updateElements(elems)
    }
    return(
        <>
            <div>
                <div className={"dropArea"} >
                    {
                        Object.values(newElements).map((content,index)=>{
                            switch(content.type){
                                case("experience"):
                                    // console.log(content)
                                    return(
                                        <>
                                            {/*<Marker/>*/}
                                            <Draggable
                                                content={content}
                                                index={index}
                                                updateElement={updateElement}
                                                startDrag={startDrag}
                                                stopDrag={dropElement}
                                                dragged={content.dragged!==undefined?content.dragged:false}
                                                swapElement={swapElement}
                                            >
                                                <Experience
                                                    content={content}
                                                />
                                            </Draggable>

                                        </>

                                    )
                                    break;
                                case("skills"):
                                    return(
                                        <Skills
                                            content={content}
                                            index={index}
                                            updateElement={updateElement}
                                            startDrag={dragElement}
                                            stopDrag={dropElement}

                                        />
                                    )
                                    break;
                                case("split"):
                                    return(
                                        <Split
                                            index={index}
                                            updateElement={updateElement}
                                            startDrag={dragElement}
                                            stopDrag={dropElement}
                                            content={content}
                                        />
                                    )
                                    break;

                            }
                        })}
                </div>
            </div>
        </>
    )
}export default ResumeContent;