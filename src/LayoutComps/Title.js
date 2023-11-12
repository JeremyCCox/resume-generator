import {Outlet, useNavigate} from "react-router";
import {useState} from "react";
import {Link, NavLink} from "react-router-dom";

function Title(props){
    const [closed, setClosed] = useState(false);
    const [tucked, setTucked] = useState(false);
    const navigate = useNavigate();
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
    const navClick=(e)=>{
        e.preventDefault();
        switch(e.target.value){
            case("Main"):
                (navigate("/main/"));
                break;
            case("Resume"):
                (navigate("/resume/"))
                break;
        }
    }

    return(
        <div className={"title"} >
            <div className={"title-wrapper"}>
                <div className={"title-head " + (closed?"closed":null)} onTransitionEnd={doTuck}>
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
                <label className={"title-link"} >

                    <Link to={"home"} >
                        Home
                    </Link>

                </label>
                <label className={"title-link"} >
                    <Link to={"resume"} >
                        Resumes
                    </Link>
                </label>
                {/*<label className={"title-link"} >*/}
                {/*    Text Here*/}
                {/*    <input type={"button"} hidden={true} />*/}
                {/*</label>*/}
            </div>
        </div>

    )
}export default Title;