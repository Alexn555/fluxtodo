import React from 'react'
import { Router, browserHistory, Link } from 'react-router'
import actions from '../../actions/task';
import { Form, FormGroup, FormControl, Button, Col, ControlLabel } from 'react-bootstrap';
import  DatePicker from 'react-bootstrap-date-picker';
import { Priorities, Statuses } from './util';
import { getItemsOfObject, formatDate, timestampToISO, dateToTimestamp, isoToTimestamp, nonISOtoTimeStamp } from '../../util';
import LanguageHandler from '../../lang';

let task = {};
let IS_FORM_CREATE = false;

function findItemById(tasks, id){
    return tasks.filter(task => task.id === parseInt(id))[0];
}


function getPriorityOptions(taskItem){
    let priorities = getItemsOfObject(Priorities);

    let items = [];
    priorities.map(item => {
        if(item.key !== taskItem.priority){
            items.push(<option key={item.index} value={item.key}>{item.key}</option>);
        }else {
            items.push(<option key={item.index} defaultValue={item.key} selected>{item.key}</option>);
        }
    });

    return items;
}



function getFolderOptions(folders, taskItem){
    let optionNoFolder = <option key={-1} value={-1}>{'Not into folder'}</option>;
    if(folders && folders.length <= 0) {
        return optionNoFolder;
    }

    let items = [];
    items.push(optionNoFolder);
    folders.map(item => {
        if(taskItem){
            if(item.id !== taskItem.fid){
                items.push(<option key={item.id} value={item.id}>{item.name}</option>);
            }else {
                items.push(<option key={item.id} value={item.id} defaultValue={item.id} selected>{item.name}</option>);
            }
        }
    });

    return items;
}



const Task = React.createClass({

    // ask for `router` from context (for redirect)
    contextTypes: {
        router: React.PropTypes.object
    },

    outputResult(statusType, onComplete){
        let timeout = 800;
        this.setState({ statusType: statusType });
        setTimeout(()=> {
            this.setState({ statusType: '' });
            onComplete();
        }, timeout);
    },

    createDefaultDueDate(){
        let dueDate = new Date();
        dueDate.setDate(dueDate.getDay()+1);
        dueDate.setMonth(dueDate.getMonth() + 1);
        return dueDate;
    },

    getInitialState() {
        return {
            valName: '',
            valAssignee: '',
            valPriority: '',
            valDueDate: '',
            valFolder: '',
            valStatus: '',
            statusType: '', //status (error, success)
            submitDisabled: false
        };
    },

    componentWillReceiveProps(nextProps){

        let dueDate = '';
        if(parseInt(nextProps.id.params.id) === -1){
            IS_FORM_CREATE = true;
            task = {
                name: '',
                assignee: '',
                createDate: dateToTimestamp(Date.now()),
                dueDate: timestampToISO(dateToTimestamp(this.createDefaultDueDate())),
                valFolder: '',
                priority: ''
            }
            dueDate = task.dueDate;
        }else{
            IS_FORM_CREATE = false;
        }

        if(!IS_FORM_CREATE && nextProps.tasks.length >= 0){
            task = findItemById(nextProps.tasks, nextProps.id.params.id);
            dueDate = timestampToISO(task.dueDate);
        }

        if(task){
            this.setState({
                valName: task.name,
                valAssignee: task.assignee,
                valPriority: task.priority,
                valDueDate: dueDate,
                valFolder: task.fid,
                valStatus: task.status
            });
        }
   },



    handleDueDateChange: function(value, formattedValue) {
        this.setState({
            valDueDate: value, // ISO String, "2016-11-19T12:00:00.000Z"
        });
    },

    getValidationStateSubmit(){
        if(this.state.statusType === 'success') return 'success';
        return 'error';
    },

    handleChange(e) {
        this.setState({
            valName: e.target.valName,
            valAssignee: e.target.valAssignee
        });
    },


    checkValidInput(inputData){
        let statusType = 'error';
        let nameMinSize = 3;
        if((inputData.dueDate > 0 && inputData.createDate < inputData.dueDate)
            && inputData.name && inputData.name.length > nameMinSize){
            statusType = 'success';
        }
        else {
            if(inputData.dueDate > 0 && inputData.createDate >= inputData.dueDate){
                 statusType = 'error -> Due date should be bigger than create date';
            }
            if(!inputData.name || inputData.name.length <= nameMinSize){
                statusType = 'error -> Name should be minimum ' + nameMinSize + ' characters';
            }
        }

        return statusType;
    },


    createTask(){
        let inputData = {
            name: this.name.value,
            createDate: nonISOtoTimeStamp(this.createDate.value),
            dueDate: isoToTimestamp(this.state.valDueDate),
            assignee: this.assignee.value,
            fid: parseInt(this.folder.value),
            priority: this.priority.value,
            status: Statuses.OPEN
        };

        let statusType = this.checkValidInput(inputData);
        if(statusType === 'success'){
            actions.add(inputData);
        }

        this.outputResult(statusType, ()=>{});
    },

    editTask(){
        let inputData = {
            name: this.name.value,
            createDate: nonISOtoTimeStamp(this.createDate.value),
            dueDate: isoToTimestamp(this.state.valDueDate),
            assignee: this.assignee.value,
            fid: parseInt(this.folder.value),
            priority: this.priority.value,
            status: Statuses.OPEN
        };

        let statusType = this.checkValidInput(inputData);
        if(statusType === 'success'){
            actions.edit(task.id, inputData);
        }

        this.outputResult(statusType, ()=>{});
    },

    setStatusClassName(status){
        return status === Statuses.OPEN ? 'task_status_active' : 'task_status_closed';
    },

    toggleStatus(status){
        return status === Statuses.OPEN ? Statuses.CLOSED : Statuses.OPEN;
    },


    toggleTaskStatus(){
        let status = this.toggleStatus(task.status);
        let inputData = {
            name: this.name.value,
            createDate: nonISOtoTimeStamp(this.createDate.value),
            dueDate: isoToTimestamp(this.state.valDueDate),
            assignee: this.assignee.value,
            fid: parseInt(this.folder.value),
            priority: this.priority.value,
            status: status
        };

        let statusType = this.checkValidInput(inputData);
        if(statusType === 'success'){
            actions.edit(task.id, inputData);
        }else{
            this.outputResult(statusType, ()=>{});
        }

    },

    removeTask(){
        if(task){
            //redirect to tasks page
            //browserHistory.goBack();
            actions.remove(task.id);
            this.context.router.push('/tasks');
            task = {};
        }
    },


     render(){
       let createDate = (typeof task.createDate !== 'undefined') ? formatDate(task.createDate) : dateToTimestamp(Date.now());

       return (
          <div className="jumbotron" id="user_contact">
              <div className="container">

                   <Form horizontal>

                       <FormGroup controlId="formNameText">
                           <Col componentClass={ControlLabel} sm={2}>
                               {LanguageHandler.getVal('tasks', 'form_name')}
                           </Col>
                           <Col sm={5}>
                               <FormControl type="name" placeholder="name"
                                    inputRef={(ref) => {this.name = ref}}
                                    value={this.state.valName}
                                    onChange={this.handleChange}
                               />
                           </Col>
                       </FormGroup>

                       <FormGroup controlId="formCreateDateText">
                           <Col componentClass={ControlLabel} sm={2}>
                               {LanguageHandler.getVal('tasks', 'form_createDate')}
                           </Col>
                           <Col sm={5}>
                               <FormControl type="createDate" placeholder="createdate not found"
                                    inputRef={(ref) => {this.createDate = ref}}
                                    readOnly={true}
                                    value={createDate}
                               />
                           </Col>
                       </FormGroup>

                       <FormGroup controlId="formDueDateText">
                           <Col componentClass={ControlLabel} sm={2}>
                               {LanguageHandler.getVal('tasks', 'form_dueDate')}
                           </Col>
                           <Col sm={5}>
                                 <DatePicker id="duedate-datepicker" value={this.state.valDueDate}
                                      dateFormat="DD.MM.YYYY"
                                     onChange={this.handleDueDateChange} />
                           </Col>
                       </FormGroup>


                       <FormGroup controlId="formAssigneeText">
                           <Col componentClass={ControlLabel} sm={2}>
                               {LanguageHandler.getVal('tasks', 'form_assignee')}
                           </Col>
                           <Col sm={5}>
                           <FormControl type="user" placeholder="assignee not defined"
                               inputRef={(ref) => {this.assignee = ref}}
                               value={this.state.valAssignee}
                               onChange={this.handleChange}
                              />
                         </Col>
                       </FormGroup>

                       <FormGroup controlId="formControlsSelect">
                           <Col componentClass={ControlLabel} sm={2}>
                               {LanguageHandler.getVal('tasks', 'form_folder')}
                           </Col>
                           <Col sm={5}>
                               <FormControl componentClass="select" placeholder="select folder"
                                            inputRef={(ref) => {this.folder = ref} }>
                                   { getFolderOptions(this.props.folders, task)}
                               </FormControl>
                           </Col>
                       </FormGroup>

                       <FormGroup controlId="formControlsSelect">
                           <Col componentClass={ControlLabel} sm={2}>
                               {LanguageHandler.getVal('tasks', 'form_priority')}
                           </Col>
                           <Col sm={5}>
                               <FormControl componentClass="select" placeholder="select priority"
                                            inputRef={(ref) => {this.priority = ref} }>
                                   { getPriorityOptions(task)}
                               </FormControl>
                           </Col>
                       </FormGroup>

                       {
                           (IS_FORM_CREATE) ?
                               (
                                   <FormGroup>
                                       <Col smOffset={2} sm={6}>
                                           <Button type="button" onClick={this.createTask} disabled={this.state.submitDisabled}>
                                               {LanguageHandler.getVal('tasks', 'form_create')}
                                           </Button>
                                       </Col>
                                   </FormGroup>
                               ) :
                               (
                                   <FormGroup>
                                       <Col smOffset={2} sm={6}>
                                           <Button type="button" onClick={this.editTask} disabled={this.state.submitDisabled}>
                                               {LanguageHandler.getVal('tasks', 'form_edit')}
                                           </Button>
                                           &nbsp; | &nbsp;
                                           <Button type="button" onClick={this.removeTask} disabled={this.state.submitDisabled}>
                                               {LanguageHandler.getVal('tasks', 'form_remove')}
                                           </Button>
                                           &nbsp; | &nbsp; <span className={this.setStatusClassName(this.state.valStatus)}> &nbsp; </span>
                                           <Button type="button" onClick={this.toggleTaskStatus} disabled={this.state.submitDisabled}>
                                               { this.state.valStatus === Statuses.OPEN ? LanguageHandler.getVal('tasks', 'form_closeTask')
                                                   : LanguageHandler.getVal('tasks', 'form_openTask') }
                                           </Button>
                                       </Col>
                                   </FormGroup>
                               )
                       }

                       <FormGroup controlId="formConfirmation"
                           validationState={this.getValidationStateSubmit()}>
                        <Col componentClass={ControlLabel} sm={5}>
                             { this.state.statusType }
                        </Col>
                   </FormGroup>

               </Form>

                  {
                      (!IS_FORM_CREATE) ?
                         (
                              <div className="container">
                                  <h3> {LanguageHandler.getVal('comments', 'form_title')} </h3>
                                  <Link to={`/comments/${task.id}`}>{LanguageHandler.getVal('comments', 'form_viewAll')} </Link>
                              </div>
                         ) : ('')
                  }

             </div>
           </div>
       );
   }

});


export default Task;