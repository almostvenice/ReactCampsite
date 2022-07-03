import { createSlice } from '@reduxjs/toolkit';
import { COMMENTS } from './../../app/shared/COMMENTS';

const initialState = {
    commentsArray: COMMENTS // array of the [COMMENTS] data
};

const commentsSlice = createSlice({ // create a slice of data with name 'comments'.
    name: 'comments',
    initialState,           // initialState: [initialState]
    reducers: {
        addComment: (state, action) => {    //addComment becomes an action of commentsSlice
            console.log('addComment action.payload: ', action.payload);
            console.log('addComment state.commentsArray: ', state.commentsArray);
            const newComment = {
                id: state.commentsArray.length + 1,    //id will = to the length of the current commentsArray
                ...action.payload                      //payload is = to the [comment] content from our submitted text in the comment form
            };
            state.commentsArray.push(newComment);      //push the [newComment] into the [commentsArray] 
        }
    }
});

export const commentsReducer = commentsSlice.reducer; // export to be used in Store

export const {addComment} = commentsSlice.actions;  //export the action to addComment which will be used in dispatch() as argument

const selectCommentsByCampsiteId = campsiteId => state => {  //passing in [campsiteId] to the function that will use the [state] and be returned to the useSelector that is using this [selectCommentsByCampsiteId] as its argument
    return state.comments.commentsArray.filter(comment => comment.campsiteId === parseInt(campsiteId)) //return from the [commentsArray] the comments for the campsite with the [campsiteId] that was passed

}
 
export default selectCommentsByCampsiteId;