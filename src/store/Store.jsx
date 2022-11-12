import { configureStore, createSlice} from '@reduxjs/toolkit';

// Reply Slice
let reply  = createSlice({
    name : 'reply',
    initialState : {replyList:[]},
    reducers:{
        setReply:(state,action)=>{
            state.replyList = action.payload
        }
    },

})
// Reply payload
// export const fetchReply = () => {
//     return async(dispatch)=>{
//         axios.get("http://localhost:8080/api/comment/all")
//         .then((res) => {
//           dispatch(setReply([...res.data.list]));
//           console.log(reply)
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

export const {setReply} = reply.actions;

// postAll Slice
let postAll  = createSlice({
  name : 'postAll',
  initialState : {postAllList:[]},
  reducers:{
      setPostAll:(state,action)=>{
          state.postAllList = action.payload
      }
  },

})

//mainImg payload
// export const fetchMainImg = () => {
//   return (dispatch)=>{
//       axios.get('http://localhost:8080/api/post')
//       .then((res) => {
//         dispatch(setMainImg([...res.data.list]));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// };
export const {setPostAll} = postAll.actions;


// Upload Post Title Slice
let postTitle  = createSlice({
  name : 'postTitle',
  initialState : {postTitleList:[]},
  reducers:{
      setPostTitle:(state,action)=>{
          state.postTitleList = action.payload
      }
      
  },
})
export const {setPostTitle} = postTitle.actions;

// Upload Post content Slice
let postContent  = createSlice({
  name : 'postContent',
  initialState : {postContentList:[]},
  reducers:{
      setPostContent:(state,action)=>{
          state.postContentList = action.payload
      }
      
  },
})

export const {setPostContent} = postContent.actions;




// Search filter Slice
let searchImg  = createSlice({
  name : 'searchImg',
  initialState : {searchList:[]},
  reducers:{
      setSearchImg:(state,action)=>{
          state.searchList = action.payload
      }
  },
})

export const {setSearchImg} = searchImg.actions;



//configureStore
export default configureStore({
    reducer: {
        reply : reply.reducer,
        postAll : postAll.reducer,
        postTitle : postTitle.reducer,
        postContent : postContent.reducer,
        searchImg : searchImg.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  })

  