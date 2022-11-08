import { Buffer } from "buffer";

// 프로필 사진 변경 시 이름이 같으면 변경이 안되서 이름 랜덤 생성
export function makeid(length: number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // base64 코드를 이미지 파일로 변경
  export const dataURLtoFile = (dataurl: string, fileName: string) => {
    const bstr = Buffer.from(dataurl, "base64");
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr[n];
    }

    return new File([u8arr], fileName, { type: "image/jpeg" });
  };

  