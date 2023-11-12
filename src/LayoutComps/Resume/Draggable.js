import {useEffect, useRef, useState} from "react";

function Draggable(props){
    let {content,index,updateElement ,dragged,startDrag,duringDrag,stopDrag,swapElement} = props;
    const [height, setHeight] = useState();
    const [top, setTop] = useState();

    const heightRef = useRef();
    useEffect(()=>{
        if(heightRef.current){
            console.log(heightRef.current)
            console.log(heightRef.current.offsetTop)
            let newContent = Object.assign({},content);
            newContent.top=heightRef.current.offsetTop;
            setTop(heightRef.current.offsetTop)
            newContent.height=heightRef.current.scrollHeight;
            setHeight(heightRef.current.scrollHeight)
            // updateElement(index, newContent)
        }
    },[])

    const getDragInfo=(e)=>{
        e.preventDefault();
        swapElement(e,index)
    }
    return(
        <div className={"draggable"} id={content.id} draggable={true} onDragEnd={stopDrag} onDragStart={startDrag} onDragOver={getDragInfo} key={index} ref={heightRef}>
            {dragged?<div className={"spacer"} onDrop={stopDrag}>{props.children}</div>:props.children}
            {/*{dragged?"true":"false"}*/}
            {/*{props.children}*/}
        </div>
    )
}export default Draggable;