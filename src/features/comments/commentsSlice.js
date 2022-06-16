import { COMMENTS } from './../../app/shared/COMMENTS';

const selectCommentsByCampsiteId = campsiteId => {
    return COMMENTS.filter(comment => comment.campsiteId === parseInt(campsiteId))

}
 
export default selectCommentsByCampsiteId;