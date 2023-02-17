import createToDoAppInstance from "../toDoContract";
import web3 from "../web3";
const useToDoState = async () => {
  const instance = await createToDoAppInstance();
  const accounts = await web3.eth.getAccounts();
  return {
    addToDo: async (todo) => {
      await instance.methods
        .addToDo(todo.id, todo.task)
        .send({ from: accounts[0] });
    },
    removeToDo: async (id) => {
      await instance.methods.deleteToDo(id).send({ from: accounts[0] });
    },
    editToDo: async (todo) => {
      await instance.methods
        .editToDo(todo.id, todo.task)
        .send({ from: accounts[0] });
    },
    updateIsDone: async (todo) => {
      await instance.methods
        .updateCompletion(todo.id)
        .send({ from: accounts[0] });
    },
  };
};
export default useToDoState;
