import web3 from "./web3";
import ToDoApp from "./contracts/ToDoApp.json";
const createToDoAppInstance = async () => {
  try {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = ToDoApp.networks[networkId];
    const toDoAppInstance = new web3.eth.Contract(
      ToDoApp.abi,
      deployedNetwork && deployedNetwork.address
    );

    //ToDoApp.json doesn't go to github, when we deploy contract by      truffle migrate      -- then it will automatically generated and deployed address comes in it.
    return toDoAppInstance;
  } catch (err) {
    console.log(err);
  }
};
export default createToDoAppInstance;
