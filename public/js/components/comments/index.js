import React from 'react';
import { Router, Link } from 'react-router';
import actions from '../../actions/comment';
import CommentList from './list';
import LangHandler from '../../lang';

import { Form, FormGroup, FormControl, Button, Col, ControlLabel } from 'react-bootstrap';


const enabledSubmitDelay = 1000;
const COMMENT_MAX_SIZE = 1000; //symbols
let componentReady = false;
let commentList = [];

function isTaskExistsById(items, id){
    for(let item of items){
         if( item.id === parseInt(id) ) { return true; }
    }
    return false;
}

function getItemsById(items, key, id){
    return items.filter(item => item[key] === parseInt(id));
}

function getTitle(tasks, id){
    let res = getItemsById(tasks, 'id', id);
    if(res.length > 0){
        return res[0].name;
    }
    return '';
}

const CommentPage = React.createClass ({

    getInitialState() {
        return {
            valueUser: '',
			valueMsg: '',
			comments: [],
            statusType: '', //status (error, success)
            submitDisabled: false
        };
    },

    outputResult(statusType){
        let timeout = 800;
        this.setState({ statusType: statusType });
        setTimeout(()=> {
            this.setState({ statusType: '' });
        }, timeout);
    },

	componentWillMount(){		
		this.setState({ comments: commentList });
	},

    componentWillUnmount() {
        componentReady = false;
    },


    componentWillReceiveProps(nextProps){
        //ok -> send confirmation that contact send
        let statusType = 'error';
		
        if(nextProps.comments.length >= 0){
            statusType = 'success';
            //clear input
            this.user.value = '';
		    this.msg.value = '';

		    //only those are for params id
		    let taskComments = getItemsById(nextProps.comments, 'taskId', this.props.taskId.params.taskId);

			commentList = taskComments;
			this.setState({ comments: taskComments });
        }

        if(componentReady){
            setTimeout(() => {
                if(componentReady){
                    this.setState({ submitDisabled: false });
                }
            }, enabledSubmitDelay);

            this.outputResult(statusType);
        }
    },


    getValidationStateSubmit(){
        if(this.state.statusType === 'success') return 'success';
        return 'error';
    },

	handleChange(e) {
        this.setState({ 
			valueUser: e.target.valueUser,
			valueMsg: e.target.valueMsg
		});
    },

	
    addComment(e){
       e.preventDefault();
       componentReady = true;

       this.setState({ submitDisabled: true });

       let inputData = {
          user: this.user.value,
	 	  msg: this.msg.value,
          taskId: parseInt(this.props.taskId.params.taskId)
       };

       //check if task exists
       let tasks = this.props.tasks;
       if(!isTaskExistsById(tasks, inputData.taskId) || inputData.user.length < 3 || inputData.msg < 10 || inputData.msg > COMMENT_MAX_SIZE){
	 	   this.setState({ submitDisabled: false });
		   return this.setState({ statusType: 'error' });
	   }

       actions.addComment(inputData);
   },



  render() {
    return (
      <div className="jumbotron" id="user_contact">
        <div className="container">
		
          <h3>
              {LangHandler.getVal('comments', 'list_title')} &nbsp;
              {
                  getTitle(this.props.tasks, this.props.taskId.params.taskId)
              }
          </h3>
		  
     		<CommentList taskId={this.props.taskId.params.taskId} comments={this.state.comments} />
	
            <Form horizontal>
                <FormGroup controlId="formUserText">
                    <Col componentClass={ControlLabel} sm={2}>
                        {LangHandler.getVal('comments', 'form_user')}
                    </Col>
                    <Col sm={5}>
                        <FormControl type="user" placeholder="user"
                         inputRef={(ref) => {this.user = ref}}
                         value={this.state.valueUser}
						 onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>
				
				 <FormGroup controlId="formControlsTextarea">
					<Col componentClass={ControlLabel} sm={2}>
                        {LangHandler.getVal('comments', 'form_message')}
                    </Col>
                    <Col sm={5}>
                       <FormControl componentClass="textarea" placeholder="message" 
							inputRef={(ref) => {this.msg = ref}}
							value={this.state.valueMsg}   
							onChange={this.handleChange}		
						/>
                    </Col>			
				</FormGroup>
				
                <FormGroup>
                    <Col smOffset={2} sm={5}>
                        <Button type="submit" onClick={this.addComment} disabled={this.state.submitDisabled}>
                            {LangHandler.getVal('comments', 'form_submit')}
                        </Button>
                    </Col>
                </FormGroup>	

                <FormGroup controlId="formConfirmation"
                           validationState={this.getValidationStateSubmit()}>
                    <Col componentClass={ControlLabel} sm={5}>
                        {this.state.statusType}
                    </Col>
                </FormGroup>
				
            </Form>

        </div>
      </div>
    );
  }
});



export default CommentPage;
