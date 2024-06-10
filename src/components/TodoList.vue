<template>
    <div class="app-container">
      <div class="todo-list-container">
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        </head>

        <form @submit.prevent="addTask" class="task-form">
          <input type="text" v-model="newTask" placeholder="Add a new task" />
          <button type="submit">Add</button>
        </form>
  
        <div v-if="tasks.length > 0" class="task-list">
          <div v-for="(task, index) in tasks" :key="index" class="task-item">
            <label :class="{ completed: task.completed }" class="task-name">
              <input
                type="checkbox"
                :checked="task.completed"
                @change="toggleTask(index)"
                class="heart-checkbox"
              />
              <span>{{ task.name }}</span>
            </label>
            <button @click="removeTask(index)" class="remove-button">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
  
        <p v-else>No tasks available</p>
        <p v-if="incompleteCount === 0 && tasks.length > 0">Good job, Have a nice day :)</p>
        <p v-else-if="incompleteCount > 0">{{ incompleteCount }} tasks left.</p>
      </div>
    </div>
  </template>
  
  
  <script>
import { defineComponent } from 'vue';
import { useTodoStore } from '../stores/todoStore';

export default defineComponent({
  name: 'TodoList',
  data() {
    return {
      newTask: '',
    };
  },
  computed: {
    tasks() {
      return useTodoStore().tasks;
    },
    incompleteCount() {
      return useTodoStore().incompleteTasksCount;
    },
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        useTodoStore().addTask({
          name: this.newTask,
          completed: false,
        });
        this.newTask = '';
      }
    },
    removeTask(index) {
      useTodoStore().removeTask(index);
    },
    toggleTask(index) {
      const task = this.tasks[index];
      task.completed = !task.completed;
    },
  },
});

  </script>
  
  <style scoped>
  /* General styling for the app container */
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/bg.png'); /* Path to your background image */
  background-size: cover;
  background-position: center;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

/* Container for the todo list */
.todo-list-container {
  background-color: transparent; /* Mengubah warna latar belakang menjadi transparan */
  border-radius: 12px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Form styling */
.task-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

/* Input field styling */
.task-form input[type="text"] {
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Add button styling */
.task-form button[type="submit"] {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #aa4465; /* Matching template color */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Hover effect for the add button */
.task-form button[type="submit"]:hover {
  background-color: #883c55;
}

/* Styling for the list of tasks */
.task-list {
  text-align: left;
}

/* Individual task item styling */
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s;
}

/* Hover effect for task items */
.task-item:hover {
  background-color: #f1f1f1;
}

/* Task name styling */
.task-name {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 1rem;
}

/* Checkbox customization */
.heart-checkbox {
  display: none;
}

.heart-checkbox + span {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
}

.heart-checkbox + span::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  background: url('../assets/heart-outline.png') no-repeat center center / contain; /* Use the heart outline image */
}

.heart-checkbox:checked + span::before {
  background: url('../assets/heart-filled.png') no-repeat center center / contain; /* Use the heart filled image */
}

/* Completed task styling */
.task-name.completed {
  text-decoration: line-through;
  color: #999;
}

/* Remove button styling */
.remove-button {
  background: none;
  border: none;
  color: #ff0800; /* Visible delete button color */
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.3s;
}

/* Hover effect for remove button */
.remove-button:hover {
  color: #c82333;
}

/* General paragraph styling */
p {
  margin-top: 20px;
  color: #666;
}

  </style>
  