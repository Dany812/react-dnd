import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { requestBlock } from '../actions/BlockAction'; 

const HtmlTextAreaSpec = {
    drop() {
        return { name: 'HtmlTextArea' };
    }
};  

let collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
};

class HtmlTextArea extends Component {
    constructor(props) {
    super(props);
        this.Change = this.Change.bind(this);  
    }
   
    Change(event) {
        this.props.requestBlock(event.target.value); 
    }

    render() {

        const { canDrop, isOver, connectDropTarget } = this.props;
        const { block } = this.props.state;

        const isActive = canDrop && isOver; // при наведении 
        let backgroundColor = '#FFFFFF';
        if (isActive) {
            backgroundColor = '#F7F7BD';
        } else if (canDrop) { // если попали 
            backgroundColor = '#F7F7F7';
        }
        const style = {
            backgroundColor: backgroundColor
        };
        return connectDropTarget(
            <textarea id='textarea' className='html-text-area' style={style} value={block} onChange={this.Change}>                               
            </textarea>
        );
    }
}

HtmlTextArea.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    block: PropTypes.string
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


HtmlTextArea = DropTarget("snack", HtmlTextAreaSpec, collect)(HtmlTextArea);
export default  connect(mapStateToProps, mapDispatchToProps)(HtmlTextArea);