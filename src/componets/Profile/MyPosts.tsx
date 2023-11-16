import React from 'react';
import s from './MyPosts.module.css';
import {Post} from "./MyPosts/Post/Post";
import {ProfilePageType} from "../../redux/profile-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {Textarea} from "../common/FormsControls/FormsControls";

type MyPostsType = {
    profilePage: ProfilePageType
    addPost: (newPostText: string) => void
}

type FormDataType = {
    newPostText: string
}

const maxLength10 = maxLengthCreator(10)

const AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} placeholder={'Enter your message for post'} component={Textarea}
                       validate={[requiredField, maxLength10]}/>
            </div>
            <div>
                <button>Add</button>
            </div>
        </form>
    )
}

const AddNewPostReduxForm = reduxForm<FormDataType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export const MyPosts = React.memo(({addPost, profilePage}: MyPostsType) => {
    const postsElements = profilePage.posts.map(p => (
        <Post key={p.id} message={p.message}
              likeCounts={p.likeCounts}/>))
    const onAddPost = (formData: FormDataType) => {
        addPost(formData.newPostText)
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostReduxForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
});
