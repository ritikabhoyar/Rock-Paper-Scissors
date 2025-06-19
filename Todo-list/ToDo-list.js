
const TodoList = [{
  name: 'make dinner',
  dueDate: '2022-12-22'
}, {
  name:'wash dishes',
  dueDate: '2022-12-22'
}];

renderTodoList();

function renderTodoList(){
    let todoListHtml = '';

    for(let i = 0; i < TodoList.length; i++){
      const todoObject = TodoList[i];
     // const name =todoObject.name;
    //const dueDate = todoObject.dueDate;
    const {name, dueDate} = todoObject;
      const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="
        TodoList.splice(${i},1);
        renderTodoList();
      " class="delete-todo-button">Delete</button>
      `;
      todoListHtml += html;
    }
    
    document.querySelector('.js-todo-list')
      .innerHTML = todoListHtml;

}

function addToDo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dataInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dataInputElement.value;
  
  TodoList.push({
    //name: name,
  //dueDate: dueDate
    name,
    dueDate
  });
  
  inputElement.value = '';  //remove the value from text box after adding.
  renderTodoList();
}