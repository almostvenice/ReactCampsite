import { useSelector } from "react-redux/es/exports";
import { Container, Row } from "reactstrap";
import { useParams } from 'react-router-dom';
import { selectCampsiteById } from "../features/campsites/campsitesSlice";
import CampsiteDetail from "../features/campsites/CampsiteDetail";
import CommentsList from "../features/comments/CommentsList";
import SubHeader from "../components/SubHeader";
import Error from "../components/Error";
import Loading from "../components/Loading";


const CampsiteDetailPage = () => {
    const {campsiteId} = useParams();                   //const {campsiteId} MUST match with path='directory/:campsiteId' from the <Route/> in App.js
    const campsite = useSelector(selectCampsiteById(campsiteId));

    const isLoading = useSelector(state => state.campsites.isLoading);
    const errMsg = useSelector(state => state.campsites.errMsg);

    let content = null;
    if (isLoading) {
        content = <Loading/>;
    } else if (errMsg) {
        content = <Error errMsg={errMsg}/>
    } else {
        content = (
            <>
              <CampsiteDetail campsite={campsite}/>
              <CommentsList campsiteId={campsiteId}/>  
            </>
        )
    }
    return ( 
        <Container>
            {campsite && <SubHeader current={campsite.name} detail={true}/>} {/* must use conditial rendering because it will error out if there is no [campsite]*/}
            <Row>
                {content}
            </Row>
        </Container>
     );
}
 
export default CampsiteDetailPage;
