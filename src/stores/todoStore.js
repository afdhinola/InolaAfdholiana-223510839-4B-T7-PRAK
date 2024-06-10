import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    addTask(task) {
      this.tasks.push(task);
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
  },
  getters: {
    incompleteTasksCount() {
      return this.tasks.filter(task => !task.completed).length;
    },
  },
});
