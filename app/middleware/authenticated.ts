export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()

  // redirect the user to the login screen if they're not authenticated
  if (!loggedIn.value) {
    return '/login'
  }
  else {
    return '/user'
  }
})
