import Swal from "sweetalert2";

export function useSwal() {
  // update default options
  const Alert = Swal.mixin({
    allowOutsideClick: false,
    reverseButtons: true,
  });

  return {
    Alert,
  };
}