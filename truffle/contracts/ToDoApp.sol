//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ToDoApp {
    struct ToDo {
        string task;
        bool completed;
    }
    mapping(string => ToDo) public toDoList;
    address public manager;
    string[] public toDoId;

    constructor() {
        manager = msg.sender;
    }

    function getToDoIds() public view returns (string[] memory) {
        return toDoId;
    }

    function addToDo(string memory id, string memory task) public {
        ToDo memory newtodo = ToDo({task: task, completed: false});
        toDoList[id] = newtodo;
        toDoId.push(id);
    }

    function updateCompletion(string memory id) public {
        toDoList[id].completed = !toDoList[id].completed;
    }

    function deleteToDo(string memory id) public {
        delete (toDoList[id]);
        for (uint i = 0; i < toDoId.length; i++) {
            if (
                keccak256(abi.encodePacked(id)) ==
                keccak256(abi.encodePacked(toDoId[i]))
            ) {
                removeToDoId(i);
            }
        }
    }

    function editToDo(string memory id, string memory newTask) public {
        toDoList[id].task = newTask;
    }

    function removeToDoId(uint256 index) internal {
        if (index >= toDoId.length) return;

        for (uint i = index; i < toDoId.length - 1; i++) {
            toDoId[i] = toDoId[i + 1];
        }
        toDoId.pop();
    }
}
