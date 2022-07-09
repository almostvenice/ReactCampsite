import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { validateCommentForm } from "../../utils/validateCommentForm";
import { postComment } from "./commentsSlice";


//Form for adding a comment to the details page
const CommentForm = ({ campsiteId }) => {
  const [modalOpen, setModalOpen] = useState(false); // modalOpen state is set to [false]

  const dispatch = useDispatch(); //conventional way to use useDispatch is to create a new const called dispatch to make it more readable

  const handleSubmit = (values) => {  // pass the [values] to extract everything submited to the form
    const comment = {
      campsiteId: parseInt(campsiteId),   
      rating: values.rating,
      author: values.author,
      text: values.commentText,               // text inside the text are for the comment
      date: new Date(Date.now()).toISOString()  //create a new [Date] object and set it to the time the form was submitted
    };
    
    dispatch(postComment(comment)); // dispatch the action [addComment(comment)] to update the state of the component i.e updated the commentsSlice.js state to include this [comment] in its [commentsArray]
    setModalOpen(false);  //when submitted the modal closes as the [modalOpen] is set to [false] by the [useState]/[setModalOpen]
  };
  return (
    <>
      <Button outline onClick={() => setModalOpen(true)}> {/*onClick the [modalOpen] is set to [true] */}
        <i className="fa fa-pencil fa-lg" /> Add Comment
      </Button>
      <Modal isOpen={modalOpen}> {/* if the [modalOpen] is [true] then the <Modal> is open*/}
        <ModalHeader toggle={() => setModalOpen(false)}> {/*will close the modal if you click the X toggle on the top right*/}
          Add Comment
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              rating: undefined,
              author: "",
              commentText: "",
            }}
            onSubmit={handleSubmit}
            validate={validateCommentForm}
          >
            <Form>
              <FormGroup>
                <Label htmlFor="rating">Rating</Label>
                <Field name="rating" as="select" className="form-control">
                  <option>Select...</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Field>
                <ErrorMessage name="rating">
                  {(msg) => <p className="text-danger">{msg}</p>} {/* for each error msg create a paragraph witht the msg in red color */}
                </ErrorMessage>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="author">Your Name</Label>
                <Field
                  name="author"
                  placeholder="Your Name"
                  className="form-control"
                />
                <ErrorMessage name="author">
                  {(msg) => <p className="text-danger">{msg}</p>}
                </ErrorMessage>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="commentText">Comment</Label>
                <Field
                  name="commentText"
                  as="textarea"
                  rows="12"
                  className="form-control"
                />
              </FormGroup>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CommentForm;
