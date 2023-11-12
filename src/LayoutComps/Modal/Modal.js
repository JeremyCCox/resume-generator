function Modal(props){

    return(
        <>
                <div className={props.modalType} id={"modal"} onClick={e=>e.stopPropagation()}>
                    {props.children}
                </div>
            </>
        )


}
export default Modal;