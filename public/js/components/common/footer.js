import React from 'react'
import LanguageHandler from '../../lang';

export default React.createClass({
    render(){
       return(
         <div>
			  <div className="master_footer">
				  <p>{LanguageHandler.getVal('common', 'footer')}</p>
			   </div>
         </div>
       );
    }
});

