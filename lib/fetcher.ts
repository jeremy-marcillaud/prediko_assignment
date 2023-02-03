export default async function fetcher(url: string, data: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    data
  );

  if (response.status > 399 && response.status < 200) {
    throw new Error();
  }
  return response.json();
}
