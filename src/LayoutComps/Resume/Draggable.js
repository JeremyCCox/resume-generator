import {useEffect, useRef, useState} from "react";

function Draggable(props){
    let {content,index,updateElement ,dragged,startDrag,duringDrag,stopDrag,swapElement = (e)=>{e.preventDefault()}} = props;
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
    useEffect(()=>{
        // console.log("Draggable Content is:",content)
    })
    return(
        <div className={"draggable"} key={index+content.id} id={content.id} draggable={true} onDragEnd={stopDrag} onDragStart={startDrag} onDragOver={getDragInfo}  ref={heightRef}>
            {dragged?<div className={"spacer"} >{props.children}</div>:props.children}
            {/*{dragged?"true":"false"}*/}
            {/*{props.children}*/}
        </div>
    )
}export default Draggable;