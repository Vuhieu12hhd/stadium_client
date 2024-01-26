import React, { useEffect, useState } from 'react';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import request from '../../api/request';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Stadium() {
  const [stadiumList, setStadiumList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [currentStadium, setCurrentStadium] = useState({
    id: null,
  });
  console.log('roomList', roomList);
  const getStadiums = async () => {
    const result = await request.getStadiums();
    setStadiumList(result.data);
    setCurrentStadium(result.data[0]);
  };
  const getRoomList = async stadiumId => {
    const result = await request.getRoomsByStadiumId(stadiumId);
    setRoomList(result.data);
  };

  const handleDelete = async () => {
    const result = await request.deleteStadium(currentStadium.id);
    const response = result.data;

    if (response.success) {
      toast.success(response.data.message, {
        autoClose: 2000,
      });
      getStadiums();
    }
  };

  const handleAddRoom = async e => {
    e.preventDefault();
    if (!roomName.length > 0) {
      toast.error('Tên phòng không được bỏ trống', {
        autoClose: 2000,
      });
      return;
    }
    const result = await request.addRoom(roomName, currentStadium.id);
    const response = result.data;

    if (response.success) {
      setRoomName('');
      getRoomList(currentStadium.id);
      toast.success(response.data.message, {
        autoClose: 2000,
      });
    } else {
      toast.error(response.data.message, {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    getStadiums();
  }, []);

  useEffect(() => {
    getRoomList(currentStadium.id);
  }, [currentStadium.id]);
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
                  <li className='breadcrumb-item active'>DANH SÁCH SÂN VẬN ĐỘNG</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <section className='content'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-3 list-group stadium-list'>
                {stadiumList.map(stadium => {
                  return (
                    <Link
                      to='#'
                      key={stadium.id}
                      onClick={() => setCurrentStadium(stadium)}
                      className='list-group-item'
                    >
                      {stadium.name}
                    </Link>
                  );
                })}
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
                          {/* dấu x */}
                          <span aria-hidden='true'>×</span>
                        </button>
                      </div>
                      <div className='modal-body'>XÓA SÂN VẬN ĐỘNG NÀY?</div>
                      <div className='modal-footer'>
                        <button
                          type='button'
                          className='btn btn-secondary'
                          data-dismiss='modal'
                        >
                          CLOSE
                        </button>
                        <Link
                          to='#'
                          id='stadium-delete-confirm'
                          role='button'
                          className='btn btn-danger text-white'
                          onClick={handleDelete}
                          data-dismiss='modal'
                        >
                          DELETE
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <c:foreach var="stadium" items="${stadiums}"> */}
                <div className='info-stadium' id='info-stadium-${stadium.id}'>
                  <div className='row'>
                    <div className='col-sm-4'>
                      <h2>DANH SÁCH KHÁN ĐÀI</h2>
                      <ul className='list-group'>
                        {/* <c:foreach var="room" items="${stadium.rooms}"> */}
                        {roomList.map(room => {
                          return (
                            <li key={room.id} className='list-group-item'>
                              {room.name}
                            </li>
                          );
                        })}
                        {/* </c:foreach> */}
                      </ul>
                      <br />
                      THÊM KHÁN ĐÀI
                      <form
                        action='/admin/rooms'
                        method='post'
                        onSubmit={handleAddRoom}
                      >
                        {/* <input
                          name='stadiumId'
                          defaultValue='${stadium.id}'
                          hidden
                        /> */}
                        <input
                          className='form-control mb-2'
                          placeholder='Tên'
                          type='text'
                          name='name'
                          required
                          value={roomName}
                          onChange={e => setRoomName(e.target.value)}
                        />
                        <button className='btn btn-primary' type='submit'>
                          ADD
                        </button>
                      </form>
                    </div>
                    <div className='col-sm-8'>
                      <div id='detail-stadium-${stadium.id}'>
                        <h2>{currentStadium?.name}</h2>
                        <br />
                        <label>THUỘC THÀNH PHỐ:</label> {currentStadium?.city}
                        <br />
                        <br />
                        <Link
                          to={`/admin/stadiums/${currentStadium?.id}`}
                          role='button'
                          className='btn-update-stadium btn btn-primary mr-2'
                        >
                          UPDATE
                        </Link>
                        <button
                          data-toggle='modal'
                          data-target='#exampleModal'
                          className='btn btn-danger'
                          //   data-stadium-id='${stadium.id}'
                          type='button'
                        >
                          DELETE
                        </button>{' '}
                        {/* data-target="#exampleModal"  */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* </c:foreach> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Stadium;
