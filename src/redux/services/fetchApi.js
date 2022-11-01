const fetchApi = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const req = await fetch(url);
  const jsonData = await req.json();
  return jsonData;
};

export default fetchApi;
