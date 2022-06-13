import {
  FacebookFilled,
  GithubOutlined,
  InstagramFilled,
  TwitterSquareFilled,
} from '@ant-design/icons';
import { Col, Divider, Row } from 'antd';
import logo from 'assets/images/logo.png';
import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';

Footer.propTypes = {};

function Footer() {
  return (
    <div className="footer-dark">
      <Divider />
      <footer>
        <div className="container">
          <Row>
            <Col sm={23} md={8} offset={1}>
              <div className="item text">
                <Row>
                  <Col span={6}>
                    <Link to="/">
                      <div className="footer_left-logo-page">
                        <img src={logo} alt="SMP-English" />
                      </div>
                    </Link>
                  </Col>
                  <Col span={14}>
                    <br />
                    <p>
                      Website thi thử TOEIC online miễn phí có chấm điểm và xem
                      đáp án ngay, kiểm tra trình độ TOEIC chính xác, nhanh
                      chóng !
                    </p>
                  </Col>{' '}
                </Row>
              </div>
            </Col>
            <Col sm={8} md={4}>
              <div className="item">
                <h3>Hỗ trợ</h3>
                <ul>
                  <li>
                    <Link to="/">Hướng dẫn sử dụng</Link>
                  </li>
                  <li>
                    <Link to="/">Cộng đồng</Link>
                  </li>
                  <li>
                    <Link to="/">Báo cáo lạm dụng</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col sm={8} md={4}>
              <div className=" item">
                <h3>Khám phá</h3>
                <ul>
                  <li>
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li>
                    <Link to="/classes">Đăng ký lớp học</Link>
                  </li>
                  <li>
                    <Link to="/courses">Học từ vựng</Link>
                  </li>
                  <li>
                    <Link to="/exams">Thi Online</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col sm={8} md={4}>
              <ul className="footer_right-title">
                <h3>Creators</h3>

                <li className="footer_right-list">
                  <a
                    href="https://github.com/Haosmall"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubOutlined /> Nguyễn Trần Nhật Hào
                  </a>
                </li>
                <li className="footer_right-list">
                  <a
                    href="https://github.com/kage1011"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubOutlined /> Vũ Văn Khải
                  </a>
                </li>
              </ul>
            </Col>

            <Col span={24}>
              <div className="col item social">
                <a href="#">
                  <i className="icon ion-social-facebook">
                    <FacebookFilled />
                  </i>
                </a>
                <a href="#">
                  <i className="icon ion-social-twitter">
                    <TwitterSquareFilled />
                  </i>
                </a>
                <a href="#">
                  <i className="icon ion-social-instagram">
                    <InstagramFilled />
                  </i>
                </a>
              </div>
            </Col>
          </Row>
          <p className="copyright">© IUH - Đại học Công Nghiệp TP.HCM 2022</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
