import React, { useEffect, useState } from 'react';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import request from '../../api/request';
import moment from 'moment';
import FileBase64 from 'react-file-base64';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateMatch() {
  const params = useParams();
  const navigate = useNavigate();
  const { matchId } = params;
  const [categoryList, setCategoryList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [formatList, setFormatList] = useState([]);
  const [countryList, setCountryList] = useState([]);

  const getCategoryList = async () => {
    const resultCategories = await request.getCategories();
    const resultLanguages = await request.getLanguages();
    const resultFormats = await request.getFormats();
    const resultCountries = await request.getCountries();
    setCategoryList(resultCategories.data);
    setLanguageList(resultLanguages.data);
    setFormatList(resultFormats.data);
    setCountryList(resultCountries.data);
  };

  const [matchData, setMatchData] = useState({
    name: '',
    director: '',
    categoryId: 1,
    timeRelease: null,
    time: 0,
    languageId: 1,
    countryId: 1,
    formatId: 1,
    ageLimit: 0,
    image: null,
    description: '',
    primaryThumbnail: '',
  });
  console.log('matchData', matchData);

  const getMatchInfo = async matchId => {
    const resultMatch = await request.getMatchById(matchId);
    const resultCategory = await request.getCategoriesByMatchId(matchId);
    const {
      name,
      director,
      timeRelease,
      time,
      language_id,
      country_id,
      format_id,
      ageLimit,
      image,
      description,
      primaryThumbnail,
    } = resultMatch.data[0];
    const { id: category_id } = resultCategory.data[0];
    setMatchData({
      name,
      director,
      timeRelease: moment(timeRelease).format('YYYY-MM-DD'),
      time,
      languageId: language_id,
      countryId: country_id,
      formatId: format_id,
      categoryId: category_id,
      ageLimit,
      image,
      description,
      primaryThumbnail,
    });
  };

  const handleChange = (name, value) => {
    const newMatchData = { ...matchData };
    newMatchData[name] = value;
    setMatchData(newMatchData);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (matchId) {
      const newMatchData = { id: matchId, ...matchData };
      const result = await request.updateMatch(newMatchData);
      const response = result.data;
      if (response.success) {
        toast.success(response.data.message, {
          autoClose: 2000,
        });
        navigate('/admin/matchs');
      }
    } else {
      const result = await request.createMatch(matchData);
      const response = result.data;
      if (response.success) {
        toast.success(response.data.message, {
          autoClose: 2000,
        });
        navigate('/admin/matchs');
      }
    }
  };

  useEffect(() => {
    getCategoryList();
    if (matchId) {
      getMatchInfo(matchId);
    } else {
      setMatchData({
        name: '',
        director: '',
        categoryId: 1,
        timeRelease: null,
        time: 0,
        languageId: 1,
        countryId: 1,
        formatId: 1,
        ageLimit: 0,
        image: null,
        description: '',
      });
    }
  }, [matchId]);
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
                  <li className='breadcrumb-item active'>THÊM TRẬN ĐẤU</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className='content'>
          <div className='container'>
            <form
              action='/matchs'
              method='post'
              encType='multipart/form-data'
              onSubmit={handleSubmit}
            >
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>TÊN TRẬN ĐẤU</labe>
                </div>
                <div className='col-sm-4'>
                  <input
                    type='text'
                    className='form-control'
                    name='name'
                    required
                    value={matchData.name}
                    onChange={e => handleChange('name', e.target.value)}
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>KHUÔN KHỔ</labe>
                </div>
                <div className='col-sm-4'>
                  <input
                    type='text'
                    className='form-control'
                    name='director'
                    required
                    value={matchData.director}
                    onChange={e => handleChange('director', e.target.value)}
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>THỂ LOẠI</labe>
                </div>
                <div className='col-sm-4'>
                  <select
                    name='categoryId'
                    className='form-control'
                    value={matchData.categoryId}
                    onChange={e => handleChange('categoryId', e.target.value)}
                  >
                    {categoryList.map(category => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>NGÀY TRANH ĐẤU</labe>
                </div>
                <div className='col-sm-4'>
                  <input
                    type='date'
                    className='form-control'
                    name='timeRelease'
                    required
                    value={matchData.timeRelease}
                    onChange={e => handleChange('timeRelease', e.target.value)}
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>THỜI GIAN</labe>
                </div>
                <div className='col-sm-4'>
                  <input
                    type='number'
                    className='form-control'
                    name='time'
                    required
                    value={matchData.time}
                    onChange={e => handleChange('time', e.target.value)}
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>ĐỘ TUỔI</labe>
                </div>
                <div className='col-sm-4'>
                  <input
                    type='number'
                    className='form-control'
                    name='ageLimit'
                    required
                    value={matchData.ageLimit}
                    onChange={e => handleChange('ageLimit', e.target.value)}
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>HÌNH ẢNH</labe>
                </div>
                <div className='col-sm-4'>
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) => {
                      setMatchData({ ...matchData, image: base64 });
                    }}
                  />
                  {/* <input
                    type='file'
                    className='form-control-file'
                    name='image'
                    // value={matchData.image}
                    onChange={e => handleChange('image', e.target.files[0])}
                  /> */}
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>VIDEO GIỚI THIỆU</labe>
                </div>
                <div className='col-sm-4'>
                  <input
                    type='text'
                    className='form-control'
                    name='primaryThumbnail'
                    required
                    value={matchData.primaryThumbnail}
                    onChange={e =>
                      handleChange('primaryThumbnail', e.target.value)
                    }
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>LỊCH SỬ ĐỐI ĐẦU</labe>
                </div>
                <div className='col-sm-4'>
                  <textarea
                    name='description'
                    cols={30}
                    rows={5}
                    className='form-control'
                    value={matchData.description}
                    onChange={e => handleChange('description', e.target.value)}
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe />
                </div>
                <div className='col-sm-4'>
                  <button type='submit' className='btn btn-primary'>
                    {matchId ? 'Cập nhật' : 'Thêm'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CreateMatch;
