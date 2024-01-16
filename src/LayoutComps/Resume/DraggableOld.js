import {useEffect, useRef, useState} from "react";

function DraggableOld(props){
    let {content,index,updateElement ,selected,toggleSelect=(e)=>{},dragged,startDrag,duringDrag,stopDrag,swapElement = (e)=>{e.preventDefault()}} = props;
    const [height, setHeight] = useState();
    const [top, setTop] = useState();

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
        e.preventDefault();
        swapElement(e,index)
    }
    // useEffect(()=>{
    //     console.log("Draggable Content is:",content)
    // })
    const select=()=>{
        toggleSelect(content.id);
    }
    return(
        <div className={"draggable"} id={content.id} onClick={select} draggable={true} onDragEnd={stopDrag} onDragStart={startDrag} onDragOver={getDragInfo} ref={heightRef}>
            {content.tag!==undefined?content.tag:null}
            {dragged?<div className={"spacer "} onDragEnd={stopDrag} >{props.children}</div>:selected?<div className={"selected"}>{props.children}</div>:props.children}
            {/*{dragged?"true":"false"}*/}
            {/*{props.children}*/}
        </div>
    )
}export default DraggableOld;