<!-- ╔╦╗╔═╗╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗ -->
<!--  ║ ║╣ ║║║╠═╝║  ╠═╣ ║ ║╣  -->
<!--  ╩ ╚═╝╩ ╩╩  ╩═╝╩ ╩ ╩ ╚═╝ -->
<template>
    <div class="launcher launcher-group">
        <i v-if="icon" class="icon" :class="icon"></i>
        <div v-else class="icon">
            <div v-if="launchers.length" class="icon-clipper">
                <i v-if="launchers.length === 1" class="icon-inner" :class="launchers[0].icon"></i>
                <div v-else-if="launchers.length>=2">
                    <div>
                        <i v-for="launcher in row0"
                           :key="launcher.title"
                           class="icon-inner"
                           :class="launcher.icon"></i>
                    </div>
                    <div :class="{ margin : launchers.length > 3}">
                        <i v-for="launcher in row1"
                           :key="launcher.title"
                           class="icon-inner"
                           :class="launcher.icon"></i>
                    </div>
                </div>
            </div>
            <div class="border"></div>
        </div>
        <span class="title">{{ title }}</span>
    </div>
</template>


<!--  ╦╔═╗╦  ╦╔═╗╔═╗╔═╗╦═╗╦╔═╗╔╦╗ -->
<!--  ║╠═╣╚╗╔╝╠═╣╚═╗║  ╠╦╝║╠═╝ ║  -->
<!-- ╚╝╩ ╩ ╚╝ ╩ ╩╚═╝╚═╝╩╚═╩╩   ╩  -->
<script>
    export default {
        name: "LauncherGroup",
        props: {
            title: String,
            icon: String,
            launchers: Array
        },

        computed: {
            row0: function () {
                return this.launchers.slice(0, this.launchers.length === 3 ? 1 : 2)
            },

            row1: function () {
                if (this.launchers.length < 3) {
                    return []
                } else if (this.launchers.length === 3) {
                    return this.launchers.slice(1, 3)
                }
                return this.launchers.slice(2, 4)
            }
        }
    }
</script>

<!-- ╔═╗╔═╗╔═╗ -->
<!-- ║  ╚═╗╚═╗ -->
<!-- ╚═╝╚═╝╚═╝ -->
<style lang="less" scoped>
    .launcher-group {
        div.icon {
            padding: 2px;
            position: relative;
            box-sizing: border-box;
            background-color: rgba(255, 255, 255, .7);

            .icon-clipper {
                width: 100%;
                height: 100%;
                clip-path: circle();
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                justify-content: center;

                @2R: 64px;
                @margins: 10px; // 2R * (2tan30 - 1)

                > div {
                    position: absolute;
                }

                > div > div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                > div > div.margin {
                    margin-top: @margins;
                }

                i.icon-inner {
                    width: @2R;
                    height: @2R;
                    border-radius: 100%;
                }

                i.icon-inner + i.icon-inner {
                    margin-left: @margins;
                }
            }

            .border {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 50%;
                border: 4px solid white;
                box-shadow: inset 0 1px 5px rgba(0, 0, 0, .3);
            }
        }
    }
</style>