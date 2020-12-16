import React from 'react';

export interface HeaderProps {
    
}
 
const Header: React.SFC<HeaderProps> = () => {
    return ( 
        <div className="header-container">
            <h1>Virtual Lolly</h1>
        </div>
     );
}
 
export default Header;