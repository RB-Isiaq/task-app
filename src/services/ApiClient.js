export const postData = function (route, data = {}) {
  localStorage.setItem(route, JSON.stringify(data));
};
// export const postData = async function (
//   route = "",
//   data = {},
//   token = "",
//   method = ""
// ) {
//   const response = await fetch(`${API_BASE_URL}${route}`, {
//     method: method || "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },

//     body: JSON.stringify(data),
//   });

//   return response.json();
// };

export const getData = function (route) {
  return JSON.parse(localStorage.getItem(route));
};
// export const getData = async function (route = "", token = "") {
//   const response = await fetch(`${API_BASE_URL}${route}`, {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.json();
// };
