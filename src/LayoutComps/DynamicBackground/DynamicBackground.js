import styled, {createGlobalStyle} from "styled-components";
import pano from '../../static/panorama.jpg';
import pano1 from '../../static/calgaryPano.jpg'
import pano2 from '../../static/panorama.jpg'
import pano3 from '../../static/awful.jpg'
import PositionButton from "./PositionButton";
import {act} from "react-dom/test-utils";
import {useEffect, useReducer, useRef, useState} from "react";
import RequestOverlay from "./RequestOverlay";
import {all} from "axios";


const BackgroundStyle = styled.div.attrs(props=>({
    style: {
        backgroundPositionX: props.middle + "%",
    },
}))`
  background-image: url(${props=> props.image}); // Reads prop from BackgroundStyle Component, Image is passed from array of imported images.
  background-repeat: repeat;
  background-size: cover;
`
const PositionControls = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
function posReducer(state,action){
    switch (action.type){
        case("increment"):

            if(state <= 99 && state >= 0){
                return (state +.8)
            }
            if(state > 100 || state < 0 ){
                return 0
            }
            return 100

        case("decrement"):
            if(state >= 1 && state <= 100){
                return (state -.8)
            }
            if(state > 100 || state < 0 ){
                return 100
            }
            return 0
        case("incrementLoop"):
            return (state +.8)
        case("decrementLoop"):
            return (state -.8)
        case("scroll"):
            if(state+ action.speed <= 100 && state+ action.speed >= 0){
                return(state + action.speed)
            }
            if(state+ action.speed >= 100){
                return 100
            }
            if(state+ action.speed < 0){
                return 0
            }
            return 50
        case("scrollLoop"):
            return(state + action.speed)
        case("drag"):
            if(state+ action.speed <= 100 && state+ action.speed >= 0){
                return(state + action.speed)
            }
            if(state+ action.speed >= 100){
                return 100
            }
            if(state+ action.speed < 0){
                return 0
            }
            return 50
        case("dragLoop"):
            return (state +action.speed)
        case("reset"):
            return 50
        case("stopEvent"):
            return false;
        case("startEvent"):
            return true;
    }
}

function DynamicBackground(){
    // const [adjustPos,dispatchAdjustPos] = useReducer(posReducer, 50)
    const [adjustPos,dispatchAdjustPos] = useReducer(posReducer, 50); // useReducer -> Easier way to do repetitive state processes. https://react.dev/reference/react/useReducer
    const [dragStart,setDragStart] = useState();
    const [repeatEvent, setRepeatEvent] = useState() // Initializes as undefined (as to not run constantly)
    const [displayOverlay,setDisplayOverlay]=useState(true)
    const [backgroundImage, setBackgroundImage] = useState("1")
    const [allowLoop,setAllowLoop]=useState("")
    const backgroundRef = useRef()
    const [mouseMoveEvent,setMouseMoveEvent] = useState(false);

    window.addEventListener('keyup',handleKeyDown, {once:true});
    function handleKeyDown(e){
        if(e.key !== 'Escape'){
            return ;
        }
        clearInterval(repeatEvent)
        setDisplayOverlay(true)
        setMouseMoveEvent(false)
    }

    const handleHover=(type)=>{
        setRepeatEvent(setInterval(()=>{
            dispatchAdjustPos({type:type})
        },
            20))
    }
    const exitHover = ()=>{
        clearInterval(repeatEvent)
    }

    const scrollPage=(e)=>{
        dispatchAdjustPos({type:"scroll"+allowLoop,speed:e.deltaY/100})
    }


    const startDragPage=(e)=>{
        setDragStart({x:e.clientX,y:e.clientY})
        setMouseMoveEvent(true)
    }

    const dragPage=(e)=>{
        let num = Math.abs(e.clientX-dragStart.x)
        if(e.clientX-dragStart.x < 0){
            dispatchAdjustPos({type:"drag"+allowLoop,speed:-1*num/dragStart.x})
        }else{
            dispatchAdjustPos({type:"drag"+allowLoop,speed:num/dragStart.x})
        }
        // console.log(Math.log10(e.clientY-dragStart.y))
    }

    const stopDragPage=()=>{
        // clearInterval(repeatEvent)
        setMouseMoveEvent(false)
    }
    const changeBackground=(imageNum)=>{+
        setBackgroundImage(imageNum)
        if(imageNum==="3"){
            setAllowLoop("Loop")
        }else{
            setAllowLoop("")
        }

    }
    const toggleOverlay=()=>{
        setDisplayOverlay(prevState => !prevState)
    }

    useEffect(()=>{
        dispatchAdjustPos({type:"reset"})
    },[backgroundImage])

    useEffect(()=>{
        if(mouseMoveEvent){
            window.addEventListener('mousemove',dragPage,true)
        }
        return()=>{
            window.removeEventListener('mousemove',dragPage,true)
        }
    },[mouseMoveEvent])

    let images = [pano,pano1,pano2,pano3]
    return(

        <BackgroundStyle middle={adjustPos} image={images[backgroundImage]} ref={backgroundRef} >
            <RequestOverlay display={displayOverlay} toggleDisplay={toggleOverlay} mouseMoving={mouseMoveEvent} setBackground={changeBackground} message={"Click to unlock scroll function"}>
                <PositionControls onWheel={scrollPage} onMouseDown={startDragPage} onMouseUp={stopDragPage} >
                    <PositionButton handleHover={handleHover} handleExit={exitHover} type={"decrement"+allowLoop}>&#8249;</PositionButton>
                    <PositionButton handleHover={handleHover} handleExit={exitHover} type={"increment"+allowLoop}>&#8250;</PositionButton>
                </PositionControls>
            </RequestOverlay>
        </BackgroundStyle>
    )


}
export default DynamicBackground;