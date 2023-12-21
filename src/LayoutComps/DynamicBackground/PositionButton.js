import styled from "styled-components";

const PositionLabel = styled.label`
  padding: 30px;
  color:white;
  font-size: xxx-large;
  margin: 20px;
  &:hover{
    //border: 0px solid black;
    box-shadow: 0px 0px  0px 8px rgba(0,0,0,0.5);
  }
`


function PositionButton(props){

    const mouseEvent=()=>{
        props.handleHover(props.type);
    }
    return(
        <PositionLabel onMouseEnter={mouseEvent} onMouseOut={props.handleExit}>
            {props.children}
            <input type={"button"} hidden={true}/>
        </PositionLabel>
    )
}export default PositionButton;