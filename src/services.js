import axios from "axios";

let api_base = 'https://api.exchangerate.host/';

export default class Exchangerate {
   static async getRates(base, symbols, amount) {
     const response = await axios.get(`${api_base}latest?base=${base}&symbols=${symbols}&amount=${amount}`);
     return response.data;
  }
}