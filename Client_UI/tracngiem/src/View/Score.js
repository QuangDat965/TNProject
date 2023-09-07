import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faTimes,faUserCheck } from '@fortawesome/free-solid-svg-icons'


export default class Score extends React.Component {
    constructor(props){
        super(props);
    
    }

    handleClose = () => {
        this.props.changeState(false);
    }
    render() {
      const result = this.props.result
        return<div style={{marginLeft:'auto', marginRight:'auto'}} class="toast show">
        <div style={{backgroundColor:'#000'}} class="toast-header">
            <div style={{color:'#fff', lineHeight:'100%'}}>Socre</div>
            <button onClick={()=> this.handleClose()} style={{backgroundColor:'red',color:'#ffff'}} type="button" className="btn-close " ></button>
        </div>
        <div class="toast-body">
            <p>Total: <strong>{result.total} </strong></p>
            <p>Correct: <strong>{result.correct} <FontAwesomeIcon icon={faCheck} color='green' /></strong> </p>
            <p>Incorect: <strong>{result.incorrect}<FontAwesomeIcon icon={faTimes} color='red' />  </strong> </p>
            <p>Score: <strong>{result.score}<FontAwesomeIcon icon={faUserCheck} color='blue' /> </strong> </p>
        </div>
        </div>
      
    }
}