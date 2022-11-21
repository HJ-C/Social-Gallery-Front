import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../../store/Store";
import { useSelector } from "react-redux";
import axios from "axios";
import UserInfo from './UserInfo';

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

    
    
    // userInfo

    return(
        <>
            <header className="header" >
                <nav className="header__content" >
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
                            <div className="profile-button img" >
                            {
                                isLogin === false 
                                ? <Link to = "/login"><span className="material-icons outlined">
                                login</span></Link>
                                : <>
                               <div onLoad={UserInfo}>
                                    <div id="layer_button" >
                                        <img src="/assets/main/user.png" alt="User Picture"/>
                                    </div>
                                    
                                    <div class="popup-wrap" id="popup"> 
                                    <div class="popup">
                                    <div class="popup-head">	
                                        <span class="head-title">Your Profile</span>
                                    </div>
                                    <div class="popup-body">	
                                        <div class="body-content">
                                            <div class="body-titlebox">
                                                <h1>개인 정보</h1>
                                            </div>
                                            <div class="body-contentbox">
                                                <p>Name : choi</p>
                                                <p>E-mail : swch56@social.com</p>
                                                <p>phone: 010-1234-5678</p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="popup-foot">
                                        <span class="pop-btn confirm" >확인</span>
                                        <span class="pop-btn close" onClick={()=>{
                                            alert('정말로 삭제 하시겠습니까')
                                        }}>회원 탈퇴</span>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                </>
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