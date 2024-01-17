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

export function convertToDate(dateString: string) {
  const date = new Date(dateString);
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}