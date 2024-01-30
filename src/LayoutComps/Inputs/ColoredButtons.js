import styled from "styled-components";

const ColorButton = styled.button`
  flex-basis: 80px;
  height: 80px;
  border-radius: 45%;
  background-color: ${props=> props.id};
  border: solid 2px black;
  margin: 0 5px;
`
const ButtonZone = styled.div`
  width: 100%;
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
`
function ColoredButtons(props){
    const handleClick = props.handleClick;
    const colors = ["thistle","plum","antiquewhite","white","paleturquoise","lightblue","palegreen"]

    return(
        <ButtonZone>
            {Object.values(colors).map(color=>{
                return <ColorButton id={color} onClick={handleClick}/>
            })}
        </ButtonZone>
    )
}export default ColoredButtons;