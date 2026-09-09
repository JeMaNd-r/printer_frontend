<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const { fetchUser } = useDjangoAuth()

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

// Login submission handler
async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    const csrf = await $fetch<{ csrfToken: string }>(
      'http://localhost:8000/api-auth/csrf/',
      {
        credentials: 'include'
      }
    )

    await $fetch('http://localhost:8000/api-auth/login/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrf.csrfToken
      },
      body: {
        username: payload.data.email,
        password: payload.data.password
      }
    })

    await fetchUser()
    await navigateTo('/')
  } catch (error: unknown) {
    const status =
    typeof error === 'object' &&
    error !== null &&
    'response' in error
      ? (error.response as { status?: number })?.status
      : undefined
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
