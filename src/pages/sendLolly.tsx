import React, {useState} from 'react';
import Header from '../components/Header';
import Lolly from '../components/Lolly';

export interface SendLollyProps {
    
}
 
const SendLolly: React.SFC<SendLollyProps> = () => {

    const [top,setTop]=useState('#6b6bde');
    const [middle,setMiddle]=useState('#4ac383');
    const [bottom,setBottom]=useState('#d2ec27');

    return ( 
        <div className="container">
            <Header />
            <div className="lollyContainer">
                <div>
                    <Lolly
                        fillTop={top}
                        fillMiddle={middle}
                        fillBottom={bottom}
                        />
                </div>
                <div className="colorContainer">
                    <label>
                        <input
                            type="color"
                            name="top"
                            value={top}
                            onChange={e=>setTop(e.target.value)}
                            />
                    </label>
                    <label>
                        <input
                            type="color"
                            name="middle"
                            value={middle}
                            onChange={e=>setMiddle(e.target.value)}
                            />
                    </label>
                    <label>
                        <input
                            type="color"
                            name="bottom"
                            value={bottom}
                            onChange={e=>setBottom(e.target.value)}
                            />
                    </label>
                </div>

            </div>
        </div>
     );
}
 
export default SendLolly;