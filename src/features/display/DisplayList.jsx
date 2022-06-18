import { Col, Row } from "reactstrap";
import { selectFeaturedCampsite } from "../campsites/campsitesSlice";
import DisplayCard from './DisplayCard'
import { selectFeaturedPromotion } from './../promotions/promotionsSlice';
import { selectFeaturedPartner } from "../partners/partnersSlice";

const DisplayList = () => {
    const items = [selectFeaturedCampsite(), selectFeaturedPromotion(), selectFeaturedPartner()]
    return ( 
        <Row>
            {items.map((item, idx) => {
                return (
                    <Col md className="m-1" key={idx}>
                        <DisplayCard item={item}/>
                    </Col>
                )
            })}
        </Row>
     );
}
 
export default DisplayList;