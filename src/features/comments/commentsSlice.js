import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { COMMENTS } from '../../app/shared/oldData/COMMENTS';
import { baseUrl } from '../../app/shared/baseUrl';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const response = await fetch(baseUrl + 'comments');
        if (!response.ok) {
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();
        return data;
    }

)

export const postComment = createAsyncThunk(
    'comments/postComment',
    async (comment, {dispatch}) => {
        const response = await fetch(
            baseUrl + 'comments',
            {
                method: 'POST',
                body: JSON.stringify(comment),
                headers: {'Content-Type': 'application/json'}
            }   
        );
        if (!response.ok) {
            return Promise.reject(response.status);
        }
        const data = await response.json();
        dispatch(addComment(data))

    }
)

const initialState = {
    commentsArray: [], // array of the [COMMENTS] data
    isLoading: true,
    errMsg: ''
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
    },
    extraReducers: {
        [fetchComments.pending]: state => {
            state.isLoading = true;
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.commentsArray = action.payload;
        },
        [fetchComments.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch Failed';
        },
        [postComment.rejected]: (state, action) => {
            // state.isLoading = false;
            alert(
                "Your comment could not be posted\nError: " +
                (action.error ? action.error.message : 'Fetch failed')
            );
        }
    }
});

export const commentsReducer = commentsSlice.reducer; // export to be used in Store

export const {addComment} = commentsSlice.actions;  //export the action to addComment which will be used in dispatch() as argument

const selectCommentsByCampsiteId = campsiteId => state => {  //passing in [campsiteId] to the function that will use the [state] and be returned to the useSelector that is using this [selectCommentsByCampsiteId] as its argument
    return state.comments.commentsArray.filter(comment => comment.campsiteId === parseInt(campsiteId)) //return from the [commentsArray] the comments for the campsite with the [campsiteId] that was passed

}
 
export default selectCommentsByCampsiteId;