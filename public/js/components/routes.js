import React, { Component } from 'react';
import * as ReactRouter from 'react-router';
	
import Layout from './layout';
import Home from './home';
import CommentPage from './comments/';
import Tasks from './tasks/tasks';
import Task from './tasks/task';
import Folder from './folders/folder';
import NotFound from './common/not_found';

import TaskStore from '../stores/TaskStore';
import CommentStore from '../stores/CommentStore';
import FolderStore from '../stores/FolderStore';


const Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    Link = ReactRouter.Link,
    IndexRoute  = ReactRouter.IndexRoute,
    browserHistory = ReactRouter.hashHistory;

//when refresh -> redirect to home page
browserHistory.replace('/');


const Routes = React.createClass({
	
	 getInitialState() {
		return {
			comments: CommentStore.getMessages(),
            tasks: TaskStore.getItems(),
            folders: FolderStore.getFolders()
		};
	  },

	 componentWillMount() {
		CommentStore.addChangeListener(this._onChange);
		TaskStore.addChangeListener(this._onChange);
        FolderStore.addChangeListener(this._onChange);
	 },

	 componentWillUnmount() {
		CommentStore.removeChangeListener(this._onChange);
		TaskStore.removeChangeListener(this._onChange);
		FolderStore.removeChangeListener(this._onChange);
     },

	 _onChange() {
		this.setState({
			comments: CommentStore.getMessages(),
            tasks: TaskStore.getItems(),
            folders: FolderStore.getFolders()
		});
	 },
	
	render(){
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Layout}>
					<IndexRoute component={Home}/>
                    <Route path="/folder/:folderId" component={(folderId) => (<Folder id={folderId} folders={this.state.folders} />) }/>
                    <Route path="/tasks" component={() => (<Tasks tasks={this.state.tasks} folders={this.state.folders} />) }/>
                    <Route path="/task/:id" component={(taskId) => <Task id={taskId} tasks={this.state.tasks} folders={this.state.folders} />}/>
                    <Route path="/comments/:taskId" component={(taskId) => (<CommentPage taskId={taskId} tasks={this.state.tasks} comments={this.state.comments} />) }/>
                </Route>
				<Route path="*" component={NotFound}/>
		  </Router>	
	  );
	}
	
});

export default Routes;


