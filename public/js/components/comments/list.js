import React from 'react';
import { Router, Link } from 'react-router';
import actions from '../../actions/comment';
import LanguageHandler from '../../lang';

const ALLOW_REMOVE_COMMENT = true;

let Item = React.createClass({
	deleteComment(id){
		actions.removeComment(id);
	},
	
    render(){
        let info = this.props.info;
        return (
            <div key={info.id} className="listComment">
                <h5> {LanguageHandler.getVal('comments', 'user')+':'} { info.user }</h5>
                <p> { info.msg } </p>

                {
                   (ALLOW_REMOVE_COMMENT) ? (
                         <p> <a onClick={() => this.deleteComment(info.id)} className="removeItem"> Remove </a> </p>
                    ) : ('')
                }

            </div>
        );
    }
});


const CommentList = React.createClass ({
	render() {
		let comments = [];
		this.props.comments.forEach(function(Comment){
			comments.push(<Item info={Comment} key={Comment.id} />);
		}.bind(this));

		return (
		  <div id="comments">
			  <ul>
				  {comments}
			  </ul>
		  </div>
		);
	}
});


export default CommentList;
