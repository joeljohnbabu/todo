const API_URL = '/api/todos';

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const statsCount = document.getElementById('stats-count');
const loadingSpinner = document.getElementById('loading-spinner');

let todos = [];

// Fetch all todos
async function fetchTodos() {
  showSpinner();
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch todos');
    todos = await res.json();
    renderTodos();
  } catch (err) {
    console.error('Error fetching todos:', err);
    showErrorNotification();
  } finally {
    hideSpinner();
  }
}

// Render todos in the UI
function renderTodos() {
  todoList.innerHTML = '';
  
  if (todos.length === 0) {
    todoList.innerHTML = `
      <li class="todo-item" style="justify-content: center; color: var(--text-secondary); opacity: 0.8; font-style: italic;">
        No tasks for today. Add one to get started!
      </li>
    `;
    updateStats();
    return;
  }

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;

    // Use inline onclick handler reference by attaching programmatically or globally
    li.innerHTML = `
      <div class="todo-item-left">
        <div class="custom-checkbox"></div>
        <span class="todo-text">${escapeHTML(todo.text)}</span>
      </div>
      <button class="btn-delete" aria-label="Delete Task">
        <svg viewBox="0 0 24 24">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        </svg>
      </button>
    `;

    // Hook events programmatically to avoid global scope pollution
    li.querySelector('.custom-checkbox').addEventListener('click', () => {
      toggleTodo(todo.id, todo.completed);
    });

    li.querySelector('.btn-delete').addEventListener('click', () => {
      deleteTodo(todo.id);
    });

    todoList.appendChild(li);
  });

  updateStats();
}

// Add a new todo
async function addTodo(e) {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;

  showSpinner();
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error('Failed to add todo');
    const newTodo = await res.json();
    todos.push(newTodo);
    todoInput.value = '';
    renderTodos();
  } catch (err) {
    console.error('Error adding todo:', err);
    showErrorNotification();
  } finally {
    hideSpinner();
  }
}

// Toggle completed status
async function toggleTodo(id, currentStatus) {
  showSpinner();
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: !currentStatus })
    });
    if (!res.ok) throw new Error('Failed to update todo');
    const updatedTodo = await res.json();
    todos = todos.map(t => t.id === id ? updatedTodo : t);
    renderTodos();
  } catch (err) {
    console.error('Error updating todo:', err);
    showErrorNotification();
  } finally {
    hideSpinner();
  }
}

// Delete a todo
async function deleteTodo(id) {
  showSpinner();
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete todo');
    todos = todos.filter(t => t.id !== id);
    renderTodos();
  } catch (err) {
    console.error('Error deleting todo:', err);
    showErrorNotification();
  } finally {
    hideSpinner();
  }
}

// Update remaining count
function updateStats() {
  const activeCount = todos.filter(t => !t.completed).length;
  statsCount.textContent = `${activeCount} task${activeCount === 1 ? '' : 's'} left`;
}

// Utility functions
function showSpinner() {
  loadingSpinner.classList.remove('hidden');
}

function hideSpinner() {
  loadingSpinner.classList.add('hidden');
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

function showErrorNotification() {
  console.error("API request failed.");
}

// Event Listeners
todoForm.addEventListener('submit', addTodo);

// Initial Load
document.addEventListener('DOMContentLoaded', fetchTodos);
