import axios from "axios";

export const api = axios.create({
  baseURL: "https://challenge-d3set.herokuapp.com",
});
