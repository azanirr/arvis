import React from 'react';
import Navbar from '../component/Navbar/Navbar';
import Detail from '../component/Detail/DetailBody';

function Home (props) {

    const { data } = props;

    return (
        <div>
            <Navbar />
            <Detail data={data}/>
        </div>
    )
}

export default Home;