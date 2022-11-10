
export const loadAccessToken = () => {
    try{
        const serializeState = localStorage.getItem('access_token');
        if( serializeState === null){
            return undefined;
        }
        return JSON.parse(serializeState);
    }catch(err){
        return undefined;
    }
}

export const loadRefreshToken = () => {
    try{
        const serializeState = localStorage.getItem('refresh_token');
        if( serializeState === null){
            return undefined;
        }
        return JSON.parse(serializeState);
    }catch(err){
        return undefined;
    }
}

export const saveTokens = (state:any) => {
    try{
        const accessToken = JSON.stringify(state.token.value.access);
        const refreshToken = JSON.stringify(state.token.value.refresh);
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
    } catch (err) {
    }
}