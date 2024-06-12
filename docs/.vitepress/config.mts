import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Licia',
  description: 'Licia Documentation',
  lastUpdated: true,
  outDir: '../dist',
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },
    nav: [
      { text: 'Document', link: '/document' },
      { text: 'Playground', link: '/playground' },
      { text: 'Builder', link: '/builder' },
    ],
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
        ],
      },
    },
  },
})
