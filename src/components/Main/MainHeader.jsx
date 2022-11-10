import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function MainHeader(){
    const [isLogin, setIsLogin] = useState(false)

    const base_URL = 'http://localhost:8080'

    useEffect(()=>{
        axios.get(base_URL + "/findUserByEmail/" + localStorage.getItem("user"))
        .then((res)=>{
            setIsLogin(res.data.data.isLogin)
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
                        <Link to="#">
                            <img src="/assets/Main/home_btn.jpg" alt="" />
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
                                ? <Link to = "/login"><div>로그인해주세요</div></Link>
                                : <Link to = "/login"><img src="/assets/main/user.png" alt="User Picture" /></Link> 
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