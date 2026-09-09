type DjangoUser = {
  id?: number
  name?: string
  email?: string
  username?: string
  [key: string]: unknown
}

const djangoApiUrl = 'http://localhost:8000'

export function useDjangoAuth() {
  const user = useState<DjangoUser | null>('django-user', () => null)
  const checked = useState('django-auth-checked', () => false)

  const loggedIn = computed(() => user.value !== null)

  async function fetchUser() {
    try {
      user.value = await $fetch<DjangoUser>(`${djangoApiUrl}/api-auth/user/`, {
        credentials: 'include'
      })
      return true
    } catch {
      user.value = null
      return false
    } finally {
      checked.value = true
    }
  }

  async function logout() {
    const csrfToken = useCookie('csrftoken')

    await $fetch(`${djangoApiUrl}/api-auth/logout/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrfToken.value ?? ''
      }
    })
    user.value = null
    checked.value = true
  }

  return { user, loggedIn, checked, fetchUser, logout }
}
