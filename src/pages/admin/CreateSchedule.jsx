import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../api/request';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';

function CreateSchedule() {
  const params = useParams();
  const navigate=useNavigate();
  const { scheduleId } = params;

  const [stadiumList, setStadiumList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [matchList, setMatchList] = useState([]);
  //   const [matchId,setMatchId]=useState();
  const [scheduleData, setScheduleData] = useState({
    stadiumId: null,
    roomId: null,
    matchId: 1,
    premiere: null,
  });
    console.log('scheduleData', scheduleData);

  const getScheduleById = async scheduleId => {
    const resultSchedule = await request.getScheduleById(scheduleId);
    // console.log('resultSchedule', resultSchedule);
    const { room_id } = resultSchedule.data[0];
    const resultStadium = await request.getStadiumByRoomId(room_id);
    const stadiumId = resultStadium.data[0].stadium_id;
    const {
      room_id: roomId,
      match_id: matchId,
      premiere,
    } = resultSchedule.data[0];
    // const newScheduleData = { ...scheduleData };
    setScheduleData({
      stadiumId,
      roomId,
      matchId,
      premiere: moment(premiere).format('YYYY-MM-DD HH:mm'),
    });
  };

  const getStadiumList = async () => {
    const resultStadiums = await request.getStadiums();
    setStadiumList(resultStadiums.data);
    // const newScheduleData = { ...scheduleData };
    // setScheduleData({
    //   ...newScheduleData,
    //   stadiumId: resultStadiums.data[0].id,
    // });
  };

  const getRoomList = async stadiumId => {
    const resultRooms = await request.getRoomsByStadiumId(stadiumId);
    setRoomList(resultRooms.data);
    const newScheduleData = { ...scheduleData };
    setScheduleData({
      ...newScheduleData,
      roomId: resultRooms.data[0].id,
    });
  };
  const getMatchList = async () => {
    const resultMatchs = await request.getMatchs();
    setMatchList(resultMatchs.data);
    const newScheduleData = { ...scheduleData };
    setScheduleData({
      ...newScheduleData,
      matchId: resultMatchs.data[0].id,
    });
  };
  const handleChange = (name, value) => {
    const newScheduleData = { ...scheduleData };
    newScheduleData[name] = value;
    setScheduleData(newScheduleData);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    console.log('scheduleData', scheduleData);
    if(!scheduleData.stadiumId){
        toast.error('VUI LÒNG CHỌN SÂN VẬN ĐỘNG', {
            autoClose: 2000,
          });
          return;
    }
    if(!scheduleData.roomId){
        toast.error('VUI LÒNG CHỌN KHÁN ĐÀI', {
            autoClose: 2000,
          });
          return;
    }
    if(!scheduleData.matchId){
        toast.error('VUI LÒNG CHỌN TRẬN ĐẤU', {
            autoClose: 2000,
          });
          return;
    }
    if(!scheduleData.premiere){
        toast.error('VUI LÒNG CHỌN THỜI GIAN', {
            autoClose: 2000,
          });
          return;
    }
    if (scheduleId) {
      const newScheduleData = { id: scheduleId, ...scheduleData };
      const result = await request.updateSchedule(newScheduleData);
      const response=result.data
      if(response.success)
      {
        toast.success(response.data.message, {
            autoClose: 2000,
          });
          navigate('/admin/schedules');    
      }
      console.log('update', result);
    } else {
      const result = await request.createSchedule(scheduleData);
      const response=result.data
      if(response.success)
      {
        toast.success(response.data.message, {
            autoClose: 2000,
          });
          navigate('/admin/schedules');    
      }
      console.log('create', result);
      
    }
  };

  useEffect(() => {
    getStadiumList();
    getMatchList();
    
    if (scheduleId) {
      getScheduleById(scheduleId);
    }
    // else{
    //     console.log('scheduleId',scheduleId)
    //     setScheduleData({
    //         stadiumId: null,
    //         roomId: null,
    //         matchId: 1,
    //         premiere: null,
    //       })
    // }
  }, [scheduleId]);

  useEffect(() => {
    if (scheduleData.stadiumId) {
      getRoomList(scheduleData.stadiumId);
      
    }
  }, [scheduleData.stadiumId]);
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
                    THÊM MỚI TRẬN ĐẤU
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className='content'>
          <div className='container-fluid'>
            {/* Content */}
            <div className='form-group'>
              <label htmlFor='select-stadium'>CHỌN SÂN VẬN ĐỘNG:</label>
              <select
                className='form-control col-sm-6'
                id='select-stadium'
                value={scheduleData.stadiumId}
                onChange={e => handleChange('stadiumId', e.target.value)}
              >
                <option  value={null}>
                      CHỌN SÂN VẬN ĐỘNG
                    </option>
                {stadiumList.map(stadium => {
                  return (
                    <option key={stadium.id} value={stadium.id}>
                      {stadium.name} - {stadium.city}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* <c:foreach var="stadium" items="${stadiums}"> */}
            <div
              className='form-group stadium-wrapper'
              id='stadium-wrapper-${stadium.id}'
            >
              <label htmlFor='select-room-${stadium.id}'>CHỌN KHÁN ĐÀI:</label>
              <select
                className='form-control select-room col-sm-6'
                id='select-room-${stadium.id}'
                value={scheduleData.roomId}
                onChange={e => handleChange('roomId', e.target.value)}
              >
                {roomList.map(room => {
                  return (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* </c:foreach> */}
            <form
              action='/admin/schedules/create'
              method='post'
              onSubmit={handleSubmit}
            >
              <div className='form-group'>
                <label htmlFor='select-match'>CHỌN TRẬN ĐẤU:</label>
                <select
                  className='form-control col-sm-6'
                  name='matchId'
                  id='select-match'
                  value={scheduleData.matchId}
                  onChange={e => handleChange('matchId', e.target.value)}
                >
                  {matchList.map(match => {
                    return (
                      <option key={match.id} value={match.id}>
                        {match.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='select-time'>CHỌN THỜI GIAN:</label>
                <input
                  name='time'
                  className='form-control col-sm-6'
                  id='select-time'
                  type='datetime-local'
                  required
                  value={scheduleData.premiere}
                  onChange={e => handleChange('premiere', e.target.value)}
                />
              </div>
              <input hidden name='roomId' id='room-id' />
              <button className='btn btn-primary' type='submit'>
                {scheduleId ?'Cập nhật' : 'Thêm lịch'}
              </button>
            </form>
            {/* End Content */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CreateSchedule;
