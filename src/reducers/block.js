import { REQUEST_BLOCK } from '../actions/BlockAction';
const initialState = {
  block: ''
};
export default (state = initialState, action) => {
  switch (action.type) { 
    case REQUEST_BLOCK:
      return Object.assign({}, state, {
        block: action.block
      }); 
    default:
      return state
  }
}

 