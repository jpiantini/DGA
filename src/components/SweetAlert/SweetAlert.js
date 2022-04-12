import Swal from "sweetalert2";
import COLORS from "../../theme/Colors";
import './styles/SweetAlert.css'

export const SweetAlert = Swal.mixin({
    customClass: {
      title:'title',
      container:'message',
    },
    confirmButtonColor:COLORS.secondary,
  })