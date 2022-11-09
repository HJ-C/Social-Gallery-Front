import axios from "axios";

function CommentDel({a}){



const headers = {
    'Content-type': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem("token")
}

const deleteComment = (cid)=>{
    axios.delete(`http://localhost:8080/api/comment/delete/${cid}`,{headers,
    withCredentials: true,
      crossDomain: true,
      credentials: "include"})
    .then(res=>{
        window.location.reload()
        console.log(cid)
    })
    .catch(()=>{
        console.log('실패',cid) 
    })
}

    return (
        <>
            <button onClick={()=>{deleteComment(a.cid)}}>X</button>
        </>
    )
}

export default CommentDel;