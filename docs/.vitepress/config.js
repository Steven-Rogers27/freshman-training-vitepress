export default {
  title: '数院前端技术栈分享',
  description: '数院前端技术栈分享',
  outDir: '../public',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '/crcc-logo.png',
    socialLinks: [
      { icon: 'github', link: 'http://192.168.100.90:8088/crcc-web', },
    ],
    sidebar: [
      {
        text: '一体化技术平台',
        collapsible: true,
        items: [
          { text: '开发模式', link: '/integration/dev-mode', },
          { text: '系统简介', link: '/integration/index', },
          { text: '技术栈', link: '/integration/tech-stack', },
          { text: '示例项目', link: '/integration/project', },
          { text: '本地开发环境准备', link: '/integration/dev-env', },
          { text: '创建前端工程', link: '/integration/create-project', },
          { text: '本地开发', link: '/integration/local-dev', },
          { text: '打包部署', link: '/integration/deploy', },
          { text: '前后端联调', link: '/integration/joint-debug', },
        ],
      },
      {
        text: '前端技术概况',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '包管理工具', link: '/frontend/package-manager', },
          { text: '开发框架', link: '/frontend/framework', },
        ],
      },
    ],
  },
}