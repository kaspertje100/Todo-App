var Task = React.createClass({
	
	propTypes : {
		
		// the description of the task		
		description : React.PropTypes.string.isRequired,

		// whether a task is completed or not
		completed   : React.PropTypes.bool,
		
		// handler to handle the on complete event
		onCompleted : React.PropTypes.function,
		
		// handler to handle the on delete event
		onDelete : React.PropTypes.function
	},

	getDefaultProps : function () {
		
		return {
			completed : false,
			onCompleted : function () {}
		};
	},

	render : function () {
		console.log('render function called ' + this.props.completed)
		return (
		<li>
            <span>{this.props.description}</span>
		    <input type="checkbox" checked={this.props.completed} onChange={this.props.onCompleted} />
            <button onClick={this.props.onDeleted}> X </button>
        </li>
		);
	}
	
});


var TaskList = React.createClass({

	propTypes : {
		
		// tasks to be displayed
		tasks : React.PropTypes.array,

		// handler to handle the onCompleted of a task. Will pass the index of the task to complete
		onCompleted: React.PropTypes.function,

		// handler to handle the onDeleted event of a task. Will pass the index of the task to delete
		onDeleted: React.PropTypes.function
	},

	getDefaultProps : function () {
		
		return {
			tasks : [],
			onCheckTask : function () {}
		};
	},
	
	onCompleted : function (taskIndex, e) {
		console.log('onCompleted function is called');
		e.preventDefault();
		this.props.onCompleted(taskIndex);
	},
	
	onDeleted : function (taskIndex, e) {
		console.log('onDeleted function is called');
		e.preventDefault();
		this.props.onDeleted(taskIndex);
	},
		
    render: function(){
    	
        return <ul>
            {this.props.tasks.map((task, taskIndex) => 
               	<Task 
			description={task.description}
			completed={task.completed}
			onCompleted={this.onCompleted.bind(this, taskIndex)}
			onDeleted={this.onDeleted.bind(this, taskIndex)}
		/>
            )}
        </ul>;
    }
 });

var TaskApp = React.createClass({
    getInitialState: function(){
        return {
             tasks: [],
             inputValue: '',
        }
    },
  
  
    onDelete: function(taskIndex) {
      	
        this.setState(state => {
            state.tasks.splice(taskIndex, 1);
	    	console.log('task nr: ' + taskIndex + ' was deleted');
            return { tasks : state.tasks };
        });
    },


    onComplete: function(taskIndex) {
		console.log('onComplete is called ' + taskIndex);
		this.setState({ onComplete: !this.state.onComplete });
		console.log('. ' + this.completed + ' state: ' + this.state.completed);
		if (this.state.tasks[taskIndex].completed === false) {
			this.setState(state => {
	    		this.state.tasks[taskIndex].completed = true;
				console.log('Checkbox ' + taskIndex + ' = true');
				this.forceUpdate()
	  	 		return {tasks: this.state.tasks};
			});
		} else if (this.state.tasks[taskIndex].completed === true) {
			this.setState(state => {
				this.state.tasks[taskIndex].completetd = false;
				console.log('Checkbox ' + taskIndex +' = false');
				return {tasks: this.state.tasks};
			});
		}
    },


    onChange: function(e) {
	console.log('onchange called ');
        this.setState({ inputValue: e.target.value });
    },


	onChangeCheckbox: function() {
		console.log('onchangeCheckbox called ');
		this.setState({ completed: this.state.completed });
	},


    addTask:function (e) {
		
		// prevent default operation from the browser
		e.preventDefault();
		
		// if no values in the input, just ignore
		if (this.state.inputValue === '') {
			console.log('the text field cannot be empty')
		return;
		}

		
		// add a new item to the state and cleanup the form
		this.setState({
			tasks: this.state.tasks.concat([{
				description : this.state.inputValue, 
				completed : false 
			}]),
			inputValue: ''
		})     
    },

	showCompleted:function(e) {
		e.preventDefault();
		this.setState({
			command : 'completed'
		})
		
	},

	showActive:function(e) {
		e.preventDefault();
		this.setState({
			command : 'active'
		})
	},

	showAll:function(e) {
		e.preventDefault();
		this.setState({		
			command : 'all'
		})
	},

	getTasks : function (command) {
		
		if (command === 'active') {
			return this.state.tasks.filter((value) => !value.completed);
		} else if (command === 'completed') {
			return this.state.tasks.filter((value) => value.completed);
		} else {
			return this.state.tasks;
		}
	},  

	render: function() { 
        return(
            <div>
                <h1>Todo</h1>    
                <TaskList tasks={this.getTasks(this.state.command)} onDeleted={this.onDelete} onCompleted={this.onComplete}/>
                <form onSubmit={this.addTask}>    
                    <input onChange={this.onChange} type="text" value={this.state.inputValue}/>
                    <button> Add Task </button>    
                </form>  
			<div>
				<button onClick={this.showActive} > active </button>
					<button onClick={this.showCompleted} > completed </button>
				<button onClick={this.showAll} > all </button>
			</div>
            </div>
        );
    }
});
 
React.render(<TaskApp />, document.getElementById('content'));
