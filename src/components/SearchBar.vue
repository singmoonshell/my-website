<template>
    <div id="search-bar" class="search-bar">
        <div id="input-bar">
            <!--suppress HtmlFormInputWithoutLabel -->
            <input id="search-input" autofocus="autofocus" v-model="searchValue" @keypress="keyPress">
            <div id="search-button" @click="search">
                <svg id="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65.26 65.21" width="32" height="32">
                    <defs>
                        <linearGradient id="linear-gradient" x1="34.88" y1="30.16" x2="18" y2="0.92"
                                        gradientTransform="matrix(-1, 0, 0, 1, 72, 0.03)"
                                        gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#0052cc"></stop>
                            <stop offset="0.92" stop-color="#2684ff"></stop>
                        </linearGradient>
                    </defs>
                    <g>
                        <g id="Blue">
                            <path d="M45.9,35.09a1.86,1.86,0,0,0,3.16-.34l16-32A1.91,1.91,0,0,0,63.35,0H41.07a1.84,1.84,0,0,0-1.71,1.06C34.56,11,37.47,26.08,45.9,35.09Z"
                                  style="fill:url(#linear-gradient)"></path>
                            <path d="M34.17,64.19a42.19,42.19,0,0,0,2.46-41.65L25.89,1.06A1.91,1.91,0,0,0,24.18,0H1.91A1.91,1.91,0,0,0,.2,2.77L30.92,64.2a1.81,1.81,0,0,0,3.25,0Z"
                                  style="fill:#2684ff"></path>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SearchBar",
        data() {
            return {
                searchValue: ''
            }
        },
        methods: {
            search() {
                window.open(`https://www.baidu.com/s?wd=${encodeURIComponent(this.searchValue)}`);
                this.searchValue = '';
            },
            keyPress(keyEvent) {
                if (keyEvent.code === 'Enter' && this.searchValue) {
                    this.search();
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @bar-height: 50px;
    @radius: 25px;

    #input-bar {
        position: relative;
        height: @bar-height;
        border-radius: @radius;
        background-color: white;
        border: 1px solid #c0c0c0;
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.4), inset 0 0 6px rgba(0, 0, 0, 0.2);
    }

    #search-input {
        width: 100%;
        height: @bar-height;
        font-size: 1.5rem;
        padding: 0 75px 0 25px;
        box-sizing: border-box;
        border: none;
        background: none;
        outline: none;
    }

    #search-button {
        position: absolute;
        cursor: pointer;
        top: 0;
        right: 0;
        height: @bar-height;
        border-radius: @radius;
        background-color: #f7f7f7;
        transition: background-color 0.2s;
        -webkit-transition: background-color 0.2s;
        box-shadow: -1px 0 6px rgba(0, 0, 0, 0.2);

        svg {
            margin: 9px 25px;
        }
    }

    #search-button:hover {
        background-color: #efefef;
    }
</style>