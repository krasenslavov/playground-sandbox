<template>
    <div id="app">
        <Header />
        <router-view />
    </div>
</template>

<script>
    import Header from './components/layout/Header';   
    export default {
        name: 'app',
        components: {
            Header
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    *:focus {
        outline: 2px solid rgba(0, 0, 0, 0.05);
    }
    body {
        font: normal normal 18px/1.6 Monaco, monospace;
        /*padding: 10rem;*/
    }
    input {
        font: normal normal 14px/1.2 Monaco, monospace;
    }
    .btn {
        display: inline-block;
        border: none;
        background: #666;
        color: #fff;
        padding: 1rem 2rem;
        cursor: pointer;
    }
    .btn:hover {
        background: #777;
    }
    .container {
        padding: 3rem;
    }
</style>