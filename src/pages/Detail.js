import React from 'react';
import Navbar from '../component/Navbar/Navbar';
import Detail from '../component/Detail/DetailBody';
import Footer from '../component/Footer/Footer';

function Home (props) {

    const { data } = props;

    return (
        <div>
            <Navbar />
            <Detail data={data}/>
            <Footer />
        </div>
    )
}

export default Home;