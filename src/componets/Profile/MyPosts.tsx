import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import {Post} from "./MyPosts/Post/Post";
import {ProfilePageType} from "../../redux/store";

type MyPostsType = {
    state: ProfilePageType
    addPost: () => void
    updateNewPostText: (e: string) => void
}

export const MyPosts = (props: MyPostsType) => {
    const postsElements = props.state.posts.map(p => <Post message={p.message} likeCounts={p.likeCounts}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>()

    const onAddPostHandler = () => {
        if (newPostElement.current) {
            props.addPost()
        }
    }

    const onPostChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value)
        props.updateNewPostText(e.currentTarget.value)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea placeholder={'Enter your message for post'}
                              ref={newPostElement}
                              onChange={onPostChangeHandler}
                              value={props.state.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPostHandler}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
};