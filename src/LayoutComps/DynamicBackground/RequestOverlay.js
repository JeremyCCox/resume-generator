import styled from "styled-components";

const Overlay=styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(128,128,128,.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: xxx-large;
`
const OverlayButtons = styled.div`
  margin: unset;
  padding: 30px;
  text-align: center;
  align-self: flex-start;
  position: fixed;
  display: flex;
  justify-content: space-around;
  width: 40%;
  &>input{
    padding: 20px;
    background-color: rgba(255, 51, 204,0.5);
    color:white;
  }
`
const FunctionalOverlay=styled.div`
  height: 100vh;
  //padding: 30px;
  //position: fixed;
  //margin: 30%;
  //text-align: center;
  //cursor:none;
  //background-color: rgba(128,128,128,.8);
  //display: flex;
  //align-items:;
  //background-color: rgba(120,120,120,0.4);
  //font-size: x-large;
`
const OverlayMessage = styled.p`
  margin: unset;
  padding: 30px;
  text-align: center;
  position: fixed;
`


function RequestOverlay(props){
    let {message = "No message given!",display=true, toggleDisplay= ()=>{}} = props

    const setBackground=(e)=>{
        props.setBackground(e.target.id)
    }

    if(display){
        return(
            <Overlay onClick={toggleDisplay}>
                <OverlayButtons>
                    <input type={"button"} value={"Calgary Skyline"} id={"1"} onClick={setBackground}/>
                    {/*<input type={"button"} value={"Calgary Skyline"} id={"2"} onClick={setBackground}/>*/}
                    <input type={"button"} value={"My office"} id={"3"} onClick={setBackground}/>
                </OverlayButtons>

                {message}
            </Overlay>
        )
    }else{
        return (
            <>
                <FunctionalOverlay>
                    <OverlayMessage>
                        [ ESC ] to exit
                    </OverlayMessage>
                    {props.children}
                </FunctionalOverlay>
            </>
        )

    }

}export default RequestOverlay;