import { toast } from 'sonner'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastOptions {
  description?: string
  duration?: number
}

const toastMessages = {
  success: {
    title: '¡Éxito!',
  },
  error: {
    title: 'Error',
  },
  warning: {
    title: 'Advertencia',
  },
  info: {
    title: 'Información',
  },
}

export function useToast() {
  const showToast = (type: ToastType, message: string, options?: ToastOptions) => {
    const { title } = toastMessages[type]
    
    switch (type) {
      case 'success':
        toast.success(title, {
          description: message,
          ...options,
        })
        break
      case 'error':
        toast.error(title, {
          description: message,
          ...options,
        })
        break
      case 'warning':
        toast.warning(title, {
          description: message,
          ...options,
        })
        break
      case 'info':
        toast.info(title, {
          description: message,
          ...options,
        })
        break
    }
  }

  const success = (message: string, options?: ToastOptions) => 
    showToast('success', message, options)
  
  const error = (message: string, options?: ToastOptions) => 
    showToast('error', message, options)
  
  const warning = (message: string, options?: ToastOptions) => 
    showToast('warning', message, options)
  
  const info = (message: string, options?: ToastOptions) => 
    showToast('info', message, options)

  const promise = <T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string
      error: string
    }
  ) => {
    return toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    })
  }

  return {
    toast,
    success,
    error,
    warning,
    info,
    promise,
  }
}

export { toast }
