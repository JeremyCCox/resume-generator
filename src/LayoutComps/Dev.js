// import Draggable from "./Resume/DraggableOld";
import Draggable from "../Draggable/Draggable";
import {useCallback, useEffect, useReducer, useRef, useState} from "react";
import {useDraggable} from "../Draggable/useDraggable";
import styled from "styled-components";
function reducer(state,action){
    if(action.type === 'add'){
        return(
            [
                ...state,
                {id:state.length},
                ]
        )

    }
    if(action.type === 'delete'){
        return(
            state.filter(item=>{
                return item.id !== action.item.id;
            })
        )
    }
}
const Point = styled.div.attrs($props=>({
    style:{
        top: $props.top+"px",
        left: $props.left+"px",
    }
}))`
  height: 4px;
  width: 4px;
  position: absolute;
  background-color: green;
`


const pointReducer= (state,action)=>{
    switch (action.type){
        case("add"):
            return[...state,action.point]
    }
}
function Dev(){
    const [points, pointDispatch] = useReducer(pointReducer, [], undefined);
    const [mouseDown, setMouseDown] = useState(false)
    const [draw, toggleDraw] = useState(false)
    const canvasRef = useRef()
    const [maxTop,setMaxTop] = useState(0);
    const [maxBottom,setMaxBottom] = useState(0);
    const [maxLeft,setMaxLeft] = useState(0);
    const [maxRight,setMaxRight] = useState(0);
    useEffect(()=>{
        setMaxTop(canvasRef.current.offsetTop)
        setMaxBottom(canvasRef.current.offsetTop+canvasRef.current.offsetHeight)
        setMaxLeft(canvasRef.current.offsetLeft)
        setMaxRight(canvasRef.current.offsetLeft + canvasRef.current.offsetWidth)
    },[canvasRef])
    const drawPixel=useCallback((e)=>{
        if(e.pageX > maxLeft && e.pageX < maxRight && e.pageY > maxTop && e.pageY < maxBottom){
            pointDispatch({type:"add",point:[e.pageY,e.pageX]})
        }
    },[draw])

    useEffect(()=>{
        if(draw){
            window.addEventListener("mousedown", ()=>setMouseDown(true))
            window.addEventListener("mouseup",()=>setMouseDown(false))

        }
        return()=>{
            window.removeEventListener('mousedown', ()=>setMouseDown(true))
            window.removeEventListener("mouseup",()=>setMouseDown(false))
        }
    },[draw])
    useEffect(()=>{
        if(mouseDown){
            window.addEventListener("mousemove", drawPixel)
        }
        return()=> {
            window.removeEventListener("mousemove", drawPixel)
        }
    },[mouseDown])

    return(
        <>
            {Object.values(points).map(point=>{
                return(<Point top={point[0]} left={point[1]}/>)
            })}
            <DevDiv ref={canvasRef} onMouseEnter={()=>toggleDraw(true)} onMouseLeave={()=>toggleDraw(false)}>
            </DevDiv>
        </>
    )
}export default Dev;
const DevDiv = styled.div`
  height: 2000px;    
  z-index: 1;
`