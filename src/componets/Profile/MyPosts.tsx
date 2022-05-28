import React from 'react';
import s from './MyPosts.module.css';
import {Post} from "./MyPosts/Post/Post";
import {PostsType} from "./../../redux/state"

type MyPostsType = {
    posts: Array<PostsType>
    callbackAddPost: (message: string) => void
}

export const MyPosts = (props: MyPostsType) => {
    const postsElements = props.posts.map(p => <Post message={p.message} likeCounts={p.likeCounts}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        if (newPostElement.current) {
            props.callbackAddPost(newPostElement.current.value)
            newPostElement.current.value = ""
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
                </div>
                <div>
                    <button onClick={addPost}>addPost</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
};