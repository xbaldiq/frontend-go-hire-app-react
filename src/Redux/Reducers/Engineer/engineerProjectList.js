const initialState = {
    engineerProjectList: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  };
  
  const getProjectList = (prevState = initialState, action) => {
    switch (action.type) {
      case "ENG_GET_PROJECT_LIST_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "ENG_GET_PROJECT_LIST_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "ENG_GET_PROJECT_LIST_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          engineerProjectList: action.payload.data
        };
      default:
        return prevState;
    }
  };
  
  export default getProjectList;
  