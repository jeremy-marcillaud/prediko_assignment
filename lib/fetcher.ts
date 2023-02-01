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
