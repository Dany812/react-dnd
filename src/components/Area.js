import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { requestBlock } from '../actions/BlockAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';  

const snackSpec = {
    beginDrag(props) {
        return {
            name: props.name
        };
    },
    endDrag(props, monitor) {
        const dragItem = monitor.getItem();
        const dropResult = monitor.getDropResult(); 
        if (dropResult) { 
            let htmlTextArea = document.getElementById('textarea');
            let item = dragItem.name;
            let value = htmlTextArea.value, 
                endIndex, 
                range, 
                doc = htmlTextArea.ownerDocument;
            if (typeof htmlTextArea.selectionStart == "number" && typeof htmlTextArea.selectionEnd == "number") {
                endIndex = htmlTextArea.selectionEnd;
                htmlTextArea.value = value.slice(0, endIndex) +'{{'+ item+ '}}' + value.slice(endIndex);
                //htmlTextArea.selectionStart = htmlTextArea.selectionEnd = endIndex + item.length;
            } else if (doc.selection != "undefined" && doc.selection.createRange) {
                htmlTextArea.focus();
                range = doc.selection.createRange();
                range.collapse(false);
                range.item = item;
                range.select();
            }
            props.requestBlock(htmlTextArea.value); 
        }
    }
}; 

let collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

class Area extends Component {
    render() { 
        const {  name, isDragging, connectDragSource } = this.props; 
        const opacity = isDragging ? 0.4 : 1;
        const style = {
            opacity: opacity
        };
        return (
            connectDragSource(
                <div className='block' style={style}>
                   {name}
                </div>
            )
        );
    }
}

Area.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  state: state.block
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestBlock
    },
    dispatch
  );

Area =DragSource('snack', snackSpec, collect)(Area);
export default  connect(mapStateToProps, mapDispatchToProps)(Area);
