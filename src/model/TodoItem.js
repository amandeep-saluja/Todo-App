function TodoItem(todoText, completed) {
    this.todoText = todoText;
    this.completed = completed;

    this.setText = function (todoText) {
        this.todoText = todoText;
    }

    this.toggleCompleted = function() {
        this.completed = !this.completed;
    }

    this.isCompleted = function() {
        return this.completed;
    }

    this.getTodoText = function () {
        return this.todoText;
    }
}

/*TodoItem.prototype.isCompleted = function() {
    return this.completed;
}

TodoItem.prototype.getText = function () {
    return this.todoText;
}*/

export default TodoItem;