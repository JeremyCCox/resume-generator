import styled,{keyframes} from "styled-components";
import BreadCrumbs from "../BreadCrumbs";
import {useState} from "react";


const CYOABase=styled.div`
  
`
const CYOAContent=styled.div`
  display: flex;
  justify-content: space-around;
`
const CYOACard = styled.label`
  flex-grow: 1;
  flex-basis: 0;
  height: 30vh;
  margin: 5px;
  padding: 10px;
  border:seagreen solid 1px;
  outline: green solid 2px;
  text-align: center;
  transition: flex-grow 4s;
  &:hover{
    padding: 8px;
    border-width: 3px;
    flex-grow: 1.5;
  }
  &>ul{
    transition: opacity 3s;
    list-style-type: none;
    opacity: 0;
    display: inline;
  }
  &:hover > ul{
    opacity: 1;
  }
   &>ul>li{
     padding: 5px;
     opacity: 0;
   }
   &:hover > ul>li{
     opacity: 1;
   }
`



function CYOABody(){
    const [paths, setPaths] = useState([])
    const [addList, setAddList] = useState([]);
    const [cards, setCards] = useState([{location:"Frontend",title:"Front End",teaserList:["One","Two","Three"]},{location:"Backend",title:"Back End",teaserList:["Four","Two","Zero"]},{location:"Fullstack",title:"Fullstack",teaserList:["One","Two","Three"]}])
    const addElem=()=>{
        let newList = Object.assign([],addList);
        newList.push("New Item "+(newList.length+1))
        setAddList(newList)
    }
    const pickCard=(e)=>{
        let newPaths= Object.assign([],paths);
        newPaths.push({location:e.target.id,title:e.target.value})
        setPaths(newPaths);
    }
    return(
        <CYOABase>
            <BreadCrumbs setPaths={setPaths} paths={paths}/>
            <CYOAContent>
                {
                    Object.values(cards).map(card=>{
                        return(
                            <CYOACard>
                                <h3>{card.title}</h3>
                                <ul style={{transition: "opacity "+ (card.teaserList.length) + "s"}}>
                                    {Object.values(card.teaserList).map((elem,index)=>{
                                        return <li  style={{transition: "opacity "+ (index+1) + "s ease"}} >{elem}</li>
                                    })}
                                </ul>
                                <input type={"button"} id={card.location} value={card.title} hidden={true} onClick={pickCard}/>
                            </CYOACard>
                        )
                    })
                }
            </CYOAContent>
            <input type={"button"} onClick={addElem}/>
        </CYOABase>
    )
}export default CYOABody;