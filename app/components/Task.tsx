"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import { ITask } from '@/types/tasks'
import React, { FormEventHandler, useState } from 'react'
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";


interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  // Functions
  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit
    })
    setOpenModalEdit(false);
    router.refresh();
  }
  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  }

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-6">
        <FaEdit onClick={() => setOpenModalEdit(true)}
          cursor={"pointer"}
          size={25}
          className="text-blue-500" />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>Edit task</h3>
            <div className='modal-action'>
              <input type="text"
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full" />
              <button type='submit' className='btn'>Submit</button>
            </div>
          </form>
        </Modal>
        <FaTrash onClick={() => setOpenModalDeleted(true)}
          cursor={"pointer"} size={25}
          className="text-red-500" />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="btn">Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  )
}

export default Task