import  axios  from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setIsLogin } from "../../store/Store";
import { useEffect } from 'react';

function Delete({i}){

    let postAll = useSelector((state)=>state.postAll.postAllList) 
    const isLogin = useSelector((state)=>state.isLogin.isLoginList)
    const dispatch = useDispatch()

    const base_URL = 'http://localhost:8080'

    const headers = {
        'Content-type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token")
    }

    useEffect(()=>{
        axios.get(base_URL + "/findUserByEmail/" + localStorage.getItem("user"))
                 .then((res)=>{
                     dispatch(setIsLogin(res.data.data.isLogin))
                 })
    },[])
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
                    if (isLogin === false) {
                        alert('로그인 해주세요.')
                        
                      } else if (window.confirm("정말 삭제합니까?")) {
                        onHandelDelete(postAll[i].pid)
                        
                      } else{
                        alert('취소 됐습니다.')
                      }
                      }}>
                delete
            </span>
            </div>
        </>
    )
}
export default Delete