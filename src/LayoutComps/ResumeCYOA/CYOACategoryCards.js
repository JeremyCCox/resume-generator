import styled from "styled-components";
import {useParams} from "react-router";
import CYOACards from "./CYOACards";
import Draggable from "../../Draggable/Draggable";
import draggable from "../Resume/DraggableOld";
import {useEffect} from "react";
import {useDraggable} from "../../Draggable/useDraggable";
import Draggable2 from "../../Draggable/Draggable";
const CYOACategoryCardsBody = styled.div`
  display: flex;
  position: relative;
`
const CYOACategoryCard = styled.div`
  display: grid;
  opacity: ${props=> props.selected?"1":"0"};
  position: ${props=> props.selected?"relative":"absolute"};
  left:${props=> props.selected?"0px":"999px"};
  width: ${props=> props.selected?"100%":"0px"};
  //width: inherit;
  order: ${props=> props.selected?"1":"2"};
  transition:${props=> props.selected?"opacity ease-in 2s, width 0s, left 1s linear":"opacity ease-out 2s, left 1s linear , width 0s 2s"};
`
const CYOACategoryOption = styled.div`
  //outline: lightblue;
  //margin: 15px;
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
                    <CYOACategoryCard selected={card.location===category} >
                        {Object.values(card.list).map((element,index)=>{
                            return(
                                <Draggable
                                    content={element}
                                >
                                    <CYOACategoryOption id={element.id}>
                                        {element.description}
                                    </CYOACategoryOption>
                                </Draggable>
                            )
                        })}
                        {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id lorem ante. Integer hendrerit quam et justo molestie ornare. Etiam convallis, nisi ut hendrerit efficitur, tortor est feugiat nisi, vel rhoncus purus sem sit amet nunc. Sed in leo consequat, tincidunt augue sit amet, ullamcorper lorem. Suspendisse quam lectus, porta efficitur erat non, commodo condimentum sem. Donec sit amet odio non nisl varius dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum quis est nunc. Duis non sodales dolor. Donec eu consequat nisi. Curabitur iaculis ex nec leo vehicula vestibulum. Donec volutpat ante eu felis lacinia ornare.*/}


                    </CYOACategoryCard>

                )
            })}
        </CYOACategoryCardsBody>
    )
}export default CYOACategoryCards;