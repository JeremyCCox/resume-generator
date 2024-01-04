import Draggable from "./Resume/Draggable";
import {useReducer} from "react";
import {useDraggable} from "../ContextHooks/useDraggable";
function reducer(state,action){
    if(action.type === 'add'){
        return(
            [
                ...state,
                {id:state.length},
                ]
        )

    }
    if(action.type === 'delete'){
        return(
            state.filter(item=>{
                return item.id !== action.item.id;
            })
        )
    }
}

function Dev(){
    const [state, dispatch] = useReducer(reducer,[{id:0}]);
    const [state1, dispatch1] = useReducer(reducer,[]);
    const draggable = useDraggable("test");
    let nave = document.getElementById("nav");
    const doubleDispatch =()=>{
        if(state.length === 0){
            dispatch({type:'add'})
            dispatch1({type:'delete',item:{id:state1[state1.length-1].id}})
        }else{
            dispatch1({type:'add'})
            dispatch({type:'delete',item:{id:state[state.length-1].id}})
        }


    }
    return(
        <>
            {/*test*/}

            {/*<nav id={"nav"}>*/}

            {/*</nav>*/}
            {/*<p>*/}
            {/*    Count: {state.length}*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*    Count: {state1.length}*/}
            {/*</p>*/}
            {/*<input type={"button"} onClick={()=>{*/}
            {/*    dispatch({type:'add'})*/}
            {/*}}/>*/}
            {/*<input type={"button"} onClick={()=>console.log(nav)} value={"Text "}/>*/}
        </>
    )
}export default Dev;