import ResumeBody from "../ResumeBody";
import {useEffect, useReducer, useState} from "react";
import ResumeContent from "../ResumeContent";
import EditorElement from "./EditorElement";
import EditorPanel from "./EditorPanel";
import Draggable from "../DraggableOld";
import Selectable from "../Selectable";
import content from "../../Content";


function listReducer(state,action){
    switch (action.type){
        case("insert"):
            return(
                [
                    ...state,
                    action.item
                ]
            )
        case ("delete"):
            return(

                state.filter(item=>{
                    return item.id !== action.item.id;
                })
            )
        case ("swap"):
            let newState = Object.assign([],state);
            newState.splice(action.itemIndex,0,...newState.splice(action.dragIndex,1))
            return(
                newState
            )
        case("move"):
            let item = Object.assign({},state[action.index]);
            console.log(item)
            action.send({type:"insert",item:item})
            return(
                state.filter(filter=>{
                    return filter.id !== item.id;
                })
            )
        case("tag"):
            console.log(action)
            let list = Object.assign([],state);
            list[action.index].tag=action.tag
            console.log(list)
            return(
                list
            )

        default:

    }
}

function ResumeEditor(props){
    const [resume, setResume] = props.resume;
    // const [newElements, setNewElements] = useState(Object.assign([],resume.content))
    const [newElements, setNewElements] = useState([{id:1,text:"text1"},{id:2,text:"text2"}])
    // const [sideElements, setSideElements] = useState([{id:3,text:"text3"},{id:4,text:"text4"}]);
    const [dragged, setDragged] = useState({id:0});

    const [selected, setSelected] = useState({id:0});

    const [elements,elementDispatch] = useReducer(listReducer, []);
    // const [elements,elementDispatch] = useReducer(listReducer, resume.content);
    // const [sideElements,sideElementDispatch] = useReducer(listReducer, [{id:1,text:"text1"},{id:2,text:"text2"},{id:3,text:"text3"},{id:4,text:"text4"},{id:5,text:"text5"}]);
    const [sideElements,sideElementDispatch] = useReducer(listReducer, resume.content);



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
        let initialList = Object.assign([],elements)
        let newDragged = initialList.find(({id})=> id === parseInt(e.target.id))
        if(newDragged !== undefined){
            // newDragged.dragged=true;
            setDragged(newDragged);
            setSelected(newDragged)
        }
    }

    const startAdd=(e)=>{
        console.log(e)
        if(e.target.className !== "draggable"){
            return;
        }
        let initialList = Object.assign([],sideElements)
        let newDragged = initialList.find(({id})=> id === parseInt(e.target.id))
        console.log(newDragged)
        if(newDragged !== undefined){
            // newDragged.dragged=true;
            setDragged(newDragged);
            setSelected(newDragged)
        }
    }
    const swapElement=(e,index)=>{
        // console.log("index",index)
        e.preventDefault()
        let dragIndex =elements.findIndex(({id})=> id === dragged.id);
        // console.log("dragIndex",dragIndex)
        if(dragIndex>=0){
            let elems = Object.assign([],elements);
                elems.splice(index,0,...elems.splice(dragIndex,1))
            elementDispatch({type:"swap",dragIndex:dragIndex,itemIndex:index})
        }else{
            // let elems = Object.assign([],elements);
            console.log("garh");
            // elementDispatch({type:"insert",item:elems[dragIndex]});
        }
        // if(dragIndex>=0){
        //     let elems = Object.assign([],elements);
        //     elems.splice(index,0,...elems.splice(dragIndex,1))
        //     if(index === dragIndex){
        //
        //         setNewElements(elems)
        //         return;
        //     }
        //     // console.log(dragged)
        //     setNewElements(elems)
        // }else{
        //     console.log("swappin ")
        //     let sideIndex =sideElements.findIndex(({id})=> id === dragged.id);
        //     let elems = Object.assign([],newElements);
        //     let newSide = Object.assign([],sideElements);
        //     setNewElements(elems)
        //     elems.splice(index,0,...newSide.splice(sideIndex,1))
        //     setSideElements(newSide);
        // }

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
        console.log("Dropped")
        console.log(e)
        e.preventDefault()
        let elems = Object.assign([],newElements);
        let dragIndex = elems.findIndex(({id})=>id=== dragged.id);
        setDragged({id:0})
        // if(dragIndex >= 0){
        //     // elems[dragIndex].dragged=undefined;
        //     // console.log(elems[dragIndex]);
        //     // updateElements(elems)
        //     // let newSide = Object.assign([],sideElements);
        //
        // }else{
        //     let newSide = Object.assign([],sideElements);
        //     let sideIndex = sideElements.findIndex(({id}) => id===dragged.id);
        //     // newSide[sideIndex].dragged=undefined;
        //     setSideElements(newSide)
        //     setSideElements(prevSideElements=> prevSideElements.filter(element=>{
        //         return element.id !== dragged.id;
        //     }))
        //     // updateElements(elems)
        // }

    }
    const addNewElement=(e)=>{
        e.preventDefault()
        let dragIndex =sideElements.findIndex(({id})=> id === dragged.id);
        if(dragIndex >= 0){
            if(elements.findIndex(({id})=> id === dragged.id) < 0){
                elementDispatch({type:"insert",item:sideElements[dragIndex]})
                // sideElementDispatch({type:"move",index:dragIndex,send:elementDispatch})
            }else{
                // sideElementDispatch({type:"delete",item:sideElements[dragIndex]})
            }
            // sideElementDispatch({type:"delete",index:dragIndex})
            // sideElementDispatch({type:"move",index:dragIndex,send:elementDispatch})

            // let elems = Object.assign([],newElements);
            // elems.splice(0,0,...newSide.splice(dragIndex,1))
            // setNewElements(prevNewElement => [...prevNewElement , newSide[dragIndex]]);
            // setSideElements(prevSideElements=> prevSideElements.filter(element=>{
            //     return element.id !== dragged.id;
            // }))
            // setSideElements(newSide);
            // setNewElements(elems)
        }else{
            console.log("Running here?")
        }
    }
    const sideHover=(e)=>{
        e.preventDefault()
        let dragIndex =elements.findIndex(({id})=> id === dragged.id);
        if(dragIndex >= 0){
            console.log("marking for delete")
            // elementDispatch({type:"tag",tag:"remove",index:dragIndex})
            // let newSide = Object.assign([],sideElements);
            // sideElementDispatch({type:"insert",dragIndex:dragIndex,itemIndex:index})
            // elementDispatch({type:"delete",item:dragged})
            // setSideElements(prevSideElement => [...prevSideElement , elems[dragIndex]]);
            // setNewElements(prevNewElements=> prevNewElements.filter(element=>{
            //     return element.id !== dragged.id;
            // }))
        }else{
        }

        // console.log(dragged)
        // setNewElements(elems)
        // props.updateElements(elems)
    }
    const deleteElement=(e)=>{
        console.log(e);
        let item = elements.find(({id})=>id===dragged.id);
        if(item!==undefined){
            elementDispatch({type:"delete",item:item});
        }
    }
    const createElement=()=>{
        return new Promise(resolve => {
            fetch("http://localhost:8080/resume/getNewExperience",{
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
    const toggleSelect=(itemId)=>{
        console.log(itemId)
        if(selected.id===itemId){
            setSelected({id:0})
        }else{
            setSelected(sideElements.find(({id})=>id===itemId))
        }
    }
    const list1 =[{id:1,text:"text1"},{id:2,text:"text2"}]
    const list2 =[{id:3,text:"text3"},{id:4,text:"text4"}]

    return(
        <div className={"resume-editor"}>
            {/*<div className={"editor-panel"} onDrop={deleteElement}>*/}
            {/*    <p>{elements.length} {sideElements.length}</p>*/}
            {/*    {Object.values(sideElements).map((item,index)=>{*/}
            {/*        return(*/}
            {/*            <Selectable*/}
            {/*                content={{id:item.id}}*/}
            {/*                startDrag={startAdd}*/}
            {/*                stopDrag={dropElement}*/}
            {/*                swapElement={sideHover}*/}
            {/*                index={index}*/}
            {/*                key={index}*/}
            {/*                selected={selected.id===item.id}*/}
            {/*                toggleSelect={toggleSelect}*/}
            {/*            >*/}
            {/*                <p>{item.text} index: {index}</p>*/}
            {/*            </Selectable>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</div>*/}
                <EditorPanel
                    sideHover={sideHover}
                    panelDrop={deleteElement}
                    updateElements={updateElements}
                    dropElem={dropElement}
                    startDrag={startAdd}
                    elements={sideElements}
                    createElement={createElement}
                    selected={selected}
                    toggleSelect={toggleSelect}
                />
            {/*<div className={"resume-body"} onDragOver={addNewElement} >*/}
            {/*    {Object.values(elements).map((item,index)=>{*/}
            {/*        return(*/}
            {/*            <Draggable*/}
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
            {/*        )*/}
            {/*    })}*/}

            {/*</div>*/}

            <ResumeBody
                resume={props.resume}
                updateElements={updateElements}
                dropElement={dropElement}
                swapElement={swapElement}
                startDrag={startDrag}
                dragged={dragged}
                elements={elements}
                addElement={addNewElement}
                selected={selected}
                toggleSelect={toggleSelect}
            />

            {/*    <EditorPanel*/}
            {/*        sideHover={sideHover}*/}
            {/*        dropElement={dropElement}*/}
            {/*        updateElements={updateElements}*/}
            {/*        dropElem={dropElement}*/}
            {/*        startDrag={startAdd}*/}
            {/*        elements={[sideElements,setSideElements]}*/}
            {/*        createElement={createElement}*/}
            {/*    />*/}
            {/*<ResumeBody*/}
            {/*    resume={props.resume}*/}
            {/*    updateElements={updateElements}*/}
            {/*    dropElement={dropElement}*/}
            {/*    swapElement={swapElement}*/}
            {/*    startDrag={startDrag}*/}
            {/*    dragged={dragged}*/}
            {/*    elements={newElements}*/}
            {/*    addElement={addNewElement}*/}
            {/*/>*/}
        </div>
    )
}export default ResumeEditor;