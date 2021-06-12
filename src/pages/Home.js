import React from 'react';
import Navbar from '../component/Navbar/Navbar';
import Head from '../component/Home/Head';
import Body from '../component/Home/Body';

function Home (props) {

    const { data } = props;

    return (
        <div>
            <Navbar />
            <Head />
            <Body
                data={data} />
        </div>
    )
}

export default Home;