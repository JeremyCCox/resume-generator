import styled, {createGlobalStyle} from "styled-components";
import pano from '../../static/panorama.jpg';
import pano1 from '../../static/calgaryPano.jpg'
import pano2 from '../../static/panorama.jpg'
import pano3 from '../../static/awful.jpg'
import PositionButton from "./PositionButton";
import {act} from "react-dom/test-utils";
import {useEffect, useReducer, useState} from "react";
import RequestOverlay from "./RequestOverlay";


const BackgroundStyle1 = styled.body.attrs(props=>({
    style: {
        backgroundPositionX: props.middle + "%",
    },
    // backgroundPositionX:props.middle+"%",}
}))`
  background-image: url(${pano1});
  background-repeat: no-repeat;
  background-size: cover;
`
const BackgroundStyle2 = styled.body.attrs(props=>({
    style: {
        backgroundPositionX: props.middle + "%",
    },
    // backgroundPositionX:props.middle+"%",}
}))`
  background-image: url(${pano2});
  background-repeat: repeat;
  background-size: cover;
`
const BackgroundStyle3 = styled.body.attrs(props=>({
    style: {
        backgroundPositionX: props.middle + "%",
    },
    // backgroundPositionX:props.middle+"%",}
}))`
  background-image: url(${pano3});
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
    const [adjustPos,dispatchAdjustPos] = useReducer(posReducer, 50)
    const [eventStatus,dispatchEventStatus] = useReducer(posReducer, false)
    const [repeatEvent, setRepeatEvent] = useState()
    const [displayOverlay,setDisplayOverlay]=useState(true)
    const [backgroundImage, setBackgroundImage] = useState("1")

    const handleHover=(type)=>{
        setRepeatEvent(setInterval(()=>{
            dispatchAdjustPos({type:type})
        },
            20))
    }
    const exitHover = ()=>{
        clearInterval(repeatEvent)
        // dispatchEventStatus({type:"stopEvent"})
    }
    // const handleKeyDown()



    window.addEventListener('keyup',handleKeyDown, {once:true});
    function handleKeyDown(e){
        if(e.key != 'Escape'){
            return ;
        }
        clearInterval(repeatEvent)
        setDisplayOverlay(true)
    }

    const changeBackground=(imageNum)=>{
        dispatchAdjustPos({type:"reset"})
        setBackgroundImage(imageNum);

    }
    const toggleOverlay=()=>{
        setDisplayOverlay(prevState => !prevState)
        if(displayOverlay){

        }
    }
    switch(backgroundImage){
        case("1"):
            return(
                <BackgroundStyle1 middle={adjustPos}>
                    <RequestOverlay display={displayOverlay} toggleDisplay={toggleOverlay} setBackground={changeBackground} message={"Click to unlock scroll function"}>
                        <PositionControls>
                            <PositionButton handleHover={handleHover} handleExit={exitHover} type={"decrement"}>&#8249;</PositionButton>
                            <PositionButton handleHover={handleHover} handleExit={exitHover} type={"increment"}>&#8250;</PositionButton>
                        </PositionControls>
                    </RequestOverlay>
                </BackgroundStyle1>


            )
        case("2"):
            return(
                <BackgroundStyle2 middle={adjustPos}>
                    <RequestOverlay display={displayOverlay} toggleDisplay={toggleOverlay} setBackground={setBackgroundImage} message={"Click to unlock scroll function"}>
                        <PositionControls>
                            <PositionButton handleHover={handleHover} handleExit={exitHover} type={"decrement"}>&#8249;</PositionButton>
                            <PositionButton handleHover={handleHover} handleExit={exitHover} type={"increment"}>&#8250;</PositionButton>
                        </PositionControls>
                    </RequestOverlay>
                </BackgroundStyle2>


            )
        case("3"):
            return(
                <BackgroundStyle3 middle={adjustPos}>
                    <RequestOverlay display={displayOverlay} toggleDisplay={toggleOverlay} setBackground={setBackgroundImage} message={"Click to unlock scroll function"}>
                        <PositionControls>
                            <PositionButton handleHover={handleHover} handleExit={exitHover} type={"decrementLoop"}>&#8249;</PositionButton>
                            <PositionButton handleHover={handleHover} handleExit={exitHover} type={"incrementLoop"}>&#8250;</PositionButton>
                        </PositionControls>
                    </RequestOverlay>
                </BackgroundStyle3>
            )
    }

}
export default DynamicBackground;