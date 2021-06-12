import React from 'react';
import Navbar from '../component/Navbar/Navbar';
import Head from '../component/Home/Head';
import Body from '../component/Home/Body';
import Footer from '../component/Footer/Footer';

function Home (props) {

    const { data } = props;

    return (
        <div>
            <Navbar />
            <Head />
            <Body
                data={data} />
            <Footer />
        </div>
    )
}

export default Home;