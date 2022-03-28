import React, {Component} from 'react';
import { FaPlay } from "react-icons/fa";

export class RunButton extends Component {

    render(){

    return(
        <div className='runButton button'>
            <a href="#" id="whitelink"><FaPlay onClick={this.props.runNodes}/></a>
        </div>
        )

    }
}

export default RunButton
