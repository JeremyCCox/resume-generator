import styled from "styled-components";
import {useParams} from "react-router";
import CYOACards from "./CYOACards";
import Draggable from "../Resume/Draggable";
import DraggableCopy from "../Resume/DraggableCopy";
import draggable from "../Resume/Draggable";
import {useEffect} from "react";
import {useDraggable} from "../../ContextHooks/useDraggable";
const CYOACategoryCardsBody = styled.div`
  display: flex;
`
const CYOACategoryCard = styled.div`
  display: grid;
  opacity: ${props=> props.selected?"1":"0"};
  //height: ${props=> props.selected?"fit-content":"0"};
  //position: ${props=> props.selected?"fixed":"relative"};
  width: ${props=> props.selected?"100%":"0"};
  order: ${props=> props.selected?"1":"2"};
  transition: height 2s 4s ,opacity ease-in-out 3s, width 4s;
`
const test = styled.Draggable
const CYOACategoryOption = styled.div`
  border: white 2px solid;
  outline: lightblue;
  margin: 15px;
`
function CYOACategoryCards(props){
    const {cards} = props
    const {category} = useParams()
    const draggable = useDraggable()


    // useEffect(()=>{
    //     let categoryCard = cards.find(({location}) => location ===  category)
    //     if(categoryCard !== undefined){
    //         draggable.elementDispatch({type:"reset",items:categoryCard.list})
    //     }
    // },[category])


    return(
        <CYOACategoryCardsBody>
            {Object.values(cards).map(card=>{
                // console.log(card)
                return(
                    <CYOACategoryCard selected={card.location===category}>
                        {Object.values(card.list).map((element,index)=>{
                            return(
                                <DraggableCopy
                                    content={element}
                                >
                                    <CYOACategoryOption>
                                        {element.desc}
                                    </CYOACategoryOption>
                                </DraggableCopy>
                            )
                        })}
                        {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id lorem ante. Integer hendrerit quam et justo molestie ornare. Etiam convallis, nisi ut hendrerit efficitur, tortor est feugiat nisi, vel rhoncus purus sem sit amet nunc. Sed in leo consequat, tincidunt augue sit amet, ullamcorper lorem. Suspendisse quam lectus, porta efficitur erat non, commodo condimentum sem. Donec sit amet odio non nisl varius dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum quis est nunc. Duis non sodales dolor. Donec eu consequat nisi. Curabitur iaculis ex nec leo vehicula vestibulum. Donec volutpat ante eu felis lacinia ornare.*/}


                    </CYOACategoryCard>

                )
            })}
        </CYOACategoryCardsBody>
    )
}export default CYOACategoryCards;