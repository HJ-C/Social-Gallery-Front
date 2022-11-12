import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../../store/Store";
import { useSelector } from "react-redux";
import axios from "axios";

function MainHeader(){

    const isLogin = useSelector((state)=>state.isLogin.isLoginList)
    const dispatch = useDispatch()

    const base_URL = 'http://localhost:8080'

    useEffect(()=>{
        axios.get(base_URL + "/findUserByEmail/" + localStorage.getItem("user"))
        .then((res)=>{
            dispatch(setIsLogin(res.data.data.isLogin))
        })
    },[])

    return(
        <>
            <header className="header">
                <nav className="header__content">
                    <div className="header__buttons">
                        <Link to ='/'><p onClick={()=>{
                            window.location.replace ('/')
                        }}>Social Gallery</p></Link>
                    </div>

                    <div className="header__buttons header__buttons--desktop">
                        <Link to="/"  onClick={()=>{
                            window.location.href('/')
                        }} >
                            <img src="/assets/Main/home_btn.png" alt="" />
                        </Link>
                        <Link to="#">
                            <img src="/assets/Main/msg_btn.png" alt="" />
                        </Link>
                        <Link to="#">
                            <img src="/assets/Main/video_btn.png" alt="" />
                        </Link>
                        <button className="profile-button" id ="ts">
                            <div className="profile-button img">
                            {
                                isLogin === false 
                                ? <Link to = "/login"><span className="material-icons outlined">
                                login</span></Link>
                                :<img src="/assets/main/user.png" alt="User Picture" />
                            }
                            </div>
                        </button>
                    </div>
                </nav>
            </header>
        </>
    )
}
export default MainHeader;