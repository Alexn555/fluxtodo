/**
 * Created by alexn555 on 6/24/2017.
 *  Folder component
 */

import React from 'react'
import { Router, browserHistory, Link } from 'react-router'
import actions from '../../actions/folder';
import { Form, FormGroup, FormControl, Button, Col, ControlLabel } from 'react-bootstrap';
import { getItemsOfObject, formatDate, dateToTimestamp, toTimeStamp } from '../../util';
import LanguageHandler from '../../lang';

let folder = {};
let IS_FORM_CREATE = false;

function findItemById(folders, id){
    return folders.filter(folder => folder.id === parseInt(id))[0];
}


const Folder = React.createClass({

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

    getInitialState() {
        return {
            valName: '',
            statusType: '', //status (error, success)
            submitDisabled: false
        };
    },

    componentWillReceiveProps(nextProps){
        if(parseInt(nextProps.id.params.folderId) === -1){
            IS_FORM_CREATE = true;
            folder = { name: '' };
        }else{
            IS_FORM_CREATE = false;
        }

        if(!IS_FORM_CREATE && nextProps.folders.length >= 0){
            folder = findItemById(nextProps.folders, nextProps.id.params.folderId);
        }

        if(folder){
            this.setState({
                valName: folder.name,
            });
        }
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

    createFolder(){
        let inputData = {
            name: this.name.value
        };

        let statusType = 'error';

        //name cannot be empty
        if(inputData.name && inputData.name.length > 3){
            actions.create(inputData);
            statusType = 'success';
        }

        this.outputResult(statusType, ()=> {
            this.context.router.push('/tasks');
        });
    },

    editFolder(){
        let inputData = {
            name: this.name.value
        };
        let statusType = 'error';

        if(inputData.name && inputData.name.length > 3){
            actions.edit({
                folderId: parseInt(this.props.id.params.folderId),
                name: inputData.name
            });
            statusType = 'success';
        }

        this.outputResult(statusType, ()=>{});
    },


    removeFolder(){
        if(folder){
            //redirect to tasks page
            //browserHistory.goBack();
            actions.remove(folder.id);
            this.context.router.push('/tasks');
            folder = {};
        }
    },


    render(){
        return (
            <div className="jumbotron" id="user_contact">
                <div className="container">

                    <Form horizontal>

                        <FormGroup controlId="formNameText">
                            <Col componentClass={ControlLabel} sm={2}>
                                {LanguageHandler.getVal('folders', 'form_name')}
                            </Col>
                            <Col sm={5}>
                                <FormControl type="name" placeholder="name"
                                             inputRef={(ref) => {this.name = ref}}
                                             value={this.state.valName}
                                             onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>

                        {
                            (IS_FORM_CREATE) ?
                                (
                                    <FormGroup>
                                        <Col smOffset={2} sm={6}>
                                            <Button type="button" onClick={this.createFolder} disabled={this.state.submitDisabled}>
                                                {LanguageHandler.getVal('folders', 'form_create')}
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                ) :
                                (
                                    <FormGroup>
                                        <Col smOffset={2} sm={6}>
                                            <Button type="button" onClick={this.editFolder} disabled={this.state.submitDisabled}>
                                                {LanguageHandler.getVal('folders', 'form_edit')}
                                            </Button>
                                            &nbsp; | &nbsp;
                                            <Button type="button" onClick={this.removeFolder} disabled={this.state.submitDisabled}>
                                                {LanguageHandler.getVal('folders', 'form_remove')}
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

                </div>
            </div>
        );
    }

});


export default Folder;