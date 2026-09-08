export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) {
    return
  }

  const { loggedIn, checked, fetchUser } = useDjangoAuth()

  if (!checked.value) {
    await fetchUser()
  }

  // redirect the user to the login screen if they're not authenticated
  if (!loggedIn.value) {
    return navigateTo('/login')
  }
})
