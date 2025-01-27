import { defineConfig } from 'vitepress'
import * as fs from 'fs'
import * as path from 'path'

const icon = (name: string) => {
  return fs.readFileSync(path.resolve(__dirname, `${name}.svg`), 'utf8')
}

export default defineConfig({
  ignoreDeadLinks: true,
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
    logo: {
      src: '/logo.png',
      width: 48,
      height: 48,
    },
    nav: [
      { text: 'Document', link: '/document' },
      { text: 'Playground', link: '/playground' },
      { text: 'Builder', link: '/builder' },
    ],
    socialLinks: [
      {
        icon: {
          svg: icon('kofi'),
        },
        link: 'https://ko-fi.com/surunzi',
      },
      {
        icon: {
          svg: icon('wechatpay'),
        },
        link: 'https://surunzi.com/wechatpay.html',
      },
      {
        icon: 'github',
        link: 'https://github.com/liriliri/licia',
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2016-present liriliri',
    },
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
          { text: '文档', link: '/zh/document' },
          { text: '示例', link: '/zh/playground' },
          { text: '定制', link: '/zh/builder' },
        ],
        footer: {
          message: '基于 MIT 许可发布',
          copyright: '版权所有 © 2016 至今 liriliri',
        },
      },
    },
  },
  head: [
    [
      'script',
      {
        src: '/eustia.js',
      },
    ],
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-HLMNNR1SC0',
      },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-HLMNNR1SC0');`,
    ],
  ],
})
