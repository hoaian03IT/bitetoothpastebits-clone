import axios from "axios";

export const loginApi = async (payload) => await axios.post(`/user/login`, payload);
export const registerApi = async (payload) => await axios.post(`/user/register`, payload);
export const fetchAccessTokenApi = async (payload) => await axios.post("/user/refresh-token", payload);
export const filterProductApi = async (queryType = "all", queryName = "all") =>
    await axios.get(`/products/filter-products?type=${queryType}&name=${queryName}`);
export const fetchFeaturedProductsApi = async () => await axios.get("/products/featured-products");
export const fetchDetailProductApi = async (type, name) => await axios.get(`/products/detail/${type}/${name}`);
