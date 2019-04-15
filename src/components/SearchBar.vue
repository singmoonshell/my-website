<template>
    <div id="search-bar" class="search-bar" @click.stop>
        <div id="suggestions" v-if="hasSuggestion && isShowSuggestions">
            <ul>
                <li v-for="(suggestion, index) in suggestions" :key="suggestion"
                    :class="{ selected: mouseSelection != null ? index === mouseSelection : index === selectionIndex }"
                    @mouseenter="mouseSelection = index"
                    @mouseleave="mouseSelection = null"
                    @mousedown.prevent="{}"
                    @click.prevent="search(suggestion)">
                    {{ suggestion }}
                </li>
            </ul>
        </div>
        <div id="input-bar" v-bind:class="{ 'shadow-dilute': hasSuggestion }">
            <!--suppress HtmlFormInputWithoutLabel -->
            <input id="search-input" type="text" autofocus="autofocus"
                   v-model="displayKeyword"
                   @click="showSuggestions"
                   @focusout="hideSuggestions"
                   @keydown.up.prevent="moveSelection"
                   @keydown.down.prevent="moveSelection"
                   @keydown.enter="search()"
                   @keydown.esc="cancel">
            <div id="search-button" @click="search()">
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
    import _ from "lodash"

    export default {
        name: "SearchBar",

        data() {
            return {
                keyword: '',
                suggestions: [],
                isShowSuggestions: true,
                selectionIndex: null,
                mouseSelection: null
            }
        },

        computed: {
            hasSuggestion: function () {
                return this.suggestions.length > 0
            },

            displayKeyword: {
                get() {
                    if (this.suggestions.length > 0 && this.selectionIndex != null) {
                        return this.suggestions[this.selectionIndex];
                    }

                    return this.keyword;
                },

                set(value) {
                    this.selectionIndex = null;
                    this.keyword = value;
                }
            }
        },

        watch: {
            keyword: function () {
                this.debouncedSuggest();
            }
        },

        created: function () {
            this.debouncedSuggest = _.debounce(this.suggest, 200)
        },

        methods: {
            search(wd) {
                window.open(`https://www.baidu.com/s?wd=${encodeURIComponent(wd || this.displayKeyword)}`);
                this.keyword = '';
                this.clearSuggestions();
            },

            async suggest() {
                if (!this.keyword.trim()) {
                    this.clearSuggestions();
                    return;
                }

                let response = await this.$http.jsonp('https://www.baidu.com/sugrec', {
                    params: {
                        prod: "pc",
                        wd: this.keyword
                    },
                    jsonp: 'cb'
                });

                if (response && response.ok) {
                    let body = response.body || {};
                    if (body.q === this.keyword.replace(/\s+/g, " ")) {
                        this.suggestions = _.map(body.g, i => i.q);
                        this.showSuggestions();
                    }
                }
            },

            clearSuggestions() {
                this.mouseSelection = null;
                this.selectionIndex = null;
                this.suggestions = [];
            },

            cancel() {
                this.mouseSelection = null;
                this.selectionIndex = null;
                this.hideSuggestions();
            },

            showSuggestions() {
                this.isShowSuggestions = true;
            },

            hideSuggestions() {
                this.isShowSuggestions = false;
            },

            moveSelection(event) {
                if (!this.hasSuggestion) {
                    this.selectionIndex = null;
                    return;
                }

                let preIndex = this.mouseSelection != null
                    ? this.mouseSelection
                    : this.selectionIndex == null ? -1 : this.selectionIndex;
                if (event.key === 'ArrowUp') {
                    --preIndex;
                } else {
                    ++preIndex;
                }

                if (preIndex < 0) {
                    preIndex = this.suggestions.length - 1;
                }
                preIndex %= this.suggestions.length;

                this.mouseSelection = null;
                this.selectionIndex = preIndex < 0 ? null : preIndex;
            }
        }
    }
</script>

<style lang="less" scoped>
    @bar-height: 50px;
    @radius: 25px;
    @border-color: #c0c0c0;

    .search-bar {
        position: relative;
    }

    #input-bar {
        position: relative;
        height: @bar-height;
        border-radius: @radius;
        background-color: white;
        border: 1px solid @border-color;
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.4), inset 0 0 6px rgba(0, 0, 0, 0.1);
    }

    #input-bar.shadow-dilute {
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1), inset 0 0 6px rgba(0, 0, 0, 0.1);
    }

    #search-input {
        width: 100%;
        height: @bar-height;
        font-size: 1.5rem;
        padding: 0 75px 0 @radius;
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

    #suggestions {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding-top: @bar-height;
        min-height: 100px;
        border: 1px solid @border-color;
        background-color: white;
        box-sizing: border-box;
        border-radius: @radius @radius 2px 2px;
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);

        ul {
            padding: 0;
            margin: 5px 0;
            list-style: none;

            li {
                padding: 3px @radius;
            }

            li.selected {
                background-color: #efefef;
            }
        }
    }
</style>
