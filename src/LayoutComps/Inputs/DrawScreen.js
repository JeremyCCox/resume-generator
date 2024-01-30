import styled from "styled-components";
import {useCallback, useEffect, useReducer, useRef, useState} from "react";

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
const Screen = styled.div`
  height:4000px;    
`

const pointReducer= (state,action)=>{
    switch (action.type){
        case("add"):
            return[...state,action.point]
    }
}
function DrawScreen(){
    const [points, pointDispatch] = useReducer(pointReducer, [], undefined);
    const [mouseDown, setMouseDown] = useState(false)
    const [draw, toggleDraw] = useState(true)
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
    })

    useEffect(()=>{
        if(mouseDown){
            window.addEventListener("mousemove", drawPixel)
        }
        return()=> {
            window.removeEventListener("mousemove", drawPixel)
        }
    },[mouseDown])
    return(
        <Screen ref={canvasRef} onMouseDown={()=>setMouseDown(true)} onMouseUp={()=>setMouseDown(false)} >
            {Object.values(points).map(point=>{
                return(<Point top={point[0]} left={point[1]}/>)
            })}
        </Screen>
    )
}export default DrawScreen;

