// @ts-nocheck
import axios from "axios";
import { BASE_URL } from "./URL";
export const PutAPI = async (url, key, postData) => {
  let config = {
    headers: {
      accessToken: localStorage.getItem("accessToken"),
    },
  };
  try {
    let res = await axios.put(
      BASE_URL + `${url}?feature=${key}`,
      postData,
      config
    );
    return res;
  } catch (error) {}
};
