import { TProductPartialProps } from '../../types/types';

export default class PostService {
  // static async getAll(limit = 10, page = 1) {
  //   const response = await axios.get(
  //     'https://jsonplaceholder.typicode.com/posts',
  //     {
  //       params: {
  //         _limit: limit,
  //         _page: page,
  //       },
  //     }
  //   );
  //   return response;
  // }

  static getById(id:number) {
    const URL = `https://dummyjson.com/products/${id}`;
    return fetch(URL).then((response) => response.json());
  }

  static async getCartItems(arr:TProductPartialProps[]) {
    let itemRequests = [];
    itemRequests = arr.map((item) => PostService.getById(item.id));
    const promises = await Promise.all(itemRequests);
    return promises;
  }

  // static async getCommentsByPostId(id) {
  //   const response = await axios.get(
  //     `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  //   );
  //   return response;
  // }
}
