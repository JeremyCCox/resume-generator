import styled from "styled-components";
import {useEffect, useState} from "react";

const PageZone = styled.div`
  display: flex;
  height: 2in;
  //width: 100%;
  justify-content: space-evenly;
  margin-top:25px;
  //text-align: center;
`
const A4 = styled.button`
  display: inline-flex;
  align-items: flex-start;
  justify-content: space-around;
  width: .83in;
  height: 1.17in;
  border: solid black 1px;
  background-color: ${props => props.selected?props.background:"lightgrey" };
  text-align: center;
  padding-top: 0;
`
const Letter = styled.button`
  display: inline-flex;
  align-items: flex-start;
  justify-content: space-around;
  width: .85in;
  height: 1.1in;
  border: solid black 1px;
  background-color: ${props => props.selected?props.background:"lightgrey" };
`
const Legal = styled.button`
  display: inline-flex;
  align-items: flex-start;
  justify-content: space-around;
  width: .85in;
  height: 1.4in;
  border: solid black 1px;
  background-color: ${props => props.selected?props.background:"lightgrey" };
`
const Custom = styled.button`
  display: inline-flex;
  align-items: flex-start;
  justify-content: space-around;
  width: .85in;
  height: 1.1in;
  border: solid black 1px;
  outline: transparent 2px;
  background-color: ${props => props.selected?props.background:"lightgrey" };
`
const PaperBox = styled.div`
  width: 1in;
`
const SelectZone = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
function PageSizes(props){


    return(
        <>
            <PageZone>
                    <Letter onClick={props.handleClick} background={props.backgroundColor} selected={props.selected === "letter"} id={"letter"}>Letter</Letter>
                    <A4 onClick={props.handleClick} background={props.backgroundColor} selected={props.selected === "A4"} id={"A4"}>A4</A4>
                    <Legal onClick={props.handleClick} background={props.backgroundColor} selected={props.selected === "legal"} id={"legal"}>Legal</Legal>
                    {/*<Custom onClick={props.handleClick} background={props.backgroundColor} selected={props.selected === "custom"} id={"custom"}>Custom</Custom>*/}
            </PageZone>
            

        </>
    )
}export default PageSizes;