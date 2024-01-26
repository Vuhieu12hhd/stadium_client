import React, { useEffect, useState } from 'react';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import request from '../../api/request';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
function Match() {
    const navigate=useNavigate();
  const [matchList, setMatchList] = useState([]);
  const [currentMatch, setCurrentMatch] = useState({
    id: null,
  });
  const [currentCategories, setCurrentCategories] = useState([]);
  const handleDelete = async () => {
    const result = await request.deleteMatch(currentMatch.id);
    const response=result.data
      if(response.success)
      {
        toast.success(response.data.message, {
            autoClose: 2000,
          });
          getMatchs();
      }
  };

  console.log('currentCategories', currentCategories);
  const getMatchs = async () => {
    const result = await request.getMatchs();
    setMatchList(result.data);
    setCurrentMatch(result.data[0]);
  };
  const getCategories = async matchId => {
    const result = await request.getCategoriesByMatchId(matchId);
    setCurrentCategories(result.data);
  };

  useEffect(() => {
    getMatchs();
   
  }, []);

  useEffect(() => {
    if (currentMatch?.id) {
      getCategories(currentMatch?.id);
    }
  }, [currentMatch?.id]);

  return (
    <div className='wrapper'>
      <Nav />
      <Menu />
      <div className='content-wrapper'>
        <div className='content-header'>
          <div className='container-fluid'>
            <div className='row mb-2'>
              <div className='col-sm-6'></div>
              <div className='col-sm-6'>
                <ol className='breadcrumb float-sm-right'>
                  <li className='breadcrumb-item'>
                    <a href='/admin'>Home</a>
                  </li>
                  <li className='breadcrumb-item active'>
                    DANH SÁCH TRẬN ĐẤU
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className='content'>
          <div className='container'>
            {/* Content */}
            <div className='row'>
              <div className='col-sm-3'>
                <div className='list-group match-list'>
                  {matchList.map(match => {
                    return (
                      <Link
                        to='#'
                        key={match.id}
                        onClick={() => setCurrentMatch(match)}
                        className='list-group-item'
                      >
                        {match.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className='col-sm-9'>
                <div
                  className='modal fade'
                  id='exampleModal'
                  tabIndex={-1}
                  role='dialog'
                  aria-labelledby='exampleModalLabel'
                  aria-hidden='true'
                >
                  <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h5 className='modal-title' id='exampleModalLabel'>
                          Xác nhận
                        </h5>
                        <button
                          type='button'
                          className='close'
                          data-dismiss='modal'
                          aria-label='Close'
                        >
                          <span aria-hidden='true'>×</span>
                        </button>
                      </div>
                      <div className='modal-body'>
                        Bạn muốn kết thúc trận đấu này?
                      </div>
                      <div className='modal-footer'>
                        <button
                          type='button'
                          className='btn btn-secondary'
                          data-dismiss='modal'
                        >
                          Đóng
                        </button>
                        <button
                          type='button'
                          className='btn btn-danger'
                          data-dismiss='modal'
                          onClick={handleDelete}
                        >
                          Kết thúc
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <c:foreach var='match' items='${matchs}'> */}
                {currentMatch && (
                  <div className='info-match' id='info-match-${match.id}'>
                    <div
                      id='detail-match-${match.id}'
                      style={{ marginLeft: '150px' }}
                    >
                      <h2>{currentMatch.name}</h2>
                      <br />
                      <img
                        width={120}
                        height={160}
                        src={currentMatch.image}
                        alt='match'
                      />
                      <br />
                      <br />
                      <label>KHUÔN KHỔ:</label> {currentMatch.director}
                      <br />
                      <br />
                      <label>LỊCH SỬ ĐỐI ĐẦU:</label> {currentMatch.description}
                      <br />
                      <br />
                      <label>THỂ LOẠI:</label>{' '}
                      {currentCategories.map(c => c.name).join(', ')}
                      <br />
                      <br />
                      <label>THỜI GIAN MỞ BÁN VÉ:</label>{' '}
                      {moment(currentMatch.timeRelease).format('DD-MM-YYYY')}
                      <br />
                      <br />
                      <label>THỜI GIAN:</label> {currentMatch.time}
                      <br />
                      <br />
                      <label>ĐỘ TUỔI:</label>{' '}
                      {currentMatch.ageLimit === 0 ? 13 : currentMatch.ageLimit}
                      <br />
                      <br />
                      <Link to={`/admin/matchs/${currentMatch.id}`}>
                        <button
                          type='button'
                          className='btn btn-primary btn-update-match'
                        >
                          Cập nhật
                        </button>
                      </Link>
                      <button
                        type='button'
                        data-toggle='modal'
                        data-target='#exampleModal'
                        data-match-id='${match.id}'
                        className='btn btn-danger match-delete-action'
                      >
                        Kết thúc phim
                      </button>
                    </div>
                  </div>
                )}
                {/* </c:foreach> */}
              </div>
            </div>
            {/* End Content */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Match;
