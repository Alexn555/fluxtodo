import React from 'react'
import LanguageHandler from '../lang';

export default React.createClass({
    render(){
       return(
         <div className="page">
             <h1> {LanguageHandler.getVal('common','home_title')} </h1>
			  <div className="master">
				  <p> {LanguageHandler.getVal('common','home_heading')} </p>
                  <p> {LanguageHandler.getVal('common','home_desc')} </p>
			   </div>
         </div>
       );
    }
});

