const baseEndpoint = "https://reqres.in/api";

export const fetchData = async (endpoint: string) => {
  try {
    const resp = await fetch(baseEndpoint + endpoint);
    const json = await resp.json();

    return json.data;
  } catch (error) {
    throw error;
  }
};
