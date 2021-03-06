module.exports = {
    title: "Max's blog",
    description: 'Max的博客，写写文章，沉淀一下~🤔',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    base: '/Blog/',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '前端', link: '/frontend/js' },
            { text: '分享', link: '/sharing/测颜值踩坑之旅' },
            { text: 'Github', link: 'https://github.com/MaxChan7' }
        ],
        sidebar: [
            {
                title: '前端',
                collapsable: false,
                children: [
                    '/frontend/js',
                    '/frontend/css',
                ]
            },
            {
                title: '分享',
                collapsable: false,
                children: [
                    '/sharing/测颜值踩坑之旅',
                    '/sharing/H5玩转下拉上滑',
                    '/sharing/玩转SVG动画',
                ]
            }
        ],
        sidebarDepth: 2,
        lastUpdated: 'Last Updated'
    }
}