export default {
    launchers: [
        {
            title: "GitHub",
            icon: "icon-github",
            url: "https://www.github.com",
            plugins: ['GitHubNotificationPlugin']
        },
        {
            title: "Google",
            icon: "icon-google",
            url: "https://www.google.com"
        },
        {
            title: "知否",
            isGroup: true,
            launchers: [
                {
                    title: "知乎",
                    icon: "icon-zhihu",
                    url: "https://www.zhihu.com"
                },
                {
                    title: "开源中国",
                    icon: "icon-oschina",
                    url: "https://www.oschina.net"
                }
            ]
        },
        {
            title: "Translate",
            isGroup: true,
            launchers: [
                {
                    title: "Google 翻译",
                    icon: "icon-google-translate",
                    url: "https://translate.google.cn/"
                },
                {
                    title: "有道翻译",
                    icon: "icon-youdao",
                    url: "http://dict.youdao.com/"
                }
            ]
        },
        {
            title: "Live",
            isGroup: true,
            launchers: [
                {
                    title: "京东",
                    icon: "icon-jd",
                    url: "https://www.jd.com/"
                },
                {
                    title: "爱奇艺",
                    icon: "icon-iqiyi",
                    url: "http://www.iqiyi.com/"
                },
                {
                    title: "IT之家",
                    icon: "icon-ithome",
                    url: "https://www.ithome.com/"
                },
                {
                    title: "游民星空",
                    icon: "icon-gamer-sky",
                    url: "https://www.gamersky.com/"
                }
            ]
        }
    ]
}