function ResumeEditor(props){

    return(
        <div className={"resume-editor"}>
            <div className={"editor-panel"} onDrop={e=>console.log(e)}>

            </div>
            {props.children}
        </div>
    )
}export default ResumeEditor;