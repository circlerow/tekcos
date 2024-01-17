export const url = process.env.BE_URL || "http://localhost:2601";

export const registerUrl = url + "/register";
export const loginUrl = url + "/login";
export const getAllUserUrl = url + "/conversation/all-user";
export const userDataUrl = url + "/user";
export const currentCoversation = url + "/conversation";
export const createInfoUser = url + "/user-info/create"
export const updateInfoUser = url + "/user-info"
export const getInfoUser = url + "/user-info"
