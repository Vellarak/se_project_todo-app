import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import popupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopUpElement = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopUpElement.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos,".counter__text");

const addTodoPopUp = new popupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    renderTodo(values);
  
  },
});

addTodoPopUp.setEventListeners();

function handleCheck(completed)
{todoCounter.updateCompleted(completed);}

function renderTodo(todoData) {
  const todo = generateTodo(todoData);
  todosList.append(todo);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoPopUp.open();
});

//Section instance
const section = new Section({
  items: initialTodos,
  renderer: generateTodo,
  containerSelector: ".todo__list",
});

section.renderItems();

initialTodos.forEach((item) => {
  renderTodo(item);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();

//   // Create a date object and adjust for timezone

//   newTodoValidator.resetValidation();
//   addTodoPopUp.close();
// });
