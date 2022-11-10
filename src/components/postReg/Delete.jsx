import  axios  from 'axios';
import { useSelector } from 'react-redux';

function Delete({i}){

    let postAll = useSelector((state)=>state.postAll.postAllList) 

    const headers = {
        'Content-type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token")
    }

    function onHandelDelete(pid){
        axios.delete(`http://localhost:8080/api/post/delete/${pid}`, {headers})
            .then(res=>{
                window.location.reload()
            })
    }




      
    return (
        <>
            <div>
            <span className="material-icons outlined" onClick={()=>{
                    if (window.confirm("정말 삭제합니까?")) {
                        onHandelDelete(postAll[i].pid)
                      } else {
                        alert('취소')
                      }}}>
                delete
            </span>
            </div>
        </>
    )
}
export default Delete