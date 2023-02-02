export default function fetcher(url: string, data = undefined) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: data ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status > 399 && response.status < 200) {
      throw new Error();
    }
    return response.json();
  });
}

// async function updateUser(url: string, data: Args) {
//     await fetch("https://test-front-p6cqni7znq-uc.a.run.app", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data.arg),
//     });
//   }

// const fetcher = async (url, method = "GET", data = {}) => {
//   const options = {
//     method: method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   if (method === "POST") {
//     options.body = JSON.stringify(data);
//   }

//   const response = await fetch(url, options);
//   return response.json();
// };
