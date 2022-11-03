export const camera:any = () => {
    if(window.ReactNativeWebView){
        window.ReactNativeWebView.postMessage("camera");
    }
}

export const gallery:any = () => {
    if(window.ReactNativeWebView){
        window.ReactNativeWebView.postMessage("gallery");
    }
}

export const imagePicker:any = () => {
    if(window.ReactNativeWebView){
        window.ReactNativeWebView.postMessage("imagePicker");
    }
}