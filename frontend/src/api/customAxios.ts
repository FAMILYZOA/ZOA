import axios, { AxiosInstance } from "axios";

// .env 파일에 담아야 할까요
const SERVER = "https://k7b103.p.ssafy.io/api/v1/";

export const AuthRefresh = async (refresh:any) => {
  // 0. 이 메서드는 어떤 기능 실행 중 401에러가 뜨고, code가 'token_not_valid'일 때 실행됩니다.

  // 1. refresh 토큰 불러오기
  const refreshForm = new FormData();
  refreshForm.append("refresh", refresh);
  if (refresh) {
    const response = await customAxios.post("/accounts/token_refresh/", refreshForm);

    if(response.status === 200){
      return response.data;
    }else if(response.status === 401){
      return undefined;
    }
  }
};

export const customAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER}`,
});
