<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated']
})

const route = useRoute()

interface Printer_State {
  id: number
  url: string
  state: number
  detailed_state: number | null
  detailed_state_label: string | null
  created_at: string
  is_light_on: boolean
  percentage: number | null
  project: string | null
  temperature_nozzle: number | null
}

const { data: printer_state } = await useFetch<Printer_State>(
  `http://localhost:8000/core/stats/${route.params.id}`,
  {
    credentials: 'include',
    query: {
      format: 'json'
    }
  }
)

const getProjectIdFromUrl = (projectUrl: string | null): number | string => {
  if (!projectUrl) {
    return 'unknown'
  }

  const match = projectUrl.match(/\/(\d+)\/?$/)
  if (match?.[1]) {
    return Number(match[1])
  }

  try {
    return Number(new URL(projectUrl).pathname.match(/\/(\d+)\/?$/)?.[1] ?? '') || 'unknown'
  } catch {
    return 'unknown'
  }
}

const projectId = computed(() => getProjectIdFromUrl(printer_state.value?.project ?? null))

const stateArray: Record<number, string> = {
  0: 'Idle',
  10: 'Preparing',
  20: 'Running',
  30: 'Paused',
  40: 'Finished',
  50: 'Unknown',
  60: 'Failed'
}
</script>

<template>
  <UContainer>
    <h2 class="text-2xl font-semibold tracking-tight">
      Printer state
    </h2>
    <UCard
      v-if=" printer_state"
        :title="stateArray[printer_state.state] + ' | ' + (printer_state.detailed_state_label ?? 'Unknown')"
        :description="`Progress: ${printer_state.percentage !== null ? `${printer_state.percentage}%` : 'unknown'}`"
    >
      <template #description>
        <div class="flex items-center gap-2">          
          <span>Progress: {{printer_state.percentage !== null ? printer_state.percentage + '%' : 'unknown'}} </span>
          <NuxtLink
            v-if="projectId"
            :to="`project_${projectId}`"
            class="font-medium text-primary underline"
          >
            > Project {{ projectId }}
          </NuxtLink>
        </div>
      </template>
      <template #footer>
          <UUser
          :name="new Date(printer_state.created_at).toLocaleString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit'
          })"
          :avatar="{
              icon: printer_state.is_light_on ? 'i-lucide-lightbulb' : 'i-lucide-lightbulb-off',
              alt: printer_state.is_light_on.toString()
          }"
          />
      </template>
    </UCard>
    <p v-else>
      Printer state with ID {{ route.params.id }} not found.
    </p>
  </UContainer>
</template>
