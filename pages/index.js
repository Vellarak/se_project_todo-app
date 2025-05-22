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
  handleFormSubmit: () => {},
});

function renderTodo(todoData) {
  const todo = generateTodo(todoData);
  todosList.append(todo);
}

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

//Section instance
const section = new Section({
  items: initialTodos,
  renderer: generateTodo,
  containerSelector: ".todo__list",
});

section.renderItems();

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopUpElement);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopUpElement);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  renderTodo(values);

  newTodoValidator.resetValidation();
  closeModal(addTodoPopUpElement);
});

initialTodos.forEach((item) => {
  renderTodo(item);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
