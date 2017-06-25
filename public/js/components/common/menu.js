import React from 'react'
import { Router, Link } from 'react-router'
import LangHandler from '../../lang';


export default React.createClass({

    render(){
       return(
		  <div className="master_menu">
			  <ul>
				<li key='home'><Link to='/'>
                    {LangHandler.getVal('menu', 'home')}</Link></li>&nbsp; |
				  &nbsp; <li key='comments'><Link to='/comments'>
                    {LangHandler.getVal('menu', 'comments')}</Link></li>&nbsp; |
				   &nbsp; <li key='tasks'><Link to='/tasks'>
                    {LangHandler.getVal('menu', 'tasks')}</Link></li> &nbsp; |
                   &nbsp; <li key='taskCreate'><Link to='/task/-1'>
                    {LangHandler.getVal('menu', 'create_task')}</Link></li> &nbsp; |
                   &nbsp; <li key='createFolder'><Link to='/folder/-1'>
                    {LangHandler.getVal('menu', 'create_folder')}</Link></li> &nbsp;
              </ul>
		   </div>
       );
    }
});
