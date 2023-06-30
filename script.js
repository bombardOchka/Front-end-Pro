const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const propertySelect = document.getElementById('property');
const addButton = document.getElementById('add');
const todoList = document.getElementById('List');



addButton.addEventListener('click', function() {
  if (titleInput.value.trim() !== '') {
  const todoItem = document.createElement('li');
  const property = propertySelect.value;
  
  if (property === 'low') {
    todoItem.classList.add('low');
  } else if (property === 'mid') {
    todoItem.classList.add('mid');
  } else if (property === 'high') {
    todoItem.classList.add('high');
  }

  const titleElement = document.createElement('h3');
  const descriptionElement = document.createElement('p');
  const checkbox = document.createElement('input');
  const deleteButton = document.createElement('button');

  checkbox.type = 'checkbox';
  titleElement.innerText = titleInput.value;
  descriptionElement.innerText = descriptionInput.value;
  deleteButton.innerText = 'delete';

  checkbox.addEventListener('click', function() {
    titleElement.classList.toggle('lineThrough');
  });


  deleteButton.addEventListener('click', function() {
    if (titleElement.classList.contains('lineThrough')) {
    todoItem.remove();
    }});


  todoItem.append(titleElement);
  todoItem.append(checkbox);
  todoItem.append(descriptionElement);
  todoItem.append(deleteButton);
 
  
  todoList.append(todoItem);

  titleInput.value = '';
  descriptionInput.value = '';
  }
});

