<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated']
})

// Retrieve printer states from the backend API
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

interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const page = ref(1)

const { data: printer_states } = await useFetch<PaginatedResponse<Printer_State>>(
  'http://localhost:8000/core/stats',
  {
    credentials: 'include',
    query: {
      format: 'json',
      p: page
    }
  }
)

const total = computed(() => {
  return printer_states.value?.count ?? 0
})

const stateArray: Record<number, string> = {
  0: 'Idle',
  10: 'Preparing',
  20: 'Running',
  30: 'Paused',
  40: 'Finished',
  50: 'Unknown',
  60: 'Failed'
}

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

const timelineItems = computed(() =>
  printer_states.value?.results.map(state => ({
    value: state.id,
    title: stateArray[state.state] + ' | ' + (state.detailed_state_label ?? 'Unknown'),
    date: new Date(state.created_at).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }),
    description: `${state.percentage !== null ? `${state.percentage}%` : 'Progress unknown'}`,
    icon: state.is_light_on ? 'i-lucide-lightbulb' : 'i-lucide-lightbulb-off',
    projectLink: getProjectIdFromUrl(state.project)
  })) ?? []
)
</script>

<template>
  <UContainer>
    <h2 class="text-2xl font-semibold tracking-tight">
      3D Printer Stats
    </h2>
    <p class="text">
      Here are the past printer states from the 3D printer. Select a page to view more states.
      The states are displayed in a timeline format, showing the state, date, and progress of each print job.
    </p>
    <br>
    <UTimeline
      :items="timelineItems"
      :ui="{
        date: 'float-end ms-1'
      }"
    >
      <template #title="{ item }">
        <NuxtLink
          :to="`/dashboard/state_${item.value}`"
          class="font-medium"
        >
          {{ item.title }}
        </NuxtLink>
      </template>
      <template #description="{ item }">
        <div class="flex items-center gap-2">
          <span>{{ item.description }}</span>
          <NuxtLink
            v-if="item.projectLink"
            :to="`project_${item.projectLink}`"
            class="font-medium text-primary underline"
          >
            > Project {{ item.projectLink }}
          </NuxtLink>
        </div>
      </template>
    </UTimeline>
    <br>
    <UPagination
      v-model:page="page"
      :total="total"
    />
  </UContainer>
</template>
