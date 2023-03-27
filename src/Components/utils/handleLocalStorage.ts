import { TProductPartialProps } from '../../types/types';

function handleLocalStorage(): TProductPartialProps[] | [] {
  const currentProducts = window.localStorage.getItem('productsByTeamDiBu');
  if (currentProducts) return JSON.parse(currentProducts);
  return [];
}

export default handleLocalStorage;
