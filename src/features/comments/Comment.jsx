import formatDate from './../../utils/formatDate';

//an individual comment
const Comment = ({comment}) => {
    const { text: commentText, rating, author, date } = comment;
    return ( 
        <p>
            {commentText}
            <br />
            {rating}/5 stars -- {author}, {formatDate(date)}
        </p>
     );
}
 
export default Comment;