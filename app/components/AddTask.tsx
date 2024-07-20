"use client";

import React, { FormEventHandler, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import Modal from './Modal'

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(newTaskValue);
  }

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className='btn btn-primary w-full'>
        Add new task<FaPlus className='ml-1' size={16} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>Add new task</h3>
          <div className='modal-action'>
            <input type="text"
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full" />
            <button type='submit' className='btn'>Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTask