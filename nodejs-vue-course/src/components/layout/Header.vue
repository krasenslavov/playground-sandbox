<template>
	<header class="header">
		<h1>Todo List</h1>
		<div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
	</header>
</template>

<script>
	export default {
		name: 'Header'
	}
</script>

<style scoped>
	.header {
		background: #999;
		color: #fff;
		text-align: center;
		padding: 1rem;
	}
	.header a {
		color: #fff;
		padding: .5rem;
		text-decoration: none;
	}
</style>