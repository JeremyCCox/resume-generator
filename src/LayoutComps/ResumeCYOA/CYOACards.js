import {useState} from "react";
import styled from "styled-components";
import {useNavigate, useOutletContext, useParams} from "react-router";
import {useCYOA} from "../../ContextHooks/useCYOAContext";

const CYOACard = styled.label.attrs(props=>({
    style: {
      height: props.height,
    },
}))`
  flex-grow: 1;
  flex-basis: 0;
  height: 30vh;
  margin: 5px;
  padding: 10px;
  border:seagreen solid 1px;
  outline: green solid 2px;
  text-align: center;
  transition: flex-grow 4s, height 3s;
  
  
  &:hover  ${props=> props.categorySelected?"":0}{
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
  &:hover > ul ${props=> props.categorySelected?"":0}{
    opacity: 1;
  }
   &>ul>li{
     padding: 5px;
     opacity: 0;
   }
   &:hover > ul>li ${props=> props.categorySelected?"":0}{
     opacity: 1;
   }
`
const CYOACardsBody=styled.div`
  min-height: 20vh;
  display: flex;
  width: 100%;
  justify-content: space-around;
`

function CYOACards(props){
    const navigate = useNavigate()
    const CYOAProvider = useCYOA()
    const cards = CYOAProvider.getCards();
    // const [paths,setPaths] = useOutletContext();
    const {category} = useParams();
    let {paths, setPaths} = props;

    const getPath=(pathList)=>{
        let path="";
        Object.values(pathList).map(location=>{
            path+= "/"+location.location;
        })
        return path;
    }
    const pickCard=(e)=>{
        let newPaths= Object.assign([],paths);
        newPaths[1]=cards[e.target.id]
        navigate(getPath(newPaths))
        setPaths(newPaths);
    }



    return(
        <CYOACardsBody>
            {
                Object.values(cards).map((card,index)=>{
                    switch(true){
                        case(category ===undefined):

                    }
                    return(
                        <CYOACard height={category ===undefined?"30vh":category===card.location?"15vh":"10vh"} categorySelected={category===undefined}>
                            <h3>{card.title}</h3>
                            <ul style={{transition: "opacity "+ (card.teaserList.length) + "s"}}>
                                {Object.values(card.teaserList).map((elem,index)=>{
                                    return <li  style={{transition: "opacity "+ (index+1) + "s ease"}} >{elem}</li>
                                })}
                            </ul>
                            <input type={"button"} id={index} value={card.title} hidden={true} onClick={pickCard}/>
                        </CYOACard>
                    )
                })
            }
        </CYOACardsBody>
    )
}export default CYOACards;