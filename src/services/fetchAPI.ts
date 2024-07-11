import axios from 'axios'

interface Params {
    baseUrl: string | undefined;
    headers : any;
    method: string;
}


export const fetchAPI = async (url: string, method: string, data?: any): Promise<any> =>{

  const token = localStorage.getItem("token");

  const config: Params = {
    baseUrl: process.env.NEXT_PUBLIC_API_HOST,
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    method: method
  }

  return await axios({
      ...config,
      url: `${config.baseUrl}${url}`,
      data
  }).then ( (response) => {
      return {
          status: response.status,
          data: response.data
      }
  }).catch((error) =>{
      console.log(error)
      return {
          status: error.status,
          data: error.response
      }
  })
}
