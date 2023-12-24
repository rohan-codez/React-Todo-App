import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';
import deleteLogo from '../icons/delete.png'
import editLogo from '../icons/edit.png'
import saveLogo from '../icons/save.png'

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const { updateTodo, deleteTodo, toggleComplete } = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg })
        setIsTodoEditable(false)
    }
    const toggleCompleted = () => {
        //console.log(todo.id);
        toggleComplete(todo.id)
    }

    return (
        <div
            className={`flex items-center border-none rounded-lg px-3 py-2 gap-x-3 duration-300 text-lg text-black ${todo.completed ? "bg-[#B3E9C7]" : "bg-[#F0FFF1]"
                }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer h-6 w-6"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`py-2 border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                    } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-none justify-center items-center bg-transparent hover:bg-gray-100 shrink-0 disabled:opacity-50 select-none"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? <img className='h-7' src={saveLogo} alt='save' /> : <img className='h-7' src={editLogo} alt='edit' />}
            </button>
            {/* Delete Todo Button */}
            <button
                className="select-none inline-flex w-8 h-8 rounded-lg text-sm border-none justify-center items-center  bg-transparent hover:bg-gray-100 shrink-0  opacity-100"
                onClick={() => deleteTodo(todo.id)}
            >
                <img className='h-7' src={deleteLogo} alt="delete" />
            </button>
        </div>
    );
}

export default TodoItem;
