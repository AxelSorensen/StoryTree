import React, {useState, Fragment} from 'react';
import AddNode from './addNode.component';
import RunButton from './runButton.component';
import '../App.css';
import ReactFlow, {removeElements, addEdge, Background, Controls, MiniMap} from 'react-flow-renderer';
import SaveButton from './saveButton.component';
import OpenButton from './openButton.component';

//Variables
const newNodeSpacing = 50;
var savedNodes = {};

//The elements that the canvas should start with
const initialElements = [
    {id: '1', type: 'input', data:{label: 'Start'}, position: {x:0,y:0}}
]
const onLoad = (reactFlowInstance) =>  {
    reactFlowInstance.fitView();
}

//This function creates a node Object and calls the playnode function on it at the end
function runNodes(nodes) {
    var nodeObject = {};
    for(let i = 0; i < nodes.length;i++) {
        if(!nodes[i].id.includes('reactflow__edge')) {
        let index = nodes[i].id;
        nodeObject[index] = [];
        }
    }
    console.log(nodeObject);
    //console.log("length" + Object.keys(nodeObject)[0]);
    
    for(let i = 0; i < Object.keys(nodeObject).length;i++) {
        //console.log("looking for type " + (Object.keys(nodeObject)[i].id) + " connections" );
        for(let i_ = 0; i_ < nodes.length;i_++) {
            if(nodes[i_].id.includes(`reactflow__edge-${Object.keys(nodeObject)[i]}null`)) {
                nodeObject[Object.keys(nodeObject)[i]].push(nodes[i_].target);
            }
        }
    }
    playNodes(nodeObject, nodes,2);
}

//This function goes through the node object and plays out the "game" in an alert
function playNodes(nodeObject, nodes, currentNode) {
    var message = `Kamila: "${nodes[currentNode-1].data.label}"`
    message += "\r\n";
    for(let i = 0; i < nodeObject[currentNode].length; i++) {
        message += "\r\n";
        message = message.concat(`(${i+1}): ${nodes[nodeObject[currentNode][i]-1].data.label}`);
    }
    var choice = prompt(message);
    playNodes(nodeObject, nodes, nodeObject[nodeObject[currentNode][choice-1]][0]);

}

const MindNode = () => {

    //Code for making the reactflow work
    let selectionId;
    var [elements, setElements] = useState(initialElements);
    const [name, setName] = useState("");
    const onElementsRemove = (elementsToRemove) => {
        if(elementsToRemove[0].data.label != 'Start') {
    setElements((els) => removeElements(elementsToRemove, els));
        }
    };

    const onNodeDragStop = (event, node) => {
        elements[node.id-1].position = node.position;
      };
    
    const onSelectionChange = (element) => {
        if(element) {
            selectionId = element[0].id;


        } else {
            selectionId = null;
            }

            
        console.log(selectionId);
    }

    //This function saves the current nodeobject
    function saveNodes() {
        var name = prompt("What should your saved file be called?");
        savedNodes[name] = elements;
        console.log(savedNodes);
    }

    //This function loads saved nodes and displays them on the screen (in their saved state)
    function loadNodes() {
        console.log(Object.keys(savedNodes).length);
        var message = "";
        let savedNodeObject = [];
        for(let i = 0; i < Object.keys(savedNodes).length; i++) {
            message += "\r\n";
            message = message.concat(`(${i+1}): ${Object.keys(savedNodes)[i]}`);
        }
        console.log(savedNodes[Object.keys(savedNodes)[0]][1]);
        //console.log(savedNodes[Object.keys(savedNodes)[file-1]].length);
        var file = prompt(message);
        for(let i = 0; i < savedNodes[Object.keys(savedNodes)[file-1]].length;i++) {
            savedNodeObject = savedNodeObject.concat(savedNodes[Object.keys(savedNodes)[file-1]][i]);
        }
        console.log(savedNodeObject);
        setElements(savedNodeObject);
    }
    
    //This function adds a node
    const addNode = (nodeType) => {
        let name = prompt('Enter Node Text');
        if(name == null) {
            return;
        }
        let selectedNode = getLastNodeIndex();
        if(selectionId) {
            selectedNode = selectionId-1;
        }
        
        setElements(e => e.concat({
            id: (e.length+1).toString(), type: 'default',
            data: {label: `${name}`},
            position: {x: elements[selectedNode].position.x, y: elements[selectedNode].position.y + newNodeSpacing},
            targetPosition: 'top', className: `${nodeType}`
        }));
        
        //if a node is selected the new node should be tied to the selected one
        if(selectionId) {
            setElements(e => e.concat({
                id: `reactflow__edge-${selectionId}null-${e.length}null`, source: selectionId.toString(), sourceHandle: null, target: (e.length).toString(), targetHandle: null
            }));
        }
    };

    //This function gets the latest node
    function getLastNodeIndex() {
        let index;
        for(let i = elements.length-1; i >= 0; i--) {
            if(elements[i].position) {
                index = i;
                break;
            }
        }
        return index;
    }

    function printLine() {
        console.log(elements);
    }

    const onConnect = (params) => setElements(e => addEdge(params,e));
    
    return(
        <Fragment>
            <ReactFlow
            elements={elements}
            onElementsRemove={onElementsRemove}
            onNodeDragStop={onNodeDragStop}
            onSelectionChange={onSelectionChange}
            deleteKeyCode={46} /* 'delete'-key */
            onLoad={onLoad}
            style={{width: '100%', height: '100vh'}}
            onConnect = {onConnect}
            connectionLineStyle={{stroke: "#ddd", strokeWidth: 2}}
            connectionLineType = "bezier"
            snapToGrid = {true}
            snapGrid={[16,16]}
            >
                <Background
                color="#888"
                gap={16}
                />
                <MiniMap 
                nodeColor={n=>{
                    if(n.type === 'input') return 'blue';
                    else if(n.className.includes('respons')) return 'green';
                    
                    return 'grey'
                }}
                />
                <Controls />
                </ReactFlow>
                <AddNode addMessage={() => addNode('respons')} addChoices={() => addNode('choice')} printButton={printLine}/>
                <RunButton runNodes={() => runNodes(elements)}/>
                <SaveButton saveNodes={saveNodes}/>
                <OpenButton loadNodes={loadNodes}/>
        </Fragment>
    )
}

export default MindNode;