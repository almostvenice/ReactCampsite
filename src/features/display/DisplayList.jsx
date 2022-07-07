import { useSelector } from "react-redux/es/exports";
import { Col, Row } from "reactstrap";
import { selectFeaturedCampsite } from "../campsites/campsitesSlice";
import AnimatedDisplayCard from './AnimatedDisplayCard'
import { selectFeaturedPromotion } from './../promotions/promotionsSlice';
import { selectFeaturedPartner } from "../partners/partnersSlice";
import Error from "../../components/Error";
import Loading from "../../components/Loading";

const DisplayList = () => {
    const items = useSelector((state) => [selectFeaturedCampsite(state), selectFeaturedPromotion(state), selectFeaturedPartner(state)]);

    return ( 
        <Row>
            {items.map((item, idx) => {
                const { featuredItem, isLoading, errMsg } = item; //getting the item from the 3 selectFeatured... functions as an object
                if (isLoading) {
                    return <Loading key={idx} />
                }
                if (errMsg) {
                    return <Error errMsg={errMsg} key={idx}/>
                }

                return (
                    featuredItem && (           //this is now [featuredItem] instead of [item] since we get the props of [item]
                    <Col md className="m-1" key={idx}>
                        <AnimatedDisplayCard item={featuredItem}/>
                    </Col>
                    )
                )
            })}
        </Row>
     );
}
 
export default DisplayList;