import { createSlice, nanoid, createAsyncThunk} from "@reduxjs/toolkit"
import postsService from "./postsService"
import { toast } from 'react-toastify'




const initialState = {
   posts: [],
   userPosts: [],
   status: 'idle',
   error: null,
   createPostStatus: 'idle'
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts', 
    async (_, thunkAPI) => {
    try {
        return await postsService.getAllPosts()
    } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
})


export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async (postData, thunkAPI) => { 
      try {
        const token = thunkAPI.getState().users.user.token
        return await postsService.createPost(postData, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

  export const fetchPostsByUser = createAsyncThunk(
    'posts/fetchPostsByUser',
    async (req, res, thunkAPI) => { 
        const { nickname } = req

      try {
        return await postsService.getPostsByUser(nickname)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

  export const deleteOwnedPost = createAsyncThunk(
    "posts/deleteOwnedPost",
    async ( id, thunkAPI, rejectWithValue ) => {
      try {
        const token = thunkAPI.getState().users.user.token
        toast.success("Chosen post has been deleted")
        return await postsService.deleteOwnedPost(id, token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  );




  export const updateOwnedPost = createAsyncThunk(
    "posts/updateOwnedPost",
    async ( postData, thunkAPI ) => {
      const id = postData._id
      try {
        const token = thunkAPI.getState().users.user.token
        const response = await postsService.updatePost(postData, id, token);
        toast.success(`Post ${id} has been updated successfully`)
        return response.data
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  );

  export const likePost = createAsyncThunk(
    "post/likePost",
    async (req, thunkAPI ) => {
      const { id, nickname } = req
      try {
        const token = thunkAPI.getState().users.user.token
        const response = await postsService.likePost({ id, nickname, token});
        return response.data;
      }catch (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)
        }
    }
  );

  export const dislikePost = createAsyncThunk(
    "post/dislikePost",
    async (req, thunkAPI ) => {
      const { id, nickname } = req
      try {
        const token = thunkAPI.getState().users.user.token
        const response = await postsService.dislikePost({ id, nickname, token});
        return response.data;
      }catch (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)
        }
    }
  );








const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // spróbuj wykasować post added
        postAdded: {
            reducer(state, action) {
                state.posts.concat([action.payload])
                },
            prepare(title, text, image, author) {
                return {
                    payload: {
                    _id: nanoid(),
                    title,
                    text,
                    author,
                    image,
                    createdAt: new Date().toISOString()               
                }
                }
            }
        },
    },
    extraReducers(builder) {
        builder
            //fetchPosts
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                
                const loadedPosts = action.payload
                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            //addNewPost
            .addCase(addNewPost.pending, (state, action) => {
                state.createPostStatus = 'loading'
                
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.createPostStatus = 'succeed'
                    state.posts.push(action.payload)
            })
            .addCase(addNewPost.rejected, (state, action) => {
                state.createPostStatus = 'failed'
                state.error = action.error.message
            })
            
            //fetchPostsByUser
            .addCase(fetchPostsByUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPostsByUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.userPosts = action.payload
            })
            .addCase(fetchPostsByUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            //Delete post
            .addCase(deleteOwnedPost.pending, (state, action) => {
              //zmień createPostStatus na single
              state.createPostStatus = 'loading'
              
          })
          .addCase(deleteOwnedPost.fulfilled, (state, action) => {
              state.createPostStatus = 'succeed'
              


                  ///    action.payload.data.id     < ===== napraw to żeby było elegancko
                  state.posts = state.posts.filter((post) => post._id !== action.payload.data.id) 
                  
          })
          .addCase(deleteOwnedPost.rejected, (state, action) => {
              state.createPostStatus = 'failed'
              state.error = action.error.message
          })

          //updateOwnedPost
          .addCase(updateOwnedPost.pending, (state, action) => {
            state.createPostStatus = 'loading'
            console.log('pending')
          })
          .addCase(updateOwnedPost.fulfilled, (state, action) => {
            state.createPostStatus = 'succeed'

            const {_id, title, text, image, author,likes, dislikes, likers, dislikers, createdAt}  = action.meta.arg
            const updatedPost = {
              title,
              text,
              image,
              author,
              _id,
              likes,
              dislikes,
              likers,
              dislikers,
              createdAt
            }
            
            
            state.posts = state.posts.map((post) =>
            post._id === _id ? updatedPost : post)

            state.userPosts = state.userPosts.map((userPost) =>
            userPost._id === _id ? updatedPost : userPost)
            
          })
          .addCase(updateOwnedPost.rejected, (state, action) => {
            state.createPostStatus = 'failed'
            state.loading = false;
            state.error = action.error.message
          })
          //likePost
          .addCase(likePost.pending, (state, action) => {
            //createPostStatus change on SinglePostStatus
            state.createPostStatus = 'loading'
          
          })
          .addCase(likePost.fulfilled, (state, action) => {
            state.createPostStatus = 'succeed'

            const {id, nickname}  = action.meta.arg
            
            state.posts = state.posts.map((post) => post._id === id ? {
              ...post,
              likers: post.likers.length > 1 ? [...post.likers].concat([nickname]) : [post.likers].concat([nickname]),
              likes: post.likes + 1
            } : post)
             
            state.userPosts = state.userPosts.map((userPost) =>
            userPost._id === id ? {
              ...userPost,
              likers: userPost.likers.length > 1 ? [...userPost.likers].concat([nickname]) : [userPost.likers].concat([nickname]),
              likes: userPost.likes + 1
            } : userPost)
            
          })
          .addCase(likePost.rejected, (state, action) => {
            state.createPostStatus = 'failed'
            state.loading = false;
            state.error = action.error.message
          })

          // Dislike post
           .addCase(dislikePost.pending, (state, action) => {
            //createPostStatus change on SinglePostStatus
            state.createPostStatus = 'loading'
          
          })
          .addCase(dislikePost.fulfilled, (state, action) => {
            state.createPostStatus = 'succeed'

            const {id, nickname}  = action.meta.arg
            
            state.posts = state.posts.map((post) => post._id === id ? {
              ...post,
              dislikers: post.dislikers.length > 1 ? [...post.dislikers].concat([nickname]) : [post.dislikers].concat([nickname]),
              dislikes: post.dislikes - 1
            } : post)
             
            state.userPosts = state.userPosts.map((userPost) =>
            userPost._id === id ? {
              ...userPost,
              dislikers: userPost.dislikers.length > 1 ? [...userPost.dislikers].concat([nickname]) : [userPost.dislikers].concat([nickname]),
              dislikes: userPost.dislikes + 1
            } : userPost)
            
          })
          .addCase(dislikePost.rejected, (state, action) => {
            state.createPostStatus = 'failed'
            state.loading = false;
            state.error = action.error.message
          })
         








    }
})

export const selectAllPosts = (state) => state.posts.posts
export const selectAllPostsOfUser = (state) => state.posts.userPosts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error

export const {postAdded} = postsSlice.actions

export default postsSlice.reducer