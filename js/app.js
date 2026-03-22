document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Render tasks
  const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;
      li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <div class="task-actions">
          <button class="complete-btn" data-index="${index}">Complete</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  };

  // Add task
  const addTask = (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
      tasks.push({ text: taskText, completed: false });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      taskInput.value = '';
      renderTasks();
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (index) => {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  };

  // Delete task
  const deleteTask = (index) => {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  };

  // Event listeners
  taskForm.addEventListener('submit', addTask);

  taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('complete-btn')) {
      const index = e.target.getAttribute('data-index');
      toggleTaskCompletion(index);
    }

    if (e.target.classList.contains('delete-btn')) {
      const index = e.target.getAttribute('data-index');
      deleteTask(index);
    }
  });

  // Initial render
  renderTasks();
});