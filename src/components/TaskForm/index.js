import  { Component } from 'react';
import './index.css';


class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      description: '',
      dueDate: '',
      tasks: [] // Array to store tasks
    };
  }


  deleteTask = (index) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter((task, i) => i !== index)
    }));
  }



  onChangeTaskHandler = (event) => {
    this.setState({ taskName: event.target.value });
  }

  handleChangeDescription = (event) => {
    this.setState({ description: event.target.value });
  }

  handleChangeDate = (event) => {
    this.setState({ dueDate: event.target.value });
  }

  onClickButton = () => {
    const { taskName, description, dueDate } = this.state;
   
    const newTask = { taskName, description, dueDate };


    if (!taskName.trim() || !dueDate || !description.trim()) {
      this.setState({ error: 'Please fill in all fields' });
      return;
    }

    this.setState({ error: '' });



    
    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask],
      taskName: '', 
      description: '',
      dueDate: ''
    }));
  }
  handleSubmit = (event) => {
    event.preventDefault()
    
  const { taskName, dueDate } = this.state;

  if (!taskName.trim()) {
    this.setState({ error: 'Task name cannot be empty' });
    return;
  }

  if (!dueDate) {
    this.setState({ error: 'Please select a due date' });
    return;
  }

 
  this.setState({ error: '' });

  
  console.log('Form submitted:', this.state);



  }

  render() {
    const { taskName, description, dueDate, tasks ,error} = this.state;

    return (
      <div className='main-container'>
        <h1 className='heading'>Task Summary Page</h1>
        
        <form className='submit' onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='taskName'
            value={taskName}
            onChange={this.onChangeTaskHandler}
            placeholder="Task Name"
            className='task_name'
          />
           
          <textarea
            name="description"
            value={description}
            onChange={this.handleChangeDescription}
            placeholder="Description"
            className='description'
          />
          <input
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={this.handleChangeDate}
            className='date'
          />
        </form>
        {error && <p className="error">{error}</p>}
        <div>
          <button type="button" className='button' onClick={this.onClickButton}>Add Task</button>
        </div>
        <div>
          <h2 className='tesk-details'>Task Details</h2>
         
          {tasks.map((task, index) => (
            <div key={index} className='list-container'>
              <h3 className='sub-heading'>{task.taskName}</h3>
              <p className='sub-description'>{task.description}</p>
              <h1 className='sub-duedate'>{task.dueDate}</h1>
              <button onClick={() => this.deleteTask(index)} className='delete-btn'>
             Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TaskForm;