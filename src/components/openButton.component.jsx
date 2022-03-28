import React, {Component} from 'react';
import { FaFolderOpen } from "react-icons/fa";

export class OpenButton extends Component {

    render(){

    return(
        <div className='openButton button'>
            <a href="#" id="whitelink"><FaFolderOpen onClick={this.props.loadNodes}/></a>
        </div>
        )

    }
}

export default OpenButton
