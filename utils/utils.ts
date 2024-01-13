import axios from "axios";

export function getHeaders(accessToken: string | null) {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
}

export  async function getUrl(url: string, headers: any) {
    const response =  await axios.get(url, headers);
    return response.data;
}

export async function postUrl(url: string, data: any, headers: any) {
    const response = await axios.post(url, data, headers);
    return response.data;
}


export function sleep(ms: number | undefined) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
