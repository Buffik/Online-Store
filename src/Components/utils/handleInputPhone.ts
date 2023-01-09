function handleInputPhone(data: string) {
  if (data.length > 0) {
    const checkedStr = data.slice(0, 1);
    if (checkedStr === '+' && data.length > 2) {
      const lastChar = checkedStr.slice(-1);
      if (/[0-9]/.test(lastChar)) {
        console.log(true);
        return data;
      }
      return data.slice(0, data.length - 1);
    }
  }
  return data;
}

export default handleInputPhone;
