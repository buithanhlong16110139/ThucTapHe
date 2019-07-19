export const PROJECT_SHEME = {
  name: {
    notEmpty: {
      errorMessage: "PROJECT_NAME_IS_EMPTY"
    },
    // isLength: {
    //   options: [{ min: 2, max: 30 }],
    //   errorMessage: "INVAILD_PROJECT_NAME"
    // }
  }
};

export const ADD_MEMBERS_TO_PROJECT = {
  arrUserId: {
    notEmpty: {
      errorMessage: "ARRAY_USER_ID_IS_EMPTY"
    }
  },
  projectId: {
    notEmpty: {
      errorMessage: "PROJECT_ID_IS_EMPTY"
    }
  }
};
