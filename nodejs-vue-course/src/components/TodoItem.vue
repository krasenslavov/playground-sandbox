<template>
	<div class="todo-item" v-bind:class="{'is-complete':todo.completed}">
		<p>
			<input type="checkbox" v-on:change="markComplete" />
			<span>{{todo.title}}</span>
			<button @click="$emit('del-todo', todo.id)" class="del">&times;</button>
		</p>
	</div>
</template>

<script>
	export default {
		name: "TodoItem",
		props: ["todo"],
		methods: {
			markComplete() {
				this.todo.completed = !this.todo.completed;
			}
		}
	}
</script>

<style scoped>
	.todo-item {
		background: #f2f2f2;
		padding: 1rem;
		border-bottom: 1px solid #c2c2c2;
	}
	.todo-item p {
		display: flex;
		align-items: center;
	}
	.todo-item input[type="checkbox"] {
		position: relative;
		top: -1px;
	}
	.todo-item span {
		margin-left: 1rem;
	}
	.todo-item span {
		flex: 1 1;
	}
	.is-complete {
		text-decoration: line-through;
	}
	.del {
		background: #fc4444;
		color: #fff;
		border: none;
		padding: 4px 8px;
		margin-left: 1rem;
		border-radius: 4px;
		cursor: pointer;
		float: right;
		font-size: 1rem;
	}
</style>