<!-- ╔╦╗╔═╗╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗ -->
<!--  ║ ║╣ ║║║╠═╝║  ╠═╣ ║ ║╣  -->
<!--  ╩ ╚═╝╩ ╩╩  ╩═╝╩ ╩ ╩ ╚═╝ -->
<template>
    <div class="launcher">
        <i class="icon" :class="[icon, hasNotification ? 'badge' : '']" @click="launch"></i>
        <span class="title" @click="launch">{{ title }}</span>
    </div>
</template>


<!--  ╦╔═╗╦  ╦╔═╗╔═╗╔═╗╦═╗╦╔═╗╔╦╗ -->
<!--  ║╠═╣╚╗╔╝╠═╣╚═╗║  ╠╦╝║╠═╝ ║  -->
<!-- ╚╝╩ ╩ ╚╝ ╩ ╩╚═╝╚═╝╩╚═╩╩   ╩  -->
<script>
    import _ from 'lodash'
    import plugin from '../plugins'

    export default {
        name: "Launcher",

        props: {
            title: String,
            url: String,
            icon: String,
            plugins: {
                type: Array,
                default: () => []
            }
        },

        data() {
            return {
                hasNotification: false
            }
        },

        computed: {
            pluginList: function () {
                return _.filter(_.map(this.plugins, pluginName => plugin[pluginName]), p => !!p)
            }
        },

        methods: {
            launch() {
                if (this.url) {
                    _.forEach(this.pluginList, p => p.beforeLaunch());
                    window.open(this.url)
                }
            }
        },

        mounted() {
            _.forEach(this.pluginList, p => p.install(this))
        },

        beforeDestroy() {
            _.forEach(this.pluginList, p => p.uninstall(this))
        }
    }
</script>

<!-- ╔═╗╔═╗╔═╗ -->
<!-- ║  ╚═╗╚═╗ -->
<!-- ╚═╝╚═╝╚═╝ -->
<style lang="less" scoped>

</style>