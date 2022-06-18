import {Card, CardBody, CardText, CardImg, CardTitle} from 'reactstrap';
import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const AnimatedDisplayCard = ({item}) => {
    const {image, name, description} = item;
    const [toggle, setToggle] = useState(false);

    const animatedStyle = useSpring({
        opacity: toggle ? 1 : 0,
        transform: toggle ? 'scale(1,1)' : 'scale(1,0)',        //100% width, 100% heigh ELSE 100% width, 0% height.
        config: {duration: 500}
    })

    useEffect(() => {
        setToggle(true);        //cleanup/unmount
    }, [])                      //useEffect will only run the effect once when the component mounts due to the second argument of []

    return ( 
        <animated.div style={animatedStyle}>
            <Card>
                <CardImg src={image} alt={image}/>
                <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <CardText>{description}</CardText>
                </CardBody>
            </Card>
        </animated.div>
     );
}
 
export default AnimatedDisplayCard;