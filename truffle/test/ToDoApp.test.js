//To run these test cases make sure your ganache app is running and configured in metamask, after run truffle test command for running these test cases,
//test cases will only run when ganache ui is running

// Import the contract artifacts
const ToDoApp = artifacts.require("ToDoApp");

// Import the Chai assertion library
const { expect } = require("chai");

// Start a new test suite using Mocha
contract("ToDoApp", (accounts) => {
  // Define a variable to hold the contract instance
  let todo;

  // Use the before() hook to deploy the contract before each test
  before(async () => {
    todo = await ToDoApp.deployed();
  });

  // Test the addToDo() function
  describe("addToDo()", () => {
    it("should add a new todo to the list", async () => {
      const id = "1";
      const task = "Buy groceries";
      await todo.addToDo(id, task);
      const newToDo = await todo.toDoList(id);
      expect(newToDo.task).to.equal(task);
      expect(newToDo.completed).to.equal(false);
      const toDoIds = await todo.getToDoIds();
      expect(toDoIds).to.deep.equal([id]);
    });
  });

  // Test the updateCompletion() function
  describe("updateCompletion()", () => {
    it("should mark the todo as completed", async () => {
      const id = "1";
      await todo.updateCompletion(id);
      const updatedToDo = await todo.toDoList(id);
      expect(updatedToDo.completed).to.equal(true);
    });
  });

  // Test the editToDo() function
  describe("editToDo()", () => {
    it("should update the task for a todo", async () => {
      const id = "1";
      const newTask = "Buy milk";
      await todo.editToDo(id, newTask);
      const updatedToDo = await todo.toDoList(id);
      expect(updatedToDo.task).to.equal(newTask);
    });
  });

  // Test the deleteToDo() function
  describe("deleteToDo()", () => {
    it("should delete a todo from the list", async () => {
      const id = "1";
      await todo.deleteToDo(id);
      const toDoIds = await todo.getToDoIds();
      expect(toDoIds).to.deep.equal([]);
      const deletedToDo = await todo.toDoList(id);
      expect(deletedToDo.task).to.equal("");
      expect(deletedToDo.completed).to.equal(false);
    });
  });
});
