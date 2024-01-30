import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useDraggable} from "./useDraggable";




const DraggableDiv = styled.div`
  // border: ${props=> props.selected?"blue solid 4px":"peachpuff solid 2px"};
  // border-radius: 5px;
  // padding: ${props=> props.selected?"18px":"20px"};
  height: fit-content;
  box-sizing: border-box;
  &:hover{
    cursor: move;
  }
  //Remnants from draggable elements being "stuck" to mouse.
  //position: ${props=> props.selected?props.mouse!== undefined?"absolute":"relative":"relative"};
  //top: ${props=> props.selected?props.mouse!== undefined?props.mouse.y+"px":"":""};
  //left: ${props=> props.selected?props.mouse!== undefined?props.mouse.x+"px":"":""};
`
const Selected = styled.div`
  border: 5px dodgerblue solid;
  box-sizing: border-box;
  padding: 0;
  margin: 0;  
  
`
const Spacer=styled.div`
  border: 5px dodgerblue solid;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  filter: blur(1px);
`



function Draggable(props){
    // let {content,index,updateElement ,selected,toggleSelect=(e)=>{},dragged,startDrag,duringDrag,stopDrag,swapElement = (e)=>{e.preventDefault()}} = props;
    // const [height, setHeight] = useState();
    // const [top, setTop] = useState();
    const content = props.content;
    let index = props.index;
    let mouse = props.mouse;
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
        e.preventDefault();
        if(index !== undefined){
            draggable.swapElement(e,index);
        }

    }
    // useEffect(()=>{
    //     console.log("Draggable Content is:",content)
    // })
    const select=()=>{
        draggable.toggleSelect(content.id);
    }
    const startDrag=(e)=>{
        draggable.startDrag(e)
    }
    const stopDrag=(e)=>{
        draggable.stopDrag(e);
    }
    // console.log("dragged",draggable.dragged)
    return(
        <DraggableDiv
            id={content.id}
            selected={draggable.dragged.id === content.id}
            draggable={true}
            onMouseDown={select} onDragEnd={stopDrag} onDragStart={startDrag} onDragOver={getDragInfo} ref={heightRef}>
            {props.children}
            {/*{draggable.dragged.id === content.id?<Spacer id={content.id} onDragEnd={draggable.stopDrag} >{props.children}</Spacer>:draggable.selected.id === content.id?<Selected id={content.id}>{props.children}</Selected>:props.children}*/}
        </DraggableDiv>
    )
}export default Draggable;