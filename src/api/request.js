import axiosClient from '.';

const request = {
  getMatchs() {
    return axiosClient.get('/matchs');
  },

  getCategoriesByMatchId(matchId) {
    return axiosClient.get(`/matchs/${matchId}/categories`);
  },
  getCategories() {
    return axiosClient.get('/matchs/categories');
  },
  getLanguages() {
    return axiosClient.get('/matchs/languages');
  },
  getFormats() {
    return axiosClient.get('/matchs/formats');
  },
  getCountries() {
    return axiosClient.get('/matchs/countries');
  },
  createMatch(match) {
    return axiosClient.post('/matchs', match);
  },
  updateMatch(match) {
    return axiosClient.put('/matchs', match);
  },
  deleteMatch(matchId) {
    return axiosClient.delete('/matchs', {
      data: {
        id: matchId,
      },
    });
  },
  getMatchById(matchId) {
    return axiosClient.get(`/matchs/${matchId}`);
  },
  getStadiums() {
    return axiosClient.get(`/stadiums`);
  },
  getStadiumById(stadiumId) {
    return axiosClient.get(`/stadiums/${stadiumId}`);
  },
  getStadiumByCityId(cityId) {
    return axiosClient.get(`/stadiums/stadiumByCityId/${cityId}`);
  },
  getCities() {
    return axiosClient.get(`/stadiums/cities`);
  },
  createStadium(stadium) {
    return axiosClient.post('/stadiums', stadium);
  },
  updateStadium(stadium) {
    return axiosClient.put('/stadiums', stadium);
  },
  deleteStadium(stadiumId) {
    return axiosClient.delete('/stadiums', {
      data: {
        id: stadiumId,
      },
    });
  },
  getRoomsByStadiumId(stadiumId) {
    return axiosClient.get(`/stadiums/${stadiumId}/rooms`);
  },
  addRoom(roomName, stadiumId) {
    return axiosClient.post('/stadiums/rooms', {
      roomName,
      stadiumId,
    });
  },
  getStadiumByRoomId(roomId) {
    return axiosClient.get(`/stadiums/rooms/${roomId}`);
  },
  getEmpList() {
    return axiosClient.get('/employees');
  },
  createEmp(emp) {
    return axiosClient.post('/employees', emp);
  },
  getEmpById(empId) {
    return axiosClient.get(`/employees/${empId}`);
  },
  updateEmp(emp) {
    return axiosClient.put('/employees', emp);
  },
  deleteEmp(empId) {
    return axiosClient.delete('/employees', {
      data: {
        id: empId,
      },
    });
  },
  getSchedules() {
    return axiosClient.get('/schedules');
  },
  getSchedulesByStadium(data) {
    return axiosClient.get('/schedules', {
      params: {
        stadiumId: data.stadiumId,
        day: data.day,
        matchId: data.matchId,
      },
    });
  },
  getScheduleById(scheduleId) {
    return axiosClient.get(`/schedules/${scheduleId}`);
  },
  createSchedule(schedule) {
    return axiosClient.post('/schedules', schedule);
  },
  updateSchedule(schedule) {
    return axiosClient.put('/schedules', schedule);
  },
  deleteSchedule(scheduleId) {
    return axiosClient.delete('/schedules', {
      data: {
        id: scheduleId,
      },
    });
  },
  getChairsByScheduleId(scheduleId) {
    return axiosClient.get(`/schedules/chairsByScheduleId/${scheduleId}`);
  },
  getTimeTypeSchedule(scheduleId) {
    return axiosClient.get(`/schedules/timeTypeSchedule/${scheduleId}`);
  },
  getAllChairs() {
    return axiosClient.get(`/schedules/allChairs`);
  },
  bookingChairs(data) {
    return axiosClient.post(`/schedules/bookingChairs`, data);
  },
  getAmount({ date_type, time_type, format_id }) {
    return axiosClient.get(`/schedules/amount`, {
      params: { date_type, time_type, format_id },
    });
  },
  getReport(fromDate, toDate, matchId) {
    return axiosClient.get(`/schedules/report`, {
      params: { fromDate, toDate, matchId },
    });
  },
  getTicketByCode(code) {
    return axiosClient.get(`/schedules/ticketByCode`, {
      params: { code },
    });
  },
  receiveTicket(code) {
    return axiosClient.post(`/schedules/receiveTicket`, {
      code,
    });
  },
  login(user) {
    return axiosClient.post('/auth/login', user);
  },

  register(user) {
    return axiosClient.post('/auth/register', user);
  },
  getMyInfo() {
    return axiosClient.get('/auth/information');
  },
  confirmPassword(data) {
    return axiosClient.post('/auth/confirmPassword', data);
  },
  updateMyInfo(user) {
    return axiosClient.put('/auth/information', user);
  },
  getMyTickets() {
    return axiosClient.get('/auth/myTickets');
  },
  getProducts() {
    return axiosClient.get('/products');
  },
  createProduct(product) {
    return axiosClient.post('/products', product);
  },
  getProductById(productId) {
    return axiosClient.get(`/products/${productId}`);
  },
  updateProduct(product) {
    return axiosClient.put('/products', product);
  },
  deleteProduct(productId) {
    return axiosClient.delete('/products', {
      data: {
        id: productId,
      },
    });
  },
  getNews() {
    return axiosClient.get('/news');
  },
  createNews(news) {
    return axiosClient.post('/news', news);
  },
  getNewsById(newsId) {
    return axiosClient.get(`/news/${newsId}`);
  },
  updateNews(news) {
    return axiosClient.put('/news', news);
  },
  deleteNews(newsId) {
    return axiosClient.delete('/news', {
      data: {
        id: newsId,
      },
    });
  },
};
export default request;
