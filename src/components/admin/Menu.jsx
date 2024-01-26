import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Menu() {
  const { currentUser } = useSelector(state => state.auth);
  return (
    <aside className='main-sidebar elevation-4'>
      {/* Brand Logo */}
      <Link to='#' className='brand-link'>
        <img
          src='/static/dist/img/AdminLTELogo.png'
          alt='AdminLTE Logo'
          className='brand-image img-circle elevation-3'
          style={{ opacity: '.8' }}
        />
        <span className='brand-text font-weight-light'>K+ SPORT</span>
      </Link>
      {/* Sidebar */}
      <div className='sidebar'>
        {/* Sidebar user panel (optional) */}
        <div className='user-panel mt-3 pb-3 mb-3 d-flex'>
          <div className='image'>
            <img
              src={
                currentUser?.avatar
                  ? currentUser?.avatar
                  : '/static/images/avatar.png'
              }
              className='img-circle elevation-2'
              alt='User'
              style={{ opacity: '.8', width: '40px', height: '40px' }}
            />
          </div>
          <div className='info'>
            {' '}
            {/* in ra chu admin theo remote user */}
            <Link to='#' className='d-block'>
              {currentUser?.fullName}
            </Link>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className='mt-2'>
          <ul
            className='nav nav-pills nav-sidebar flex-column'
            data-widget='treeview'
            role='menu'
            data-accordion='false'
          >
            {/* Add icons to the links using the .nav-icon class
                 with font-awesome or any other icon font library */}
            <li className='nav-item has-treeview' id='menu-match'>
              <Link to='#' className='nav-link active'>
                
                <p>
                  QUẢN LÝ TRẬN ĐẤU
                </p>
              </Link>{' '}
              {/* trong 1 <li> co a va ul */}
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link to='/admin/matchs' className='nav-link '>
                    
                    <p>DANH SÁCH TRẬN ĐẤU</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin/matchs/create' className='nav-link'>
                    
                    <p>THÊM MỚI TRẬN ĐẤU</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className='nav-item has-treeview' id='menu-stadium'>
              <Link to='#' className='nav-link active'>
                
                <p>
                  QUẢN LÝ SÂN VẬN ĐỘNG
                  
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link to='/admin/stadiums' className='nav-link'>
                    
                    <p>DANH SÁCH SÂN VẬN ĐỘNG</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin/stadiums/create' className='nav-link'>
                    
                    <p>THÊM MỚI SÂN VẬN ĐỘNG</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className='nav-item has-treeview' id='menu-schedule'>
              <Link to='#' className='nav-link active'>
                
                <p>
                  QUẢN LÝ LỊCH ĐẤU
                  
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link to='/admin/schedules' className='nav-link'>
                    
                    <p>DANH SÁCH LỊCH ĐẤU</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin/schedules/create' className='nav-link'>
                    
                    <p>THÊM MỚI LỊCH ĐẤU</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className='nav-item has-treeview' id='menu-report'>
              <Link to='#' className='nav-link active'>
                
                <p>
                  BÁO CÁO CHI TIẾT
                  
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link to='/admin/reports' className='nav-link'>
                    
                    <p>BÁO CÁO DOANH THU</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className='nav-item has-treeview' id='menu-employee'>
              <Link to='#' className='nav-link active'>
                
                <p>
                  QUẢN LÝ NHÂN VIÊN
                  
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link to='/admin/employees' className='nav-link'>
                    
                    <p>DANH SÁCH NHÂN VIÊN</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin/employees/create' className='nav-link'>
                    
                    <p>THÊM MỚI NHÂN VIÊN</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className='nav-item has-treeview' id='menu-match'>
              <Link to='#' className='nav-link active'>
                
                <p>
                  QUẢN LÝ TIN TỨC
                  
                </p>
              </Link>{' '}
              {/* trong 1 <li> co a va ul */}
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link to='/admin/news' className='nav-link '>
                    
                    <p>DANH SÁCH TIN TỨC</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin/news/create' className='nav-link'>
                    
                    <p>THÊM MỚI TIN TỨC</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className='nav-item has-treeview' id='menu-match'>
              <Link to='#' className='nav-link active'>
                
                <p>
                  QUẢN LÝ SẢN PHẨM LƯU NIỆM
                  
                </p>
              </Link>{' '}
              {/* trong 1 <li> co a va ul */}
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link to='/admin/products' className='nav-link '>
                    
                    <p>DANH SÁCH SẢN PHẨM LƯU NIỆM</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin/products/create' className='nav-link'>
                    
                    <p>THÊM MỚI SẢN PHẨN LƯU NIỆM</p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}

export default Menu;
