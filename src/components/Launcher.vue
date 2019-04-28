<!-- ╔╦╗╔═╗╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗ -->
<!--  ║ ║╣ ║║║╠═╝║  ╠═╣ ║ ║╣  -->
<!--  ╩ ╚═╝╩ ╩╩  ╩═╝╩ ╩ ╩ ╚═╝ -->
<template>
    <div class="launcher">
        <i class="icon" :class="icon" @click="launch"></i>
        <span class="title" @click="launch">{{ title }}</span>
    </div>
</template>


<!--  ╦╔═╗╦  ╦╔═╗╔═╗╔═╗╦═╗╦╔═╗╔╦╗ -->
<!--  ║╠═╣╚╗╔╝╠═╣╚═╗║  ╠╦╝║╠═╝ ║  -->
<!-- ╚╝╩ ╩ ╚╝ ╩ ╩╚═╝╚═╝╩╚═╩╩   ╩  -->
<script>
    export default {
        name: "Launcher",
        props: ["title", "url", "icon"],
        methods: {
            launch() {
                if (this.url) {
                    window.open(this.url)
                }
            }
        }
    }
</script>

<!-- ╔═╗╔═╗╔═╗ -->
<!-- ║  ╚═╗╚═╗ -->
<!-- ╚═╝╚═╝╚═╝ -->
<style lang="less" scoped>

</style>