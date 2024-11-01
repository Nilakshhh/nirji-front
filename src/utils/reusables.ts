export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    //console.log(buffer, "buff")
    let binary = '';
    const bytes = new Uint8Array(buffer);
    //console.log(bytes, "jj")
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    //console.log(window.btoa(binary), "gg");
    return window.btoa(binary);
  };