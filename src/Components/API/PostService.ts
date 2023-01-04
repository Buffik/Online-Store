import { TProductPartialProps } from '../../types/types';

export default class PostService {
  static async getById(id:number) {
    const URL = `https://dummyjson.com/products/${id}`;
    const result = await fetch(URL).then((response) => response.json());
    return result;
  }

  static async getCartItems(arr:TProductPartialProps[]) {
    let itemRequests = [];
    itemRequests = arr.map((item) => PostService.getById(item.id));
    const promises = await Promise.all(itemRequests);
    return promises;
  }
}
