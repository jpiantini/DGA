export const TITLE_CHANGE = "TITLE_CHANGE";
export const SHOW_GLOBAL_LOADING = "SHOW_GLOBAL_LOADING";
export const HIDE_GLOBAL_LOADING = "HIDE_GLOBAL_LOADING";


export const UpdateAppSubHeaderTitle = (title) => {
    return {
        type: TITLE_CHANGE,
        payload: title
    }
}

export const ShowGlobalLoading = (message) => {
    return {
        type: SHOW_GLOBAL_LOADING,
        payload: message
    }
}

export const HideGlobalLoading = () => {
    return {
        type: HIDE_GLOBAL_LOADING,
    }
}