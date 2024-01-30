import styled from "styled-components";

const ColorZone = styled.svg`
  path: path("M 9 7 L 4 7 C 1 7 4 4 5 3 C 6 2 7 2 8 3 C 9 4 12 7 9 7");
  border:solid 2px black;
  height:20px;
`

function ColorPicker(){
    return(
        <ColorZone>

        </ColorZone>
    )
}export default ColorPicker;