import React from 'react';
import { Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import './BulletElement.css'
function BulletElement(props) {
    return <Row className="info-point">
        
        <FontAwesomeIcon style={{margin: 'auto', marginRight: '1%', width:"30px", height: 'auto' }} color="#FB552C" icon={faCheckCircle}></FontAwesomeIcon>
        <h4 className="info-5" style={{margin: 'auto', marginLeft: '0', height: 'auto'}}> 
            {props.value}
        </h4>
    </Row>;
}
export default BulletElement;