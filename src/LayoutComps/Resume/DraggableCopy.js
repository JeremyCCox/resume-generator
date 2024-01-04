import {useEffect, useRef, useState} from "react";
import {useDraggable} from "../../ContextHooks/useDraggable";
import styled from "styled-components";




const DraggableDiv = styled.div`
  min-height: 20px;
`



function DraggableCopy(props){
    // let {content,index,updateElement ,selected,toggleSelect=(e)=>{},dragged,startDrag,duringDrag,stopDrag,swapElement = (e)=>{e.preventDefault()}} = props;
    // const [height, setHeight] = useState();
    // const [top, setTop] = useState();
    const content = props.content;
    let index = props.index;
    const draggable = useDraggable();

    const heightRef = useRef();
    // useEffect(()=>{
    //     if(heightRef.current){
    //         console.log(heightRef.current)
    //         console.log(heightRef.current.offsetTop)
    //         let newContent = Object.assign({},content);
    //         newContent.top=heightRef.current.offsetTop;
    //         setTop(heightRef.current.offsetTop)
    //         newContent.height=heightRef.current.scrollHeight;
    //         setHeight(heightRef.current.scrollHeight)
    //         // updateElement(index, newContent)
    //     }
    // },[])
    const getDragInfo=(e)=>{
        // console.log(draggable)
        e.preventDefault();
        draggable.swapElement(e,index);
    }
    // useEffect(()=>{
    //     console.log("Draggable Content is:",content)
    // })
    const select=()=>{
        // draggable.toggleSelect(content.id);
    }
    const startDrag=(e)=>{
        // console.log(draggable.startDrag(e))
        draggable.startDrag(e)
    }
    const stopDrag=(e)=>{
        // console.log(draggable.stopDrag)
        draggable.stopDrag(e);
    }
    // console.log("dragged",draggable.dragged)
    return(
        <div className={"draggable"} id={content.id} onClick={select} draggable={true} onDragEnd={stopDrag} onDragStart={startDrag} onDragOver={getDragInfo} ref={heightRef}>
            {/*{content.tag!==undefined?content.tag:null}*/}
            {/*{props.children}*/}
            {draggable.dragged.id === content.id?<div className={"spacer "} onDragEnd={draggable.stopDrag} >{props.children}</div>:draggable.dragged === content.id?<div className={"selected"}>{props.children}</div>:props.children}
            {/*{dragged?"true":"false"}*/}
            {/*{props.children}*/}
        </div>
    )
}export default DraggableCopy;