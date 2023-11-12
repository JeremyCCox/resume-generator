
function ModalWrapper(props){

    return(
        <>
            <div className={"modalWrapper"} onClick={props.toggle}>
                {props.children}
            </div>
        </>
    )
}
export default ModalWrapper;