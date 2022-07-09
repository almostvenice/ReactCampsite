import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import CampsiteCard from "./CampsiteCard";
import { selectAllCampsites } from "./campsitesSlice";
import Error from "../../components/Error";
import Loading from "../../components/Loading";

const CampsitesList = () => {
  const campsites = useSelector(selectAllCampsites); //gets a hold of the [state] inside the selectAllCampsites i.e useSelector(state => state.campsites.campsitesArray)
                                                     //must pass a function as its argument. the selectAllCampsites returns the array of campsites
  const isLoading = useSelector(state => state.campsites.isLoading);
  const errMsg = useSelector(state => state.campsites.errMsg);
  
  if (isLoading) {
    return (
      <Row>
        <Loading/>
      </Row>
    );
  }

  if (errMsg) {
    return (
      <Row>
        <Error errMsg={errMsg}/>
      </Row>
    );
  }

  return (
    <Row className="ms-auto">
      {campsites.map((campsite) => {   {/*iterate thru the campsites. for each one, create a <Col> with a <CampsiteCard/> within it*/}
        return (
          <Col 
            md="5" 
            className="m-4" 
            key={campsite.id}
          >
            <CampsiteCard campsite={campsite} /> 
          </Col>
        );
      })}
    </Row>
  );
};

export default CampsitesList;
