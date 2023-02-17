const ToDoApp = artifacts.require("ToDoApp");

module.exports = function (deployer) {
  deployer.deploy(ToDoApp);
};
