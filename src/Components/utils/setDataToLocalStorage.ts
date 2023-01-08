import { TProductPartialProps } from '../../types/types';

function setDataToLocalStorage(data:TProductPartialProps[]) {
  const localStorageData = JSON.stringify(data);
  window.localStorage.setItem('productsByTeamDiBu', localStorageData);
}

export default setDataToLocalStorage;
