export default function fetcher(url: string, data: any) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, data).then(
    (response) => {
      if (response.status > 399 && response.status < 200) {
        throw new Error();
      }
      return response.json();
    }
  );
}
