import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
const TestCompStyled = styled.div`
      border: solid 3px gray;
    `
const DynamicBox = styled.div`
    height:${props => props.height === undefined ?"200px" : props.height}}
`
function TestComp(){
    const boxRef = useRef();
    const [pageHeight, setPageHeight] = useState(window.innerHeight);

    // window.addEventListener('resize',ev => {
    //     console.log(ev.target.innerHeight);
    // })

    return(
        <TestCompStyled>
            {/*<DynamicBox height={(pageHeight/2)+"px"} >*/}

            {/*</DynamicBox>*/}
        </TestCompStyled>
    )
}export default TestComp;