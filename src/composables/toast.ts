import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export const visible = ref(false)
export const message = ref('')
export const type = ref<ToastType>('info')

export const showToast = (msg: string, toastType: ToastType) => {
  message.value = msg
  type.value = toastType
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 3000)
}
