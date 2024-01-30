import {createContext, useContext, useEffect, useReducer, useState} from "react";


function dragReducer(state,action){
    switch (action.type){
        case("insert"):
            return(
                [
                    action.item,
                    ...state,

                ]
            )
        case("insertAll"):
            return(
                [
                    ...state,
                    ...action.items,
                ]
            )
        case("reset"):
            return action.items

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
            action.send({type:"insert",item:item})
            return(
                state.filter(filter=>{
                    return filter.id !== item.id;
                })
            )
        case("tag"):
            let list = Object.assign([],state);
            list[action.index].tag=action.tag
            return(
                list
            )
        default:
            return(state)

    }
}

const DraggableContext = createContext(undefined, undefined);

export const DraggableProvider=(props)=>{
    const [elements, elementDispatch] = useReducer(dragReducer,[],undefined)
    const [contentElements, contentElementDispatch]=useReducer(dragReducer,[],undefined)
    const [dragged, setDragged] = useState({id:-1});
    const [selected, setSelected] = useState({id:-1});
    const [mouseMoveEvent,setMouseMoveEvent] = useState(false);
    const [mouse, setMouse] = useState({});

    const startDrag=(e)=>{
        console.log(e.target.id)
        // if(e.target.className !== "draggable"){
        //     return;
        // }
        // let initialList = Object.assign([],elements)
        let newDragged = elements.find(({id})=> id === parseInt(e.target.id))
        // let newDragged = elements[e.target.id]
        if(newDragged !== undefined){
            // newDragged.dragged=true;
            setDragged(newDragged);
            setMouseMoveEvent(true)
            // setSelected(newDragged)
        }
    }
    useEffect(()=>{
        if(mouseMoveEvent){
            window.addEventListener('mousemove',moveElement,true)
        }
        return()=>{
            window.removeEventListener('mousemove',moveElement,true)
        }
    },[mouseMoveEvent])
    const moveElement =(e)=>{
        setMouse({x: e.clientX , y: e.clientY})
    }
    const swapElement=(e,index)=>{
        e.preventDefault()
        let dragIndex =contentElements.findIndex(({id})=> id === dragged.id);
        if(dragIndex>=0){
            let elems = Object.assign([],elements);
            elems.splice(index,0,...elems.splice(dragIndex,1))
            contentElementDispatch({type:"swap",dragIndex:dragIndex,itemIndex:index})
        }else{
            console.log("garh");
            // console.log(dragged)
        }
    }
    const stopDrag=(e)=> {
        e.preventDefault()
        // let elems = Object.assign([], newElements);
        // let dragIndex = elems.findIndex(({id}) => id === dragged.id);
        setDragged({id: -1})
        setMouseMoveEvent(false)
    }
    const addNewElement=(e)=>{
        e.preventDefault()
        if(e.type=== "dblclick"){
            if(contentElements.findIndex(({id})=> id === parseInt(e.target.id)) < 0){
                contentElementDispatch({type:"insert",item:elements[e.target.id]})
            }

        }else{
            let dragIndex = elements.findIndex(({id})=> id === dragged.id);
            if(dragIndex >= 0 && contentElements.findIndex(({id})=> id === dragged.id) < 0){
                contentElementDispatch({type:"insert",item:elements[dragIndex]})
                setMouseMoveEvent(false)
            }
        }
    }
    const deleteElement=(e)=>{
        console.log("delete"+e.target.id);
        if(e.type === "dblclick"){
            if(contentElements.findIndex(({id})=> id === parseInt(e.target.id)) >= 0){
                contentElementDispatch({type:"delete",item:elements[e.target.id]})
            }
        }else{
            let item = elements.find(({id})=>id===dragged.id);
            if(item!==undefined){
                elementDispatch({type:"delete",item:item});
            }
        }

    }
    const toggleSelect=(itemId)=>{
        console.log(itemId)
        if(selected.id===itemId){
            setSelected({id:-1})
        }else{
            setSelected(elements.find(({id})=>id===itemId))
        }
    }
    const getElements=()=>{
        return(contentElements)
    }

    return(
        <DraggableContext.Provider
            value={
                {
                    elements,
                    elementDispatch,
                    contentElements,
                    getElements,
                    dragged,
                    selected,
                    mouse,
                    startDrag,
                    swapElement,
                    stopDrag,
                    addNewElement,
                    deleteElement,
                    toggleSelect

                }
            }
        >
            {props.children}
        </DraggableContext.Provider>
    )
}

export const useDraggable=()=>{
    return useContext(DraggableContext);
}