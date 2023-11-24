import Draggable from "./Draggable";
import Experience from "./Experience";
import Skills from "./Skills";
import Split from "./Split";
import EditorElement from "./EditorElement";
import {useEffect, useState} from "react";
import content from "../Content";

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
            console.log(newElements)
            setSideElements(newElements)
        })
        // console.log("content",props.elements)
        // console.log("new exp",newExperience);

    }

    return(
        <div className={"editor-panel"} onDragOver={props.sideHover} onDrop={props.dropElement}>
            <h1>Drag and Drop</h1>
            <h2>Experience</h2>
            <input type={"button"} onClick={addExperience} value={"Add Experience"}/>
            {
                Object.values(props.elements[0]).map((content,index)=>{
                    console.log(content)
                    if(content.type === "experience"){
                        return(

                                <EditorElement
                                    index={index}
                                    key={index}
                                    updateElements={props.updateElements}
                                    dropElem={props.dropElem}
                                    startDrag={props.startDrag}
                                    dragged={props.dragged}
                                    content={content}
                                />

                        )
                    }
                })
            }
            <h2>Skills</h2>
            {
                Object.values(props.elements).map((content,index)=>{
                    if(content.type === "skills"){
                        return(
                            <>
                                <EditorElement
                                    index={index}
                                    key={index}
                                    updateElements={props.updateElements}
                                    dropElem={props.dropElem}
                                    swapElem={props.swapElem}
                                    startDrag={props.startDrag}
                                    dragged={props.dragged}
                                    content={content}
                                />
                            </>
                        )
                    }
                })
            }
            <h2>Education</h2>
            {
                Object.values(props.elements).map((content,index)=>{
                    if(content.type === "education"){
                        return(
                            <>
                                <EditorElement
                                    index={index}
                                    updateElements={props.updateElements}
                                    dropElem={props.dropElem}
                                    swapElem={props.swapElem}
                                    startDrag={props.startDrag}
                                    dragged={props.dragged}
                                    content={content}
                                />
                            </>
                        )
                    }
                })
            }
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