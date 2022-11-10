import {useEffect, useState} from "react"
import axios from "axios"
import UpLoad from '../postReg/Upload';
import {Link} from "react-router-dom";
import Delete from "../postReg/Delete";
import { useSelector,useDispatch } from "react-redux";
import { setPostAll, setReply } from '../../store/Store';
import Edit from "../postReg/Edit";
import CommentDel from "./CommentDel";


function Content({i}){
     // Img 미리보기
    const [ imgs, setImgs ] = useState('')
    const [ previewImg, setPreviewImg ] = useState('')
    // 빈 댓글 
    const [commentArray, setCommentArray] = useState([])
    let [users, setUsers] = useState([]);
    const[post,setPost] = useState([])
   


    // base_URL
    const base_URL = "http://localhost:8080"

    // mainImg useSelector
    let postAll= useSelector((state)=>state.postAll.postAllList)    
    // 댓글 useSelector
    let reply = useSelector((state)=>state.reply.replyList)
    let dispatch = useDispatch()


    // MainImg, Reply dispatch
    // useEffect(()=>{
    //     dispatch(fetchReply())
    // },[])
    


    // 댓글
    const [comment, setComments] = useState([])
    
    const postCommentSubmit = (e) => {
        e.preventDefault()
        setCommentArray(a=>[comment])
        setComments('')


        const headers = {
            'Content-type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
        axios.post(`http://localhost:8080/api/comment/register`,{
            users: users,
            pid : postAll[i].pid,
            comment : comment,

        } ,{headers},)
            .then(res=>{
            })
    }

    const onHandleComment = e =>{
			e.preventDefault()
        setComments(e.currentTarget.value)
    }

    useEffect(()=>{
        axios.get(base_URL + "/findUserByEmail/" + localStorage.getItem("user"))
            .then(res=>{
                setUsers(res.data.data)
            })
    },[])

    // 카테고리별 페이지
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let category = params.get("category")

        if (category === null) {
            axios.get(base_URL+ `/api/post`).then(
                res => {
                })
        } else if (category) {
            axios.get(base_URL + `/api/post/category?category=` + category)
            .then(res => {
                dispatch(setPostAll([...res.data.list]))
                }
            )
        }
    }, [])
    

    // 댓글
    useEffect(()=>{
        axios.get('http://localhost:8080/api/comment/all')
        .then((res) => {
          dispatch(setReply([...res.data.list]));
        })
        .catch((err) => {
          console.log(err);
        })
    },[])

    return (
        <>

            <main className="main-container">
                <section className="content-container">
                    <div className="content">
                        <div className="posts"> {/*4줄까지 */}
                            <article className="post">        
                                <div className="post__header">
                                    <div className="post__profile">
                                        <Link to="#" className="post__avatar">
                                            <img src="assets/Main/user.png" alt="User Picture" />
                                        </Link>
                                        <span>{postAll[i].username}</span>
                                        {/* Upload*/}
                                        <UpLoad 
                                            imgs={imgs}
                                            setImgs={setImgs}
                                            previewImg={previewImg}
                                            setPreviewImg={setPreviewImg}
                                        ></UpLoad>
                                        {/* Edit */}
                                        <Edit
                                            i={i}
                                            imgs={imgs}
                                            setImgs={setImgs}
                                            previewImg={previewImg}
                                            setPreviewImg={setPreviewImg}
                                        ></Edit>
                                        {/* Delete */}
                                        <Delete i={i}></Delete>
                                    </div>
                                </div>
                                <div className="post__content">
                                    <div className="post__medias" >
                                        <img src={`assets/Img/${postAll[i].filePath}`} 
                                        
                                        alt="" />
                                    </div>
                                </div>
                                <div className="post__footer">
                                    <div className="post__buttons">
                                        <button className="post__button">
                                            <img src="assets/Main/chat_btn.png" alt="" />
                                        </button>
                                        <button className="post__button">
                                            <img src="assets/Main/love_btn.png" alt="" />
                                        </button>
                                        <button className="post__button post__button--align-right">
                                            <img src="assets/Main/more_btn.png" alt="" />
                                        </button>
                                    </div>
                                    <div className="post__infos"   >
                                        <div className="post__title">
                                            <span>{postAll[i].title}</span>
                                        </div>
                                        <div className="post__description">
                                            <span>{postAll[i].content}</span>
                                        </div>
                                        <div className="post__border">
                                        </div>
                                        {/*
        <!-- 댓글 --> */}
                                        <div>
                                            <div className="comment_list">
                                                {
                                                    reply
														.filter((value)=>value.pid === postAll[i].pid)
														.map((a,i)=>{
                                                        return(
                                                            <div key={a.cid}>
                                                                <em>{a.username}</em>
                                                                &nbsp;&nbsp;:
                                                                <span>{a.comment}</span>
                                                                <CommentDel a={a}></CommentDel>
                                                            </div>)
                                                    })																							
                                                }
                                                
                                            </div>
                                        </div>


                                        <form onSubmit={postCommentSubmit}>
                                            <section className="post_comment_wrap" >
                                                <input
                                                    id="post_comment_input"
                                                    type="text"
                                                    placeholder="댓글 달기..."
                                                    value={comment}
                                                    onChange={onHandleComment}
                                                />
                                                <button
                                                    className="post_comment_btn"
																										onClick={()=>{
																										window.location.reload('/')
																									}}
                                                >
                                                    <i className='bx bx-send' ></i>
                                                </button>
                                            </section>
                                        </form>
                                        <span className="post__date-time">more</span>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

            </main>
        </>

    )
}

export default Content