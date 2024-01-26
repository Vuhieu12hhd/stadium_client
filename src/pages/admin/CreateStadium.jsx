import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../api/request';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';

function CreateStadium() {
  const navigate = useNavigate();
  const params = useParams();
  const { stadiumId } = params;
  const [cityList, setCityList] = useState([]);
  const [stadiumData, setStadiumData] = useState({
    name: '',
    cityId: 1,
  });
  const getCities = async () => {
    const result = await request.getCities();
    setCityList(result.data);
  };

  const getStadiumInfo = async stadiumId => {
    const resultStadium = await request.getStadiumById(stadiumId);
    const { name, city_id: cityId } = resultStadium.data[0];
    setStadiumData({
      name,
      cityId,
    });
  };

  const handleChange = (name, value) => {
    const newStadiumData = { ...stadiumData };
    newStadiumData[name] = value;
    setStadiumData(newStadiumData);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stadiumData.name.length > 0) {
      toast.error('Tên rạp không được bỏ trống', {
        autoClose: 2000,
      });
      return;
    }
    if (stadiumId) {
      const newStadiumData = { id: stadiumId, ...stadiumData };
      const result = await request.updateStadium(newStadiumData);
      const response = result.data;
      if (response.success) {
        toast.success(response.data.message, {
          autoClose: 2000,
        });
        navigate('/admin/stadiums');
      }
      else {
        toast.error(response.data.message, {
          autoClose: 2000,
        });
      }
      console.log('update', result);
    } else {
      const result = await request.createStadium(stadiumData);
      const response = result.data;
      if (response.success) {
        toast.success(response.data.message, {
          autoClose: 2000,
        });
        navigate('/admin/stadiums');
      } else {
        toast.error(response.data.message, {
          autoClose: 2000,
        });
      }
      console.log('create', result);
    }
  };

  //   useEffect(() => {
  //     getCities();
  //   }, []);

  useEffect(() => {
    getCities();
    if (stadiumId) {
      getStadiumInfo(stadiumId);
    } else {
      setStadiumData({
        name: '',
        cityId: 1,
      });
    }
  }, [stadiumId]);
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
                  <li className='breadcrumb-item active'>THÊM SÂN VẬN ĐỘNG</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className='content'>
          <div className='container-fluid'>
            <div className='container'>
              <form
                action='/admin/stadiums'
                method='post'
                onSubmit={handleSubmit}
              >
                <div className='row' style={{ marginBottom: '15px' }}>
                  <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                    <label>TÊN</label>
                  </div>
                  <div className='col-sm-4' style={{}}>
                    <input
                      type='text'
                      name='name'
                      className='form-control'
                      value={stadiumData.name}
                      onChange={e => handleChange('name', e.target.value)}
                    />
                  </div>
                </div>
                <div className='row' style={{ marginBottom: '15px' }}>
                  <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                    <label>ĐỊA CHỈ</label>
                  </div>
                  <div className='col-sm-4' style={{}}>
                    <select
                      name='cityId'
                      className='form-control'
                      value={stadiumData.cityId}
                      onChange={e => handleChange('cityId', e.target.value)}
                    >
                      {cityList.map(city => {
                        return (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className='row' style={{ marginBottom: '15px' }}>
                  <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                    <label />
                  </div>
                  <div className='col-sm-4' style={{}}>
                    <button type='submit' className='btn btn-primary'>
                      {stadiumId ? 'Cập nhật' : 'Thêm'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CreateStadium;
