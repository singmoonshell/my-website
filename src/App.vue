<template>
    <div id="app">
        <SearchBar></SearchBar>
    </div>
</template>

<script>
    import SearchBar from './components/SearchBar.vue'

    export default {
        name: 'app',
        components: {
            SearchBar
        }
    }
</script>

<style lang="less">
    #app {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-size: cover;
        background-color: #45545D;
        background-image: url("./assets/background.png");

        .search-bar {
            width: 40%;
            margin: 10% auto;
        }
    }
</style>
