import React from 'react';
import { Router, Link } from 'react-router';
import actions from '../../actions/folder';

const VIEW_REMOVE_ITEM = false;

let Item = React.createClass({
	deleteFolder(id){
		actions.remove(id);
	},
	
    render(){
        let info = this.props.info;
        let tasks = this.props.tasks;

        let taskItems = [];
        for(let task of tasks){
            taskItems.push(
                <li key={task.id}>
                    <Link to={`/task/${task.id}`}
                          className={task.className}>
                        {task.name}
                    </Link>
                </li>
            );
        }

        return (
            <div className="folder" key={info.id}>
                <Link to={`/folder/${info.id}`}> {info.name} { taskItems.length > 0 ? '('+taskItems.length+')' : ''} </Link>
                <ul className="folderTasks">
                    {taskItems}
                </ul>

                {
                    (VIEW_REMOVE_ITEM) ? (
                            <p> <a onClick={() => this.deleteFolder(info.id)} className="removeItem"> Remove </a> </p>
                        ) : ('')
                }
            </div>
        );
    }
});


const FoldersList = React.createClass ({
	render() {
		let folders = [];
		this.props.folders.forEach(function(folder){
		    //get tasks that are relative to folder
            let tasks = [];
            for(let task of this.props.tasks){
                if(task.fid === folder.id){
                    tasks.push(task);
                }
            }
            folders.push(<Item info={folder} tasks={tasks} key={folder.id} />);
		}.bind(this));

		return (
		  <div id="folders">
               {folders}
		  </div>
		);
	}
});


export default FoldersList;
