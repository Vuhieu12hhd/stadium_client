import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import request from '../api/request';
import { useSelector } from 'react-redux';

function MatchList() {
  const auth = useSelector(state => state.auth);

  const [matchList, setMatchList] = useState([]);
  const getMatchs = async () => {
    const result = await request.getMatchs();
    setMatchList(result.data);
  };
  useEffect(() => {
    getMatchs();
  }, []);
  return (
    <div>
      <Navbar />

      <section className='container'>
        <div className='col-sm-12'>
          <br /><br />
          <h2>K+ Sport thế giới thể thao trong tầm tay bạn</h2>
          <img width= '100%' src="https://media-vov.emitech.vn/sites/default/files/styles/large/public/2021-08/07.jpg" alt="" />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MatchList;
