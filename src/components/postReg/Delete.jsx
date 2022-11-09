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
            <span className="material-icons outlined" onClick={()=>{onHandelDelete(postAll[i].pid)}}>
                delete
            </span>
            </div>
        </>
    )
}
export default Delete