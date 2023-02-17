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

    //ToDoApp.json doesn't go to github because it mentioned in .gitignore, when we deploy contract by      truffle migrate      -- then it will automatically generated and deployed address comes in it.

    //Overall one .gitignore will cover its inside folder(both client and truffle folder here) files also not only root folder files which names are mentioned, or any folder path from  .gitignore location in .gitignore file..
    // see .gitignore file,whatever mentioned didn't go to github match it with project on github  and project in vsCode files and folder,you will know how .gitignore handles other folders inside root folder. like node module her not in root it is one level down to root but in .gitignore only node_module mentioned w/o path and it still care and don't push them to github
    return toDoAppInstance;
  } catch (err) {
    console.log(err);
  }
};
export default createToDoAppInstance;
