<template>
    <div id="app">
        <waterfall />
    </div>
</template>

<script>
    import Waterfall from './components/Waterfall'

    export default {
        name: 'app',
        components: {
            Waterfall
        }
    }
</script>

<style>
    html, body {
        padding: 0;
        margin: 0;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
