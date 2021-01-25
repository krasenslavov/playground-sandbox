<template>
	<div class="add-todo">
		<form @submit="addTodo">
			<input type="text" name="title" placeholder="Add todo text..." v-model="title" />
			<input type="submit" value="Submit" class="btn" />
		</form>
	</div>
</template>

<script>
	// import uuid from 'uuid';
	export default {
		name: 'AddTodo',
		data() {
			return {
				title: ''
			}
		},
		methods: {
			addTodo(event) {
				event.preventDefault();
				if (!this.title)
					return alert('Enter add todo text!');
				const newTodo = {
					// id: uuid.v4(),
					title: this.title,
					completed: false
				}
				// Send the obj to parent
				this.title = undefined;
				this.$emit('add-todo', newTodo);
			}
		}
	}
</script>

<style scoped>
	form {
		display: flex;
	}
	input[type="text"] {
		flex: 1;
		padding: 1rem;
		border: 1px solid #666;
		border-right: none;
	}
	input[type="submit"] {
		flex: 2;
	}
</style>