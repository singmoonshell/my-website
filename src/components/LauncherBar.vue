<!-- ╔╦╗╔═╗╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗ -->
<!--  ║ ║╣ ║║║╠═╝║  ╠═╣ ║ ║╣  -->
<!--  ╩ ╚═╝╩ ╩╩  ╩═╝╩ ╩ ╩ ╚═╝ -->
<template>
    <div class="launcher-bar">
        <template v-for="launcher in launchers">
            <LauncherGroup v-if="launcher.isGroup" v-bind="launcher" :key="launcher.title"/>
            <Launcher v-else v-bind="launcher" :key="launcher.title"/>
        </template>
    </div>
</template>

<!--  ╦╔═╗╦  ╦╔═╗╔═╗╔═╗╦═╗╦╔═╗╔╦╗ -->
<!--  ║╠═╣╚╗╔╝╠═╣╚═╗║  ╠╦╝║╠═╝ ║  -->
<!-- ╚╝╩ ╩ ╚╝ ╩ ╩╚═╝╚═╝╩╚═╩╩   ╩  -->
<script>
    import Launcher from './Launcher'
    import LauncherGroup from './LauncherGroup'
    import config from '../config'

    export default {
        name: "LauncherBar",

        components: {Launcher, LauncherGroup},

        data() {
            return {
                launchers: config.launchers
            }
        },

        methods: {}
    }
</script>

<!-- ╔═╗╔═╗╔═╗ -->
<!-- ║  ╚═╗╚═╗ -->
<!-- ╚═╝╚═╝╚═╝ -->
<style lang="less" scoped>
    .launcher-bar {
        align-items: center;
        display: inline-flex;
    }
</style>