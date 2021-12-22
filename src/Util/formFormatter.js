export default data => {
  const formData = new FormData();

  for (const key of Object.keys(data)) {
    if (Array.isArray(data[key])) {
      let index = 0;
      for (const item of data[key]) {
        formData.append(`${key}[${index}]`, item);
        index++;
      }
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};
