const initialState = {
    engineerSkillList: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  };
  
  const getEngineerSkill = (prevState = initialState, action) => {
    switch (action.type) {
      case "GET_ENG_SKILL_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_ENG_SKILL_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "GET_ENG_SKILL_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          engineerSkillList: action.payload.data
        };
      default:
        return prevState;
    }
  };
  
  export default getEngineerSkill;
  