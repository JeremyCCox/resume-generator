import styled from "styled-components";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useState} from "react";

const CuttingBoard = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: inherit;
`
const BreadCrumb = styled.label`
  font-size: xxx-large;
  color: antiquewhite;
  max-width: 4lh;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 15px;
  &:hover{
    font-weight: bold;
    padding: 0 15px;

  }
  &:hover:before{
    font-weight: normal;
    padding: 0 15px;

  }
  &:before{
    padding: 0 15px;
    content: ">";
  }
  &:first-child:before{
  content: none;
  }
`

function BreadCrumbs(props){
    const navigate = useNavigate();
    let {setPaths,paths =[]} = props;
    const getPath=(pathsLocation)=>{
        // console.log("Ran")
        let path="/cyoa";
        let subArr = paths.slice(0,parseInt(pathsLocation))
        Object.values(subArr).map(location=>{
            path+= "/"+location.location;
        })
        return path;
    }
    const pullCrumbs=(e)=>{
        setPaths(paths.slice(0,parseInt(e.target.id)+1))
        navigate(getPath(parseInt(e.target.id)+1))
    }

    return(
        <CuttingBoard>
            {
                Object.values(paths).map((location,index)=>{
                    // console.log(location)
                    return(
                        <BreadCrumb>
                            {location.title}
                            <input id={index} onClick={pullCrumbs} hidden={true}/>
                        </BreadCrumb>
                    )
                })
            }

        </CuttingBoard>
    )
}export default BreadCrumbs;