import ResumeBody from "./ResumeBody";
import {useEffect, useState} from "react";
import ResumeContent from "./ResumeContent";
import EditorElement from "./EditorElement";
import EditorPanel from "./EditorPanel";

function ResumeEditor(props){
    const [resume, setResume] = props.resume;
    const [newElements, setNewElements] = useState(Object.assign([],resume.content))
    const [sideElements, setSideElements] = useState([]);
    const [dragged, setDragged] = useState();
    const updateElements=(elements)=>{
        let newResume = Object.assign([],resume);
        // console.log(elements);
        newResume.content = elements;
        setResume(newResume);
    }
    const updateElement=(index, value)=>{
        newElements[index] = value;
        updateElements(newElements)
    }
    const startDrag=(e)=>{
        console.log(e)
        if(e.target.className !== "draggable"){
            return;
        }
        let initialList = Object.assign([],newElements)
        let newDragged = initialList.find(({id})=> id === parseInt(e.target.id))
        console.log(newDragged);
        if(newDragged !== undefined){
            let draggedIndex = initialList.indexOf(newDragged);
            newDragged.dragged=true;
            setDragged(newDragged);
            initialList[draggedIndex]=newDragged;
            setNewElements(initialList)
        }
    }
    // useEffect(()=>{
    //     console.log(dragged)
    // },[dragged])
    const startAdd=(e)=>{
        console.log(e)
        if(e.target.className !== "draggable"){
            return;
        }
        let initialList = Object.assign([],sideElements)
        console.log(initialList)
        let newDragged = initialList.find(({id})=> id === parseInt(e.target.id))
        console.log(newDragged !== undefined);
        if(newDragged !== undefined){
            let draggedIndex = initialList.indexOf(newDragged);
            initialList[draggedIndex].dragged=true;
            setDragged(initialList[draggedIndex]);
            setSideElements(initialList);
        }
    }
    const swapElement=(e,index)=>{
        // console.log("index",index)
        e.preventDefault()
        let dragIndex =newElements.findIndex(({id})=> id === dragged.id);
        // console.log("dragIndex",dragIndex)
        if(dragIndex>=0){
            let elems = Object.assign([],newElements);
            elems.splice(index,0,...elems.splice(dragIndex,1))
            if(index === dragIndex){
                setNewElements(elems)
                return;
            }
            // console.log(dragged)
            setNewElements(elems)
        }else{
            console.log("swappin ")
            let sideIndex =sideElements.findIndex(({id})=> id === dragged.id);
            let elems = Object.assign([],newElements);
            let newSide = Object.assign([],sideElements);
            setNewElements(elems)
            elems.splice(index,0,...newSide.splice(sideIndex,1))
            setSideElements(newSide);
            // console.log(sideElements);
            setNewElements(elems)
            // console.log(elems)
        }

        // props.updateElements(elems)
    }
    const addElement=(e,index)=>{
        // e.preventDefault()
        // console.log("Add Index",index)
        // let dragIndex =newElements.findIndex(({id})=> id === dragged.id);
        // console.log("dragIndex",dragIndex)
        // let elems = Object.assign([],newElements);
        // if(dragIndex < 0){
        //     // elems.splice(index,0,dragged)
        //     // setNewElements(elems)
        // }
        // if(index === dragIndex){
        //     setNewElements(elems)
        //     return;
        // }
        // console.log(elems)
        // // setNewElements(elems)


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
        e.preventDefault()
        let elems = Object.assign([],newElements);
        let dragIndex = elems.findIndex(({id})=>id=== dragged.id);
        if(dragIndex >= 0){
            elems[dragIndex].dragged=undefined;
            // console.log(elems[dragIndex]);
            updateElements(elems)
        }else{
            let newSide = Object.assign([],sideElements);
            let sideIndex = sideElements.findIndex(({id}) => id===dragged.id);
            newSide[sideIndex].dragged=undefined;
            setSideElements(newSide)
            // updateElements(elems)
        }

    }
    const addNewElement=(e)=>{
        // console.log("Hovering over me")
        e.preventDefault()
        let newSide = Object.assign([],sideElements);
        let dragIndex =newSide.findIndex(({id})=> id === dragged.id);
        // console.log("drag index is",dragIndex)
        if(dragIndex >= 0){
            let elems = Object.assign([],newElements);
            elems.splice(0,0,...newSide.splice(dragIndex,1))
            setSideElements(newSide);
            setNewElements(elems)
        }
    }
    const sideHover=(e)=>{
        e.preventDefault()
        let elems = Object.assign([],newElements);
        let dragIndex =elems.findIndex(({id})=> id === dragged.id);
        // console.log("add drag index",dragIndex)
        let newSide = Object.assign([],sideElements);
        if(dragIndex >= 0){
            // let newSide = Object.assign([],sideElements);
            newSide= [...newSide,...elems.splice(dragIndex,1)]
            setSideElements(newSide);
            setNewElements(elems)
        }

        // console.log(dragged)
        // setNewElements(elems)
        // props.updateElements(elems)
    }
    const createElement=()=>{
        return new Promise(resolve => {
            fetch("http://localhost:8080/resume/getNewItem",{
                method:"get",
            }).then(res=>{
                if(res.ok){
                    resolve(res.json())
                }else{
                    throw new Error("Not OK!")
                }

            }).catch(er=>{
                console.log(er);
            })
        })
    }


    return(
        <div className={"resume-editor"}>
                <EditorPanel
                    sideHover={sideHover}
                    dropElement={dropElement}
                    updateElements={updateElements}
                    dropElem={dropElement}
                    startDrag={startAdd}
                    dragged={dragged}
                    elements={[sideElements,setSideElements]}
                    createElement={createElement}
                />
            <ResumeBody

                resume={props.resume}
                updateElements={updateElements}
                dropElement={dropElement}
                swapElement={swapElement}
                startDrag={startDrag}
                dragged={dragged}
                elements={newElements}
                addElement={addNewElement}
            />
        </div>
    )
}export default ResumeEditor;