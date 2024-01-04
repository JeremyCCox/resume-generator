import {useOutletContext, useParams} from "react-router";
import styled from "styled-components";
import CYOACategoryCards from "./CYOACategoryCards";

const CYOACategoryBody=styled.div`
    
`


function CYOACategory(props){
    // const [paths,setPaths] = useOutletContext();
    let {cards, paths, setPaths} = props
    const {category}=useParams()
    return(
        <CYOACategoryBody>
            <CYOACategoryCards cards={cards}/>
            {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at felis nec est condimentum consequat quis a nisi. Praesent lacus mi, laoreet sed velit in, vestibulum porttitor lacus. Praesent imperdiet nec libero id pharetra. Donec euismod volutpat lectus, ut vehicula quam varius id. Vestibulum faucibus fringilla odio, et pharetra lorem condimentum ac. Mauris sit amet odio sodales, tempus lorem id, rutrum quam. Donec varius, libero a facilisis maximus, ligula augue interdum felis, a aliquet eros elit in quam. Vestibulum ornare nulla id placerat porta. Nam efficitur velit sed lorem dapibus semper. Mauris sit amet tortor venenatis, luctus quam nec, malesuada lacus. Curabitur facilisis, felis eu fringilla commodo, metus ipsum dignissim diam, a tristique odio justo ac enim. Vivamus nibh lorem, porta at mi a, condimentum tempus nulla. Praesent condimentum diam erat, vitae cursus ligula feugiat molestie. Integer consectetur, quam posuere efficitur egestas, risus odio iaculis ligula, at varius nunc dui nec nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.*/}
        </CYOACategoryBody>
    )
}export default CYOACategory;