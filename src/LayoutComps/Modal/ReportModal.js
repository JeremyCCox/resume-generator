function ReportModal(props){
    if(props.show){
        if(props.uri === null || props.uri ===""){

            return(
                <div className={"modalWrapper"} onClick={props.setShow}>
                    <div className={"modal"} id={"modal"}>
                        <div className={"lds-ring"}>
                            <div></div><div></div><div></div><div></div>
                        </div>
                        {props.children}
                    </div>
                </div>


            )
        }else{
            return(
                <div className={"modalWrapper"} onClick={props.setShow}>
                    <div className={"modal"} id={"modal"}>
                        <iframe src={props.uri}></iframe>
                        {props.children}
                    </div>
                </div>
            )
        }

    }else{
        return(null)
    }

}
export default ReportModal;