import Cookies from "js-cookie";
const jwt = Cookies.get("token");
export const token = `Bearer ${jwt}`;
