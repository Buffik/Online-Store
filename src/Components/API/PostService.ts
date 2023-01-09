import { TProductPartialProps } from '../../types/types';

export default class PostService {
  static async getById(id:number) {
    const URL = `https://dummyjson.com/products/${id}`;
    const result = await fetch(URL).then((response) => response.json());
    return result;
  }

  static async getCartItems(arr:TProductPartialProps[]) {
    const itemRequests = arr.map((item) => PostService.getById(item.id));
    const promises = await Promise.all(itemRequests);
    return promises;
  }

  static async getImgByURL(URL: string) {
    const response = await fetch(URL);
    const contentLength = Number(response.headers.get('Content-Length'));
    return contentLength;
  }

  static async getAllSizes(arr: string[]) {
    const imgSizes = arr.map((img) => PostService.getImgByURL(img));
    const promises = await Promise.all(imgSizes);
    return promises;
  }
}
