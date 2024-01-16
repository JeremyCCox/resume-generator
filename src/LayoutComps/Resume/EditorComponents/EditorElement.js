import Draggable from "../DraggableOld";
import {useEffect} from "react";
import Selectable from "../Selectable";

function EditorElement(props){

    // console.log("content",props.content)
    return(

            <Selectable
                key={props.index}
                content={props.content}
                index={props.index}
                startDrag={props.startDrag}
                stopDrag={props.dropElem}
                dragged={props.content.dragged!==undefined?props.content.dragged:false}
                selected={props.selected.id===props.content.id}
                toggleSelect={props.toggleSelect}
            >
                <div className={"editor-title"} key={props.index}>
                    <h4>{props.content.title}</h4>
                </div>
            </Selectable>

        )
}export default EditorElement;