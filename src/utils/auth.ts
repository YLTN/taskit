import axios from "axios";

export default async function auth() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const { data } = await axios.get(import.meta.env.VITE_BACKEND_URL + "/user", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (data.error) {
    if (data.error == "User invalid.") {
      localStorage.removeItem("token");
      return null;
    }
    throw new Error(data.error);
  }

  return data;
}
