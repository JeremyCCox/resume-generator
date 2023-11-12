import {useEffect, useRef, useState} from "react";

function Marker() {
    const posRef = useRef()
    const [pagePos, setPagePos] = useState();
    useEffect(()=>{
        if(posRef.current){
            // console.log(posRef.current.getBoundingClientRect())
            setPagePos(posRef.current.offsetTop)
        }
    })
    return (
     <div ref={posRef}>
         {pagePos!==undefined?pagePos:null}
     </div>
    )
}
export default Marker;