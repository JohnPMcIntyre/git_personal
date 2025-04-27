import React from 'react';

const TaskItem = ({ task }) => {
  return (
    <li>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.due_date}</p>
      <p>Category: {task.category}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
    </li>
  );
};

export default TaskItem;
