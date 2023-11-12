function ResumeContact(props){
    let{contact ={}}=props;
    return(
        <>
            <h1>{contact.name}</h1>
            <h2>{contact.title}</h2>
        </>
    )
}export default ResumeContact;