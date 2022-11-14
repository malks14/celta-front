import axios from "axios";

const addUser = (payload) => {
  const config = {
    method: "POST",
    url: "https://localhost:3000/users/add-user",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { addUser };
