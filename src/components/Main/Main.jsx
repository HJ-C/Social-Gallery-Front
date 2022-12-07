
import Footer from './Footer';
import Sidebar from './SideBar';
import SideMenu from './SideMenu';
import MainHeader from './MainHeader';
import Content from './Content';
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from 'react';
import { setPostAll } from '../../store/Store';
import axios from 'axios';

function Main({rgName,setRgName}){

 let postAll = useSelector((state)=>state.postAll.postAllList)
 let dispatch = useDispatch()    


 useEffect(()=>{
    axios.get('http://localhost:8080/api/post')
    .then((res) => {
      dispatch(setPostAll([...res.data.list]));
    })
    .catch((err) => {
      console.log(err);
    })
 },[dispatch])

    return (
        <>
       
            {/* Header*/}
            <MainHeader></MainHeader>
            
            {/* Side Menu */}
            <SideMenu></SideMenu>

            {/* Main Contents */}
                {
                    postAll
                        .map((a,i)=><Content
                            key={a.pid}
                            i={i}
                        ></Content>)
                }
            
            {/* Sidebar --> */}
            <Sidebar rgName={rgName} setRgName={setRgName}></Sidebar>

            {/* Footer */}
            <Footer></Footer>
        </>
    )
}


export default Main;