import Draggable from "../DraggableOld";
import Experience from "../ResumeItems/Experience";
import Skills from "../ResumeItems/Skills";
import Split from "../ResumeItems/Split";
import EditorElement from "./EditorElement";
import {useEffect, useState} from "react";
import content from "../../Content";
import EditorSection from "./EditorSection";

function EditorPanel(props){
    // const {elements } = props;
    const [sideElements, setSideElements] = props.elements
    const addExperience=()=>{
        let newExperience = {
            id: null,
            type:"experience",
            title:null,
            // date:"MAY 2022 - AUG 2022",
            dateFrom:null,
            dateTo:null,
            description:null,
            items:[],
        }
        props.createElement().then(res=>{
            newExperience.id= res.id;
            let newElements = Object.assign([],sideElements)
            newElements.push(newExperience)
            console.log("new Elements: ",newElements)
            setSideElements(newElements)
        })
        // console.log("content",props.elements)
        // console.log("new exp",newExperience);

    }
    const typeIs=(item,type)=>{
        return item.type === type;
    }

    return(
        <div className={"editor-panel"}  onDrop={props.panelDrop}>
            <h1>Drag and Drop</h1>
            <EditorSection
                elements={props.elements.filter(item => item.type === "experience")}
                type={"Experience"}
                updateElements={props.updateElements}
                dropElem={props.dropElem}
                startDrag={props.startDrag}
                selected={props.selected}
                toggleSelect={props.toggleSelect}
            />
            <EditorSection
                elements={props.elements.filter(item => item.type === "skills")}
                type={"Skills"}
                updateElements={props.updateElements}
                dropElem={props.dropElem}
                startDrag={props.startDrag}
                selected={props.selected}
                toggleSelect={props.toggleSelect}
            />
            {/*<EditorSection*/}
            {/*    elements={props.elements[0].filter(item => item.type === "education")}*/}
            {/*    type={"Education"}*/}
            {/*/>*/}

            {
                // Object.values(props.elements).map((content,index)=>{
                //     return(
                //         <>
                //             <EditorElement
                //                 index={index}
                //                 updateElements={props.updateElements}
                //                 dropElem={props.dropElem}
                //                 swapElem={props.swapElem}
                //                 startDrag={props.startDrag}
                //                 dragged={props.dragged}
                //                 content={content}
                //             />
                //         </>
                //     )
                // })
                    // switch(content.type){
                    //     case("experience"):
                    //         // console.log(content)
                    //         return(
                    //             <>
                    //                 {/*<Marker/>*/}
                    //                 <EditorPanel
                    //                     content={content}
                    //                     index={index}
                    //                     startDrag={props.startDrag}
                    //                     stopDrag={props.dropElem}
                    //                     dragged={content.dragged!==undefined?content.dragged:false}
                    //                     swapElement={props.swapElem}
                    //                 >
                    //                     <Experience
                    //                         content={content}
                    //                     />
                    //                 </EditorPanel>
                    //
                    //             </>
                    //
                    //         )
                    //         break;
                    //     case("skills"):
                    //         return(
                    //             <Skills
                    //                 content={content}
                    //                 index={index}
                    //                 updateElement={updateElement}
                    //                 startDrag={props.startDrag}
                    //                 stopDrag={props.stopDrag}
                    //
                    //             />
                    //         )
                    //         break;
                    //     case("split"):
                    //         return(
                    //             <Split
                    //                 index={index}
                    //                 updateElement={updateElement}
                    //                 startDrag={props.startDrag}
                    //                 stopDrag={props.stopDrag}
                    //                 content={content}
                    //             />
                    //         )
                    //         break;
                    // }

            }
        </div>
    )
}export default EditorPanel;