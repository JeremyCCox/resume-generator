import EditorElement from "./EditorElement";

function EditorSection(props){
    const {elements,addItem,type} = props;

    return(
        <>
            <h2>{type}</h2>
            <input type={"button"} onClick={addItem} value={"Add "+type}/>
            {
                Object.values(elements).map((content,index)=>{
                    return(

                        <EditorElement
                            index={index}
                            key={content.id}
                            updateElements={props.updateElements}
                            dropElem={props.dropElem}
                            startDrag={props.startDrag}
                            dragged={props.dragged}
                            content={content}
                            selected={props.selected}
                            toggleSelect={props.toggleSelect}
                        />
                    )
                })
            }
        </>
    )
}export default EditorSection;