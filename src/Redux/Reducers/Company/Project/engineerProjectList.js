const initialState = {
    assignedProject: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  };
  
  const getAssignedProject = (prevState = initialState, action) => {
    switch (action.type) {  
      case "COM_GET_ASSIGNED_PROJECT_LIST_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "COM_GET_ASSIGNED_PROJECT_LIST_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "COM_GET_ASSIGNED_PROJECT_LIST_FULFILLED":
        // console.log('fulfilled',action.payload)
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          assignedProject: action.payload.data.data
        };
      default:
        return prevState;
    }
  };
  
  export default getAssignedProject;
  