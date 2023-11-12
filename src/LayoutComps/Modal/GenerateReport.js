import {useState} from "react";

function GenerateReport(props){
    const [showModal, setShowModal] = useState(false);
    const [reportUri, setReportUri] = useState("")
    const [imageList, setImageList] = useState([]);
    const auth = useAuth();
    const handler = useHandler();

    const getPdf =()=>{
        let reportRequestDto = {
            auditId:props.auditId,
            imageList:imageList,
        }

        fetch(process.env.REACT_APP_API_ENDPOINT+"/thymeleaf/template/photos",{
            method:"POST",
            headers:{
                "Authorization":auth.getAuthToken(),
                Accept:"application/pdf",
                "Content-Type":"application/json",
            },
            // body:jsonFormData,
            body:JSON.stringify(reportRequestDto),
        })

            .then(res =>{

                if(res.ok){
                    return res.blob();
                }else{
                    throw new Error("Error!" + res.status);
                }
            }).then(data=>{
            let report = new Blob([data], {type:'application/pdf'})
            setReportUri(window.URL.createObjectURL(report))
        }).catch(error =>{
            handler.handleError(error)
        })


    }
    return(
        <>
            <PhotoUpload sizedImages={props.sizedImages} imageList={props.imageList} ></PhotoUpload>
        </>

    )
}
export default GenerateReport;