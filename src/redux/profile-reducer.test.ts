import {addPost, PostsType, profilePageReducer, ProfilePageType} from "./profile-reducer";

const testState: ProfilePageType = {
    posts: [
        {id: "1", message: 'Hi, how are you?', likeCounts: 15},
        {id: "2", message: 'It\'s my first post', likeCounts: 20},
        {id: "3", message: "It's my first post", likeCounts: 20},
    ] as Array<PostsType>,
    profile: null,
    status: "",
}

test('length of posts should be incremented', () => {
    const endState = profilePageReducer(testState, addPost('new post test'))

    expect(endState.posts.length).toBe(4)
    expect(endState.posts[3].message).toBe('new post test')
})