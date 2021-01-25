<template>
    <div class="hello">
        <h1>Hello, world! {{msg}}</h1>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String,
            value: 'FooBar!'
        }
    }
</script>

<style scoped>
</style>
