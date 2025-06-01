import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import popupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopUpElement = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopUpElement.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const addTodoPopUp = new popupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;
  },
});

addTodoPopUp.setEventListeners();

function renderTodo(todoData) {
  const todo = generateTodo(todoData);
  todosList.append(todo);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    addTodoPopUp.close();
  }
}

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

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();
//   const values = { name, date, id };
//   renderTodo(values);

//   newTodoValidator.resetValidation();
//   addTodoPopUp.close();
// });

initialTodos.forEach((item) => {
  renderTodo(item);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
