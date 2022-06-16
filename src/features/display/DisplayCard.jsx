import {Card, CardBody, CardText, CardImg, CardTitle} from 'reactstrap';

const DisplayCard = ({item}) => {
    const {image, name, description} = item;
    return ( 
        <Card>
            <CardImg src={image} alt={image}/>
            <CardBody>
                <CardTitle>{name}</CardTitle>
                <CardText>{description}</CardText>
            </CardBody>
        </Card>
     );
}
 
export default DisplayCard;