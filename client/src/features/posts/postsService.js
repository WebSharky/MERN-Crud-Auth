import axios from 'axios'

const API_URL = 'http://localhost:5000/api/posts/'

// Create new goal
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, postData, config)

  return response.data
}


/// Chyba niepotrzebne bo to nie jest z tokenem
// Get user goals
const getAllPosts = async ( ) => {
  const response = await axios.get(API_URL)
  return response.data
}

const getPostsByUser = async ( nickname ) => {
  const response = await axios.get(`${API_URL}/user-posts/${nickname}`)
  return response.data
}

const updatePost = async(updatedPostData, id, token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.patch(`${API_URL}${id}`, updatedPostData, config)
  return response.data
}

const likePost = async({id, nickname, token}) => {

  const likeDetails = {
    id,
    nickname
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.patch(`${API_URL}${id}/like`, likeDetails, config)
  return response.data
}

const dislikePost = async({id, nickname, token}) => {

  const dislikeDetails = {
    id,
    nickname
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.patch(`${API_URL}${id}/dislike`, dislikeDetails, config)
  return response.data
}









const deleteOwnedPost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return await axios.delete(`${API_URL}${postId}`, config)
}

const postsService = {
  createPost,
  getAllPosts,
  getPostsByUser,
  updatePost,
  deleteOwnedPost,
  likePost,
  dislikePost
}

export default postsService