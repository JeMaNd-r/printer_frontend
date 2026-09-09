<template>
  <div>
    <UPageHero
      title="3D Printer Dashboard"
      description="A dedicated Nuxt web application for monitoring the 3D printer, exploring its history and managing print projects."
      :links="[{
        label: 'Login',
        to: '/login',
        trailingIcon: 'i-lucide-arrow-right',
        size: 'xl'
      }, {
        label: 'Explore the underlying code',
        to: 'https://github.com/JeMaNd-r/printer_frontend',
        target: '_blank',
        icon: 'i-simple-icons-github',
        size: 'xl',
        color: 'neutral',
        variant: 'subtle'
      }]"
    />

    <UPageSection
      id="features"
      title="Available features"
      :features="[{
        icon: 'i-lucide-rocket',
        title: 'Dashboard',
        description: 'Printer dashboard with current printer and detailed status'
      }, {
        icon: 'i-lucide-thermometer',
        title: 'Temperature',
        description: 'Temperature monitoring for nozzle, print bed, and chamber'
      }, {
        icon: 'i-lucide-lightbulb',
        title: 'Light',
        description: 'Printer light status and control'
      }, {
        icon: 'i-lucide-zap',
        title: 'Refresh',
        description: 'Automatic data refresh'
      }, {
        icon: 'i-lucide-file-chart-column-increasing',
        title: 'Stats',
        description: 'Printer statistics with recorded states and timestamps'
      }, {
        icon: 'i-lucide-chart-line',
        title: 'Charts',
        description: 'Interactive charts of printer and temperature data over time'
      }, {
        icon: 'i-lucide-chart-column',
        title: 'State details',
        description: 'Detailed printer-state views for individual measurements'
      }, {
        icon: 'i-lucide-blocks',
        title: 'Project overview',
        description: 'Project overview grouped by printing status'
      }, {
        icon: 'i-lucide-file',
        title: 'Project details',
        description: 'Project details including project name, owner, creation date, and print image'
      }, {
        icon: 'i-lucide-code-2',
        title: 'Nuxt, Vue, TypeScript',
        description: 'Fast, component-based interface built with Nuxt, Vue and TypeScript'
      }, {
        icon: 'i-lucide-zap',
        title: 'REST API',
        description: 'REST API Integration that communicates with the Django backend through its API'
      }, {
        icon: 'i-lucide-smartphone',
        title: 'Responsive design',
        description: 'Responsive design foor desktop and mobile devices'
      }]"
    >
      <template #description>
        The application provides an overview of the printer's current status, including temperatures, print progress, and other relevant printer information.
        It communicates with the
        <a
          href="https://github.com/JeMaNd-r/printer_dashboard"
          style="text-decoration: underline;"
        >
          project's backend API
        </a> to retrieve and display printer data.
      </template>
    </UPageSection>

    <UPageSection>
      <UPageCTA
        title="Ready to explore the printer data?"
        description="Log in to access the available data provided by the API."
        variant="subtle"
        :links="[{
          label: 'Login',
          to: '/login',
          trailingIcon: 'i-lucide-arrow-right',
          color: 'neutral'
        }, {
          label: 'Check out the Backend',
          to: 'https://github.com/JeMaNd-r/printer_dashboard',
          target: '_blank',
          icon: 'i-simple-icons-github',
          color: 'neutral',
          variant: 'outline'
        }]"
      />
    </UPageSection>
  </div>
</template>
