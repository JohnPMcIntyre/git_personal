import React, { useState, useEffect } from 'react';
import { Tab, Nav, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the server when the app loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data); // Set the fetched tasks in the state
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []); // Empty dependency array means it runs only once after the first render

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Update tasks after adding a new one
  };

  return (
    <Container className="mt-4">
      <h1>Task Manager</h1>
      <Tab.Container id="task-manager-tabs" defaultActiveKey="add-task">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="add-task">Add Task</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="task-list">Task List</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="add-task">
                <TaskForm onTaskAdded={handleTaskAdded} />
              </Tab.Pane>
              <Tab.Pane eventKey="task-list">
                <TaskList tasks={tasks} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default App;
