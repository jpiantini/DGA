import COLORS from "../../theme/Colors"

export const variantStatus = [
    {
        id:"Completada",
        variant:"success"
    },
    {
        id:"Cancelada",
        variant:"rejected"
    },
    {
        id:"En proceso",
        variant:"inProcess"
    }
]

export const statusColors = {
    info: COLORS.notificationComplete,
    success:COLORS.notificationSuccess,
    warning:COLORS.notificationWarning,
    danger:COLORS.notificationError,
}