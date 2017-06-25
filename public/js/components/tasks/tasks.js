import React from 'react'
import { Router, browserHistory, Link } from 'react-router'
import { Priorities, Statuses } from './util';

import LanguageHandler from '../../lang/';

import FoldersList from '../folders/list';

let tasks = [];
let nonFolderedTasks = [];
let folders = [];

//drag effects
let placeholder = document.createElement("li");
placeholder.className = "placeholder";


const Tasks = React.createClass({

    getInitialState() {
        return {
            tasks: [],
            nonFolderedTasks: [],
            folders: [],
        };
    },

    componentWillMount(){
        this.setState({
            tasks: tasks,
            nonFolderedTasks: nonFolderedTasks,
            folders: folders
        });
    },

    componentWillReceiveProps(nextProps){
        if(nextProps.folders.length >= 0){
            folders = nextProps.folders;
            this.setState({
                folders: nextProps.folders
            });
        }

        if(nextProps.tasks.length >= 0){
            tasks = nextProps.tasks;
            this.setState({
                tasks: nextProps.tasks.filter(item => item.name !== '' && item.fid !== -1),
                nonFolderedTasks: nextProps.tasks.filter(item => item.fid === -1)
            });

            let tasksWithClass = [];
            for(let task of this.state.tasks){
                task['className'] = this.getStatusClassName(task.status)
                tasksWithClass.push(task);
            }

            this.setState({ tasks: tasksWithClass });

            nonFolderedTasks = this.state.nonFolderedTasks;
        }
    },

    getStatusClassName(status){
        return status === Statuses.OPEN ? '' : 'taskClosed';
    },


    dragStart(e){
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';
        //firefox hack
        e.dataTransfer.setData('text/html', this.dragged);
    },

    dragEnd(e){
        this.dragged.style.display="";
        let hasNode = false;
        Array.prototype.forEach.call(this.dragged.parentNode.childNodes, function (node) {
            if(node.className == "placeholder")
                hasNode = true;
        } );
        if(!hasNode){
            return;
        }
        this.dragged.parentNode.removeChild(placeholder);
        let data = this.state.nonFolderedTasks;
        let from = Number(this.dragged.dataset.id);
        let to = Number(this.over.dataset.id);
        if(from < to) { to--; }
        if(this.nodePlacement == "after") { to++; }
        data.splice(to, 0, data.splice(from, 1)[0]);
        this.setState({data: data});
    },

    dragOver(e) {
        e.preventDefault();
        this.dragged.style.display = "none";

        if(e.target.className == "placeholder") { return; }
        this.over = e.target;
        // Inside the dragOver method
        let relY = e.clientY - this.over.offsetTop;
        let height = this.over.offsetHeight / 2;
        let parent = e.target.parentNode;

        if(relY > height) {
            this.nodePlacement = "after";
            parent.insertBefore(placeholder, e.target.nextElementSibling);
        }
        else if(relY < height) {
            this.nodePlacement = "before"
            parent.insertBefore(placeholder, e.target);
        }
    },

   render() {
      //folder list that contains tasks for each folder
      //ul of tasks (those that are not in any folder)
      return (
          <div className="page">
                <h3>{LanguageHandler.getVal('tasks', 'title')}</h3>
                <div className="master">

                  <FoldersList folders={this.state.folders} tasks={this.state.tasks} />

                  <ul className="nonFolderedTasks" onDragOver={this.dragOver}>
                     {
                       this.state.nonFolderedTasks.map((info) =>
                           <li key={info.id}
                               data-id={info.id}
                               draggable="true"
                               onDragStart={this.dragStart}
                               onDragEnd={this.dragEnd}
                               className="taskItem"
                             >
                               <Link to={`/task/${info.id}`}
                                   className={this.getStatusClassName(info.status)}>
                               {info.name}
                               </Link>
                           </li>
                         )
                     }
                  </ul>

                </div>

                <div className="detail">
                    {this.props.children}
                </div>

          </div>
        )
    }

});

export default Tasks;