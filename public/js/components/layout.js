import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, Link } from 'react-router'
import LanguageHandler from '../lang';

import Menu from './common/menu';
import Footer from './common/footer';


//export default React.createClass({
const Layout = React.createClass({
	
    render(){
       return(
         <div class="page">
             <h1> {LanguageHandler.getVal('common', 'application')} </h1>
			 <Menu name="master_menu" />
			 <div className="master">
			    
			    {this.props.children}
			 
			 </div>
			 <Footer />
         </div>
       );
    }
	
});

export default Layout;
//module.exports = Layout;