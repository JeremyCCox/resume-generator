// import Draggable from "./Resume/DraggableOld";
import Draggable from "../Draggable/Draggable";
import {useCallback, useEffect, useReducer, useRef, useState} from "react";
import {useDraggable} from "../Draggable/useDraggable";
import styled from "styled-components";
import PhotoSelect from "./Inputs/PhotoSelect";
import MapDisplay from "./Inputs/MapDisplay";

function Dev(){
    const draggable = useDraggable()
    console.log(draggable.contentElements)

    return(
        <>
            <MapDisplay/>
        </>
    )
}export default Dev;