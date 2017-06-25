import React from 'react'
import { Router, Link } from 'react-router'
import LanguageHandler from '../../lang';
	
const NotFound = React.createClass({
    render(){
       return(
           <div className='container'>
               <div className='row'>
                    <div className='col-md-12'>
                        {LanguageHandler.getVal('common', 'page_not_found') + ' '}
                         <Link to='/'>{LanguageHandler.getVal('common', 'to_home_page')}</Link>?
                   </div>
               </div>
            </div>
       );
    }
});

export default NotFound;