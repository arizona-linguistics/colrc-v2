const API_BASE_ADDRESS = 'http://localhost:4000';

export default class Api {
   static async getRoots() {
       const uri = API_BASE_ADDRESS + "/roots";

       return await fetch(uri, {
           method: 'GET'
       }).catch(error => console.log(error));
   }
}
