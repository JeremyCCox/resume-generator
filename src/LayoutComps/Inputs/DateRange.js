import {useEffect, useRef, useState} from "react";

function DateRange(props){

    const [startMonth, setStartMonth]= useState();
    useEffect(()=>{
        console.log(startMonth);
    },[startMonth])
    return(
        <>
            
        </>
    )
}export default DateRange;