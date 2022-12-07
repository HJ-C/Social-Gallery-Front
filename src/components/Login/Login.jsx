import {useState} from "react";
import Toggle from "./Toggle";
import {Link, useLocation, useParams} from 'react-router-dom'
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";
import { useEffect } from "react";
import { useCallback } from "react";

function Login() {
  const navigate = useNavigate()
  let accessToken = null;

  // 로그인 Form
  const [email,setEmail] = useState('');
  const [pw,setPw] = useState('');
  const [rgEmail, setRgEmail] = useState(''); // rg = Register
  const [rgPw, setRgPw] = useState('');
  const [rgName, setRgName] = useState('');
  const [rgTel, setRgTel] = useState('');


  const [isName, setIsName] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)

  // Check mail,pw

  // // 이름
  // const onChangeName = (e) => {
    
  //   if (e.target.value.length < 4 || e.target.value.length > 8) {
  //     alert('4글자 이상 8글자 이내로 입력해주세요.')
  //     setIsName(false)
  //   } else {
  //     //제대로 입력했을때
  //     setIsName(true)
  //   }
  // }

  // // 📍이메일
  // const onChangeEmail = (e) => {

  //   const emailRegex =
  //     /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/


  //   if (!emailRegex.test(e.target.value)) {
  //     alert('올바른 이메일 형식이 아닙니다.')
  //     setIsEmail(false)
  //   } else {
  //     //제대로 입력했을때
  //     setIsEmail(true)
  //   }
  // }

  // // 📍비밀번호
  // const onChangePassword = (e) => {
  //   const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{4,25}$/

  //   if (!passwordRegex.test(e.target.value)) {
  //     alert('올바른 비밀번호 형식이 아닙니다.')
  //     setIsPassword(false)
  //   } else {
  //     //제대로 입력했을때
  //     setIsPassword(true)
  //   }
  // }

  // const [id,setId] = useState('') id 불러오기
  let usersId = useState('');

  const onEmailHandler = e =>{
    setEmail(e.currentTarget.value)
  }
  const onPwHandler = e =>{
    setPw(e.currentTarget.value)
  }
  const onSubmit = e => {
    e.preventDefault();
  }

 // 회원가입 Form
 const onRgEmailHandler = (e) => {
  setRgEmail(e.currentTarget.value)
}

const onRgPwHandler = (e) => {
  setRgPw(e.currentTarget.value)
}

const onRgNameHandler = (e) => {
setRgName(e.currentTarget.value)
}
const onRgTelHandler = (e) => {
setRgTel(e.currentTarget.value)
}
  const base_url = "http://localhost:8080"


  //google
  const location = useLocation();

  const getUser = (email) => {
    axios.get(base_url + '/findUserByEmail/' + email, {
    }).then(res => {
      usersId = res.data.data.id;
      localStorage.setItem("uid", usersId);
      
      return usersId;
    })
  }

  const signIn = () =>{
    axios.post(base_url + '/v1/login',{
      usersId : getUser(email),
      email : email,
      password : pw
    },{
      headers: {
        'Content-Type': 'application/json',
      },
    withCredentials: true,
      crossDomain: true,
      credentials: "include"
    })
        .then(res => {
          if(res.status === 200){
            accessToken = res.data.data.accessToken
            localStorage.setItem("user", email)
            localStorage.setItem("token", res.data.data.accessToken)
            // localStorage.setItem("name", name)
            getUser(email)
            navigate('/')
          }else{
            alert('아이디 또는 비밀번호가 일치하지 않습니다.')
          }
        })
  }

  const signUp = (e) =>{
    e.preventDefault()
    axios.post(base_url + '/v1/signUp',{
      usersId : getUser(email),
      email: rgEmail,
      password: rgPw,
      username : rgName,
      phone : rgTel
    },{
      headers: {
        'Content-Type': 'application/json',
      },
    withCredentials: true,
      crossDomain: true,
      credentials: "include"
    })
    .then(res=>{
      if(res.status === 200){
        alert('회원가입이 되었습니다.')
      }else{
        alert('빈칸을 확인해 주세요.')
      }
    });
  }



  
	return ( 
		<>
    <div className="container" id="container" onLoad={Toggle}>
			<img src="/assets/Login/bg1.jpg"></img>

	    {/* 회원가입 */}
      <div className="row">
        <div className="col align-center flex-col sign-up">
          <div className="form-wrapper align-center">
            <form className="form sign-up">

            <div className="input-group">
            <i className="bx bx-mail-send"></i>
            <input
              type="email" 
              name="rgEmail"
              placeholder="Email"
              value={rgEmail}
              onChange={onRgEmailHandler}
            />

            </div>
            <div className="input-group">
              <i className="bx bxs-lock-alt"></i>
              <input
                type="password" 
                name ="rgPw"
                placeholder="Password"
                value={rgPw}
                onChange={onRgPwHandler}
                />
            </div>

              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input
                 type="text" 
                 name="rgName"
                 placeholder="Username"
                 value={rgName}
                 onChange={onRgNameHandler}
                 />
              </div>

							<div className="input-group">
                <i className="bx bxs-phone"></i>
                <input 
                  type="tel"
                  name="rgTel"
                  placeholder="Tel" 
                  value={rgTel}
                  onChange={onRgTelHandler}
                  />
              </div>
              {/* (isName && isEmail && isPassword) === true ? signUp() : alert('다시 확인해주세요') */}
                <button
                type="submit"
                onClick={signUp}
                >Sign up</button>
              <p>
                <span>Already have an account?</span>
                <b id="sign-in">&nbsp;Sign in here</b>
              </p>
              <p>
                <input type="checkbox" id="chk"/>&nbsp;
                <span>Consent to entrust handling of personal information</span>
                <b>&nbsp; <Link to ="/login/privacy">더보기</Link></b>
              </p>
            </form>
          </div>

		  {/* Icons */}
          <div className="form-wrapper">
            <div className="social-list align-center sign-up">
              <div className="align-center home-bg">
              <Link to ="/"><i className='bx bxs-home' ></i></Link>
              </div>
              <div className="align-center facebook-bg">
                <i className="bx bxl-facebook"></i>
              </div>
              <div className="align-center google-bg" >
                <a href={"http://localhost:8080/oauth2/authorization/google"}>
                  <i className="bx bxl-google"></i>
                </a>
              </div>
              <div className="align-center twitter-bg">
                <i className="bx bxl-twitter"></i>
              </div>
              <div className="align-center insta-bg">
                <i className="bx bxl-instagram-alt"></i>
              </div>
            </div>
          </div>
        </div>

				{/* Sing-In */}
        <div className="col align-center flex-col sign-in">
          <div className="form-wrapper align-center">

            <div className="form sign-in">
            <div className="input-group">
            <i className="bx bx-mail-send"></i>
            <input
              type="email" 
              name="email"
              placeholder="Email"
              value={email}
              onChange={onEmailHandler}
            />

            </div>
            <div className="input-group">
              <i className="bx bxs-lock-alt"></i>
              <input
                type="password" 
                name ="password"
                placeholder="Password"
                value={pw}
                onChange={onPwHandler}
                />
            </div>

              <button
                type="submit"
                onSubmit={onSubmit}
                onClick={signIn}
              >Sign in</button>
              <p>
                <span> Don't have an account? </span>
                <b id="sign-up">&nbsp; Sign up here</b>
              </p>
              
            </div>
          </div>

				{/* Icons */}
          <div className="form-wrapper">
            <div className="social-list align-center sign-in" >
              <div className="align-center home-bg">
                <Link to ="/"><i className='bx bxs-home' ></i></Link>
              </div>
              <div className="align-center facebook-bg">
                <i className="bx bxl-facebook"></i>
              </div>
              <div className="align-center google-bg" >
                <a href={"http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth2/redirect"} onChange={()=>{
                  alert('성공')
                  //accessToken = res.data.data.accessToken
                  localStorage.setItem("user", email)
                  //localStorage.setItem("token", res.data.data.accessToken)
                  getUser(email)
                  location.href('/')
                }}>
                  <i className="bx bxl-google"></i>
                </a>
              </div>
              <div className="align-center twitter-bg">
                <i className="bx bxl-twitter"></i>
              </div>
              <div className="align-center insta-bg">
                <i className="bx bxl-instagram-alt"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
		</>
	)
}




export default Login;

