function handleLocalStorage() {
  const currentProducts = window.localStorage.getItem('productsByTeamDiBu');
  if (currentProducts) return JSON.parse(currentProducts);
  return [];
}

export default handleLocalStorage;
