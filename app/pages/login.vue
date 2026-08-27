<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const { loggedIn, user, fetch: refreshSession } = useUserSession()

const toast = useToast()

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox'
}]

const providers = [{
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  onClick: () => {
    toast.add({ title: 'GitHub', description: 'Login with GitHub' })
  }
}]

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required')
})

type Schema = z.output<typeof schema>


async function getCsrfToken() {
  await $fetch('http://localhost:8000/api-auth/csrf/', {
        credentials: 'include'
      })

  const csrfToken = useCookie('csrftoken')
  return csrfToken
}

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    const csrfToken = await getCsrfToken()

    await $fetch('http://localhost:8000/api-auth/login/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrfToken.value ?? ''
      },
      body: payload.data,
    })

    // Refresh the session on client-side and redirect to the home page
    await refreshSession()
    await navigateTo('/dashboard')
  } catch (error) {
    console.error(error)
    alert('Bad credentials')
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Login"
        description="Enter your credentials to access printer data."
        icon="i-lucide-user"
        :fields="fields"
        :providers="providers"
        separator="or"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>

