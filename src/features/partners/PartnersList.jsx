import { useSelector } from 'react-redux';
import {Col, Row} from 'reactstrap';
import Partner from './Partner';
import { selectAllPartners } from './partnersSlice';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

const PartnersList = () => {
    const partners = useSelector(selectAllPartners);
    const isLoading = useSelector(state => state.partners.isLoading);
    const errMsg = useSelector(state => state.partners.errMsg);

    return isLoading ? (    //conditial rendering with nested ternary operator 
        <Loading/>           // if isLoading is true then render the <Loading/> component
    ) : errMsg ? (          // else if errMsg is truthy (not an empty string) 
        <Error errMsg={errMsg}/>    //render the <Error/> component
    ) : (                           //else render the partners list component
        <Col className='mt-4'>
            <Row>
                {partners.map(partner => {
                    return (
                        <div className='d-flex mb-5' key={partner.id}>
                            <Partner partner={partner}/>
                        </div>
                    )
                })}
            </Row>
        </Col>
     );
}
 
export default PartnersList;