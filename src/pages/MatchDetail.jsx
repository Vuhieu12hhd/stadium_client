import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import request from '../api/request';

function MatchDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const { matchId } = params;
  const [matchData, setMatchData] = useState();
  const [categoryList, setCategoryList] = useState([]);
  console.log('categoryList', categoryList);
  const getMatchInfo = async matchId => {
    const resultMatch = await request.getMatchById(matchId);
    if (resultMatch.data.length === 0) {
      navigate('/error');
    }
    setMatchData(resultMatch.data[0]);
  };

  const getCategoryList = async matchId => {
    const resultCategory = await request.getCategoriesByMatchId(matchId);
    setCategoryList(resultCategory.data);
  };

  useEffect(() => {
    getMatchInfo(matchId);
    getCategoryList(matchId);
  }, [matchId]);
  return (
    <div>
      <Navbar />
      <section className='container'>
        <div className='col-sm-12'>
          {matchData && (
            <div className='match'>
              <h2 className='page-heading'>TRẬN ĐẤU: {matchData.name}</h2>
              <div className='match__info'>
                <div className='col-sm-4 col-md-3 match-mobile'>
                  <div className='match__images'>
                    <img alt='' src={matchData.image} />
                  </div>
                </div>
                <div className='col-sm-8 col-md-9'>
                  <Link
                    to={`/matchs/${matchData.id}`}
                    className='match__title link--huge'
                  >
                    {matchData.name}
                  </Link>
                  <p className='match__time'>{matchData.time} phút</p>
                  <p className='match__option'>
                    <strong>KHUÔN KHỔ: </strong>
                    {matchData.country}
                  </p>
                  <p className='match__option'>
                    <strong>THỂ LOẠI: </strong>
                    {categoryList.map(category => category.name).join(', ')}
                  </p>
                  <p className='match__option'>
                    <strong>NGÀY ĐẤU: </strong>
                    {moment(matchData.timeRelease).format('DD-MM-YYYY')}
                  </p>
                  <p className='match__option'>
                    <strong>LƯỢT MUA: </strong>
                    {matchData.view}
                  </p>
                  <p className='match__option'>
                    <strong>GIỚI HẠN TUỔI: </strong>
                    {matchData.ageLimit}
                  </p>
                  {/*  nếu giới hạn tuổi là 0 trong database thì gán là 13  */}
                </div>
              </div>
              <div className='clearfix' />
              <h2 className='page-heading'>CHI TIẾT</h2>
              <p className='match__describe'>{matchData.description}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default MatchDetail;
