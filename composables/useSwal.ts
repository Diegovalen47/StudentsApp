import Swal from 'sweetalert2'

export function useSwal() {
  const Alert = Swal.mixin({
    confirmButtonColor: '#0A2647',
    denyButtonColor: '#2C74B3',
    backdrop: 'rgba(0, 78, 255, 0.2)',
  })

  return {
    Alert,
  }
}
