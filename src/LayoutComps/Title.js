import {Outlet} from "react-router";
import {useState} from "react";

function Title(props){
    const [closed, setClosed] = useState(false);
    const [tucked, setTucked] = useState(false);

    const doTuck = ()=>{
        switch(true){
            case(!closed && tucked):
                setTucked(!tucked);
                break
            case(!tucked && !closed):
                setTucked(!tucked);
                break
            // default:

        }
    }
    const doTransition=()=>{
        if(closed && tucked){
            doClose()
        }else{
            doTuck()
        }
    }
    const doClose=()=>{
        switch(true){
            case(!closed && tucked):
                setClosed(!closed);
                break
            case(tucked && closed):
                setClosed(!closed);
                break
            // default:
        }
    }
    return(
        <div>
            <div className={"title-wrapper"}>
                <div className={"title " + (closed?"closed":null)} onTransitionEnd={doTuck}>
                    <h1 className={"top-title"}>Jeremy</h1>
                    <h1 className={"bot-title"}>Cox</h1>
                </div>
                <label htmlFor={"reveal"} className={"reveal"}>
                    <input hidden={true} type={"button"} id={"reveal"} onClick={e=> {
                        doTransition()
                    }}/>
                </label>
            </div>
            <div className={"title-list "+(tucked?"tucked":"")} onTransitionEnd={e=>doClose()}>
                <ul>
                    <li>
                        About Me
                    </li>
                    <li>
                        My Projects
                    </li>
                    <li>
                        Current Interests
                    </li>
                </ul>
            </div>
        </div>

    )
}export default Title;