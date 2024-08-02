const formEl = document.getElementById('todo-form');
const todoNameEl = document.getElementById('todo-name');
const dateEl = document.getElementById("due-date");
const addBtnEl = document.getElementsByName("add-btn");
const todoContainer = document.querySelector(".todo-container");
let todos = JSON.parse(localStorage.getItem('todos')) || [];

const deleteTodo= (i)=>{
  todos.splice(i,1);
  localStorage.setItem('todos', JSON.stringify(todos));
  displayTodo();
}

const addTodo = (e) => {
  e.preventDefault();
	const todoName = todoNameEl.value;
	const todoDate = dateEl.value;
	let todo = { name: todoName, date: todoDate, isCompleted: false };
	todos.push(todo);
  todoNameEl.value = "";
	dateEl.value = "";
  localStorage.setItem('todos', JSON.stringify(todos));
  displayTodo();
};

const markComplete =(index)=>{
	for (let i = 0; i < todos.length; i++) {
    if(i===index){
      todos[i].isCompleted=true;
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos));
	displayTodo();
}

const displayTodo =() =>{
  let displayHtml = "";
  for(let i=0; i<todos.length; i++){
    const {name, date,isCompleted } = todos[i];
		displayHtml +=
				` <span class='flex-center ${isCompleted ? 'completed' : ''}' >
            <input type='checkbox' onChange='markComplete(${i})' ${isCompleted ? 'checked' : ''} />
          ${name}
        </span>
				<span>Due date : ${date}</span>
				<button onclick='deleteTodo(${i})' class='btn delete-btn'>delete</button>`
  }
  todoContainer.innerHTML=displayHtml;
}

formEl.addEventListener('submit',addTodo);

displayTodo();
