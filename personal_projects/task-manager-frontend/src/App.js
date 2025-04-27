import React, { useState } from 'react';
import { Tab, Nav, Container, Row, Col } from 'react-bootstrap';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

// Define App component
const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
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
              {/* Tab for Adding Task */}
              <Tab.Pane eventKey="add-task">
                <TaskForm onTaskAdded={handleTaskAdded} />
              </Tab.Pane>

              {/* Tab for Displaying Task List */}
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
