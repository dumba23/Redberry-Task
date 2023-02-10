const dataURItoBlob = (dataURI: string) => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  const a = new ArrayBuffer(byteString.length);
  const b = new Uint8Array(a);

  for (var i = 0; i < byteString.length; i++) {
    b[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([a], { type: mimeString });

  return blob;
};

export default dataURItoBlob;
