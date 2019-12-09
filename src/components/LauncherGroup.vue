<!-- ╔╦╗╔═╗╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗ -->
<!--  ║ ║╣ ║║║╠═╝║  ╠═╣ ║ ║╣  -->
<!--  ╩ ╚═╝╩ ╩╩  ╩═╝╩ ╩ ╩ ╚═╝ -->
<template>
    <div class="launcher launcher-group">
        <v-popover offset="3" placement="top" :disabled="!launchers.length">
            <i v-if="icon" class="icon" :class="icon"></i>
            <div v-else class="icon">
                <div v-if="launchers.length" class="icon-clipper">
                    <i v-if="launchers.length === 1" class="icon-inner" :class="launchers[0].icon"></i>
                    <div v-else-if="launchers.length>=2" :count="Math.min(3,launchers.length)">
                        <div>
                            <i v-for="launcher in row0"
                               :key="launcher.title"
                               class="icon-inner"
                               :class="launcher.icon"></i>
                        </div>
                        <div>
                            <i v-for="launcher in row1"
                               :key="launcher.title"
                               class="icon-inner"
                               :class="launcher.icon"></i>
                        </div>
                    </div>
                </div>
                <div class="border"></div>
            </div>

            <template slot="popover">
                <div class="launcher-group-popover"
                     :style="{ 'grid-template-columns': `repeat(${Math.min(launchers.length, 5)}, auto)` }">
                    <Launcher v-close-popover v-for="launcher in launchers" :key="launcher.title" v-bind="launcher"
                              class="small"/>
                </div>
            </template>
        </v-popover>
        <span class="title">{{ title }}</span>
    </div>
</template>


<!--  ╦╔═╗╦  ╦╔═╗╔═╗╔═╗╦═╗╦╔═╗╔╦╗ -->
<!--  ║╠═╣╚╗╔╝╠═╣╚═╗║  ╠╦╝║╠═╝ ║  -->
<!-- ╚╝╩ ╩ ╚╝ ╩ ╩╚═╝╚═╝╩╚═╩╩   ╩  -->
<script>
    import Launcher from './Launcher'

    export default {
        name: "LauncherGroup",

        components: {Launcher},

        props: {
            title: String,
            icon: String,
            launchers: Array
        },

        computed: {
            row0: function () {
                return this.launchers.slice(0, this.launchers.length >= 3 ? 1 : 2)
            },

            row1: function () {
                if (this.launchers.length < 3) {
                    return []
                }
                return this.launchers.slice(1, 3)
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

                > div[count="3"] {
                    margin-top: -@margins;
                }

                i.icon-inner {
                    width: @2R;
                    height: @2R;
                    border-radius: 100%;
                    background-color: white;
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

    .launcher-group-popover {
        grid-gap: 10px;
        display: inline-grid;
        grid-template-columns: repeat(5, auto);
    }
</style>
