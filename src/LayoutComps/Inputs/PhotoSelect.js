import photo1 from "/public/images/jeremy1.jpg"
import photo2 from "/public/images/jeremy2.jpg"
import photo3 from "/public/images/jeremy3.jpg"
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import PositionButton from "../DynamicBackground/PositionButton";


const PhotoZone = styled.div`
  //width: 100;
  display: flex;
  overflow-x: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar{
    display: none;
  }
  padding: 0 50%;
  scroll-snap-type: x mandatory;
  //transition: 4;
  //background-image: radial-gradient(ellipse, red, green);
  scroll-behavior: smooth;
  //z-index: 0.5;
`
const Photo = styled.img`
  flex-basis: 35%;
  object-fit: cover;
  //width: 30%;
  //height: 200px;
  max-height: 200px;
  scroll-snap-align: center;
  padding: 0 50px;
  opacity: ${props => props.selected?"1":"0.25"};
  transition: opacity 500ms;
`

function PhotoSelect(props){
    const photos = [{number:0,img:photo1},{number:1,img:photo2},{number:2,img:photo3}]
    const [selected, setSelected] = props.selected || useState(0);
    const photoScroll = useRef()

    const debounce = (func, delay = 150)=>{
        let timer;
        return(...args)=>{
            args[0].preventDefault();
            clearTimeout(timer);
            timer = setTimeout(()=>{
                func(...args);
            },delay)
        }
    }

    const selfScroll=(e)=>{
        switch(Math.sign(e.wheelDelta)){
            case(-1):
                nextPhoto()
                break
            case(1):
                prevPhoto()
                break
            default:
                return
        }
        e.preventDefault()
        // e.stopPropagation()
        return false;
    }
    const prevPhoto = ()=>{
        photoScroll.current.scrollTo(photoScroll.current.scrollLeft-400,0)
        // let photoIndex = photos.findIndex(({number})=> number === selected.number)
        if(selected > 0){
            setSelected(selected-1)
        }

    }
    const nextPhoto=()=>{
        photoScroll.current.scrollTo(photoScroll.current.scrollLeft+400,0)
        if(selected < photos.length-1){
            setSelected(selected+1)
        }
    }
    useEffect(()=>{
        if(photoScroll && photoScroll.current){
            let instance = photoScroll.current;
            instance.addEventListener('wheel',debounce(selfScroll), {passive:false})
            return ()=>{
                instance.removeEventListener('wheel',debounce(selfScroll),{passive:false})
            }
        }
    },[selfScroll])

    return(
        <>
            <PhotoZone ref={photoScroll}>
                {Object.values(photos).map(photo=>{
                    return <Photo key={photo.number} selected={selected === photo.number} id={photo.number} src={photo.img}  onClick={props.handleClick}/>
                })}
            </PhotoZone>
        </>
    )
}export default PhotoSelect;