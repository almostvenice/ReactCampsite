import { Col, Row, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

//BreadCrumbs
const SubHeader = ({ current, detail }) => {
    return ( 
        <Row>
            <Col>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/'>Home</Link>
                    </BreadcrumbItem>
                    {detail && (                //if there is a detail value (= truthy) then display the following:
                        <BreadcrumbItem>
                            <Link to='/directory'>Directory</Link>
                        </BreadcrumbItem>
                    )}
                    <BreadcrumbItem active>{current}</BreadcrumbItem> {/* Displays the breadcrumb as active and displays the current breadcrumb name*/}
                </Breadcrumb>
                <h2>{current}</h2>
                <hr />
            </Col>
        </Row>
     );
}
 
export default SubHeader;