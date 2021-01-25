<template>
    <div id="app" class="app">
        <Header />
        <div class="container">
            <AddTodo v-on:add-todo="addTodo" />
            <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" />
        </div>
    </div>
</template>

<script>
    import Todos from '../components/Todos';
    import AddTodo from '../components/AddTodo';    
    import axios from 'axios';
    export default {
        name: 'Home',
        components: {
            Todos,
            AddTodo
        },
        data() {
            return {
                todos: [
                    // { id: 1, title: "Todo One", completed: false },
                    // { id: 2, title: "Todo Two", completed: false },
                    // { id: 3, title: "Todo Three", completed: true },
                    // { id: 4, title: "Todo Four", completed: false }
                ]
            }
        },
        methods: {
            deleteTodo(id) {
                axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
                    .then(res => this.todos = res.filter(todo => todo.id !== id))
                    .catch(error => console.log(error));
            },
            addTodo(newTodo) {
                const { title, completed } = newTodo;
                axios.post('https://jsonplaceholder.typicode.com/todos', {
                    title: title,
                    completed: completed
                }).then(res => this.todos = [...this.todos, res.data])
                    .catch(error => console.log(error));
            }
        },
        created() {
            axios.get('https://jsonplaceholder.typicode.com/todos')
                .then(res => this.todos = res.data)
                .catch(error => console.log(error));
        }
    }
</script>

<style scoped>
</style>