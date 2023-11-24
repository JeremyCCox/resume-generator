import Draggable from "./Draggable";
import {useEffect} from "react";

function EditorElement(props){

    // console.log("content",props.content)
    return(

            <Draggable
                key={props.index}
                content={props.content}
                index={props.index}
                startDrag={props.startDrag}
                stopDrag={props.dropElem}
                dragged={props.content.dragged!==undefined?props.content.dragged:false}
            >
                <div key={props.content.id} className={"editor-title"}>
                    <h4>{props.content.title}</h4>
                </div>
            </Draggable>

        )
}export default EditorElement;