import ModalWrapper from "./ModalWrapper";
import Modal from "./Modal";

function FullModal(props){
    let {setShow, show, modalType = "modal"} = props
    const toggle = ()=>{
        setShow(!show);
    }

    if(show){
        return(
            <>
                <ModalWrapper toggle={toggle}>
                    <Modal modalType={modalType}>
                        {props.children}
                    </Modal>
                </ModalWrapper>
            </>
        )
    }else{
        return(<></>)
    }

}
export default FullModal;