export const TITLE_CHANGE = "TITLE_CHANGE";


export const UpdateAppSubHeaderTitle = (title) => {
    return {
        type: "TITLE_CHANGE",
        payload: title
    }
}