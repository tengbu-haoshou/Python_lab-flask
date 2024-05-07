
export const mapStateToProps = state => (
  {
    sessionId: state.sessionId,
  }
);

export const mapDispatchToProps = dispatch => (
  {
    updateSessionId: sessionId => dispatch(updateSessionId(sessionId)),
  }
);

export const UPDATE = 'UPDATE';

export const updateSessionId = sessionId => {
  return {
    type: UPDATE,
    payload: sessionId,
  }
}

const initialState = {
  sessionId: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        sessionId: action.payload,
	    };
    default:
      return state;
  }
}

export default reducer;
