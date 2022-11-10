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
    })
    .catch(()=>{
        console.log('실패',cid) 
    })
}

    return (
        <>
            <button onClick={()=>{
                    if (window.confirm("정말 삭제합니까?")) {
                        deleteComment(a.cid)
                      } else {
                        alert('취소 됐습니다.')
                      }}}>X</button>
        </>
    )
}

export default CommentDel;