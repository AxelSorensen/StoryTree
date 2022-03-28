import React, {Component} from 'react';
import { FaSave } from "react-icons/fa";

export class SaveButton extends Component {

    render(){

    return(
        <div className='button saveButton'>
            <a href="#" id="whitelink"><FaSave onClick={this.props.saveNodes}/></a>
        </div>
        )

    }
}

export default SaveButton
