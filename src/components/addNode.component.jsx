import React, {Component} from 'react';
import { FaStream, FaPlus, FaTimes, FaCommentDots, FaComments } from "react-icons/fa";

export class AddNode extends Component {

    render(){

    return(
        <div className='container'>
            <ul id='menu'>
                <a href="#menu" className="menu-button icon-open" title="Show Nav"><FaPlus /></a>
                <a href="#0" className="menu-button icon-close" title="Show Nav"><FaTimes/></a>
                <li className="menu-item">
                    <a href="#menu">
                        <FaCommentDots onClick={this.props.addMessage}/>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#menu">
                        <FaComments onClick={this.props.addChoices}/>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#menu">
                        <FaStream onClick={this.props.printButton}/>
                    </a>
                </li>
            </ul>
        </div>
        )

    }
}

export default AddNode
