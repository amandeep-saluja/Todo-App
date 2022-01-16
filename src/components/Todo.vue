<template>
  <div class="todo-container">
    <h1>Todo List</h1>
    <input type="text" v-model="listItem" @keypress.enter="addItem">
    <div class="list">
      <ul >
        <li v-for="(todo, index) of todoList" :key="index">
          <span class="todo-text">{{todo.todoText}}</span>
          <input type="checkbox" name="todo-completed" :value="todo.isCompleted()" @click="completeTodo(todo)">
        </li>
      </ul>
    </div>
    <button class="printAllTodos" @click="printAllTodos">Print All Todos</button>
  </div>
</template>

<script>
import TodoItem from "@/model/TodoItem";

export default {
  name: "Todo",
  data: () => {
    return {
      todoList: [],
      listItem: '',
      isCompleted: false,
      localStorageKey: 'todos'
    }
  },
  created() {
    if(localStorage.getItem(this.localStorageKey)!=undefined) {
      this.getTodosFromLocalStorage();
    }
    else {
      this.todoList.push(new TodoItem('Hello', false));
    }
  },
  methods: {
    addItem() {
      let newTodo = new TodoItem(this.listItem, false);
      let textFound = this.todoList.find( todo => todo.getTodoText() == this.listItem);
      console.log('Text found: ', textFound);
      if(!this.todoList.includes(newTodo)) {
        this.todoList.push(newTodo);
      }
      this.listItem = '';
      this.saveTodosInLocalStorage();
    },
    completeTodo(todo) {
      console.log(todo.text+' Todo checked: ',todo.completed);
      todo.toggleCompleted();
      this.saveTodosInLocalStorage();
    },
    printAllTodos() {
      for(let todo of this.todoList) {
        console.log(todo.getTodoText() + ' ; completed: ',todo.isCompleted() );
      }
    },
    getTodosFromLocalStorage() {
      let todosFromLocalStorage = localStorage.getItem(this.localStorageKey);
      todosFromLocalStorage = JSON.parse(todosFromLocalStorage);
      for(let todo of todosFromLocalStorage) {
        this.todoList.push(new TodoItem(todo.todoText, todo.completed));
      }
    },
    saveTodosInLocalStorage() {
      let todos = [];
      for(let todo of this.todoList) {
        todos.push({'todoText': todo.getTodoText(), 'completed': todo.isCompleted()});
      }
      localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
    }
  }
}
</script>

<style scoped>

</style>