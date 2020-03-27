export const ADD_MEMBER = "ADD_MEMBER";

export const addMember = (newMemberName, age,email) => {
  return {
    type: ADD_MEMBER,
    payload: { id: Date.now(),
               name: newMemberName,
               age: age,
               email: email }
  };
};
