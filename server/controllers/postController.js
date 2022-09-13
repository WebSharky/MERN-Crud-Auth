import PostModal from '../models/post.js'
import UserModal from '../models/user.js'
import mongoose from "mongoose"


export const getAllPosts = async ( req, res) => {
    const posts = await PostModal.find()  
    
    try {
        res.status(200).json(posts)
       

    } catch (err) {
        res.status(404).json({ message: "Something went wrong", error: err });
    }
}


export const getPostsByUser = async ( req, res ) => {
    const { nickname } = req.params;
    const userExists = await UserModal.findOne({nickname})

  if (!userExists) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  const userPosts = await PostModal.find({ author: nickname });
  res.status(200).json(userPosts);
}

export const createPost = async ( req, res) => {
    const { title, text, author, image } = req.body
    if (!title | !text | !author | !image) {
        res.status(400)
        throw new Error('Please fill in all post details')
    }
    const post = {
        ...req.body,
        likes: 0,
        dislikes: 0,
        likers: [],
        dislikers: []
    }
    
    const newPost = new PostModal({
        ...post
    })
    try {
        await newPost.save();
        res.status(201).json(newPost)
        res.status(201)

    } catch (error) {
        res.status(404).json({message: "something went wrong"})
    }
   
}

export const updatePost = async ( req, res) => {
    const { author } = req.body
    const {id} = req.params
    try {

        const existedPost = await PostModal.findById(id)

        if (!existedPost.author === author) {
            res.status(400)
            throw new Error('You must own post to edit it')
        }
        
        const updatedPost = req.body
  
    const post = await PostModal.findByIdAndUpdate(id, updatedPost, { new: true })
    res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }  
}

export const deletePost = async ( req, res) => {
    const {id} = req.params
    try {
        const post = await PostModal.findById(id)
        if(!post) {
            res.status(400)
            throw new Error('Post does not exist')
        }
        await PostModal.findByIdAndRemove(id);
        res.json({ id });
        res.json({message: 'Post has been successfullly deleted.'})

    } catch (error) {
        res.status(404).json({message: 'Something went wrong while trying to remove post.'})
    }


    res.status(200).json({message: `Delete post ${req.params.id}`})
}


export const likePost = async ( req, res) => {
    const {id} = req.params
    const nickname = req.body.nickname
    try {
        const updatedPost = await PostModal.findById(id)
        
        if (updatedPost.likers.includes(nickname)) {
            //change status nr
            return res.status(400).json({ message: "You already like this post" })
        }
        updatedPost.likes = parseInt(updatedPost.likes) + 1
        updatedPost.likers.push(nickname)
        const likedPost = await PostModal.findByIdAndUpdate(id, updatedPost, { new: true })

    res.status(200).json(likedPost)

    } catch (error) {
        res.status(404).json({message: 'Something went wrong while trying to like post.'})
    }

}

export const dislikePost = async ( req, res) => {
    const {id} = req.params
    const nickname = req.body.nickname
    try {
        const updatedPost = await PostModal.findById(id)
        
        if (updatedPost.dislikers.includes(nickname)) {
            //change status nr
            return res.status(404).json({ message: "You already dislike this post" })
        }
        updatedPost.dislikes = parseInt(updatedPost.dislikes) - 1
        updatedPost.dislikers.push(nickname)
        const dislikedPost = await PostModal.findByIdAndUpdate(id, updatedPost, { new: true })

    res.status(200).json(dislikedPost)

    } catch (error) {
        res.status(404).json({message: 'Something went wrong while trying to dislike post.'})
    }

}



