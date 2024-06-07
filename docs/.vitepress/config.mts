import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Licia',
  description: 'Licia Documentation',
  lastUpdated: true,
  outDir: '../dist',
  themeConfig: {
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Document', link: '/document' },
      { text: 'Playground', link: '/playground' },
      { text: 'Builder', link: '/builder' },
    ]
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    zh: {
      label: '中文',
      lang: 'zh',
      themeConfig: {
        nav: [
          { text: 'Document', link: '/zh/document' },
          { text: 'Playground', link: '/playground' },
          { text: 'Builder', link: '/builder' },
        ]
      }
    }
  }
})
