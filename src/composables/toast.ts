import { ref } from 'vue'

export const visible = ref(false)
export const message = ref('')

export const showToast = (msg: string) => {
  message.value = msg
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 3000)
}
