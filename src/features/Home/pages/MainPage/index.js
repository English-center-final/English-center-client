import {
  AppstoreOutlined,
  CarryOutOutlined,
  FileSearchOutlined,
  FormOutlined,
  PlayCircleOutlined,
  ReadOutlined,
  StarOutlined,
} from '@ant-design/icons';
import AboutImage from 'assets/image/about-main-page.svg';
import PhucBuoi from 'assets/image/buoi_1.jpg';
import TuanBuoi from 'assets/image/buoi_2.jpg';
import PhuocBuoi from 'assets/image/buoi_3.jpg';
import BackToTopButton from 'components/BackToTopButton';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
MainPage.propTypes = {};

function MainPage() {
  useEffect(() => {
    document.title = 'Trang chủ';
  }, []);
  return (
    <>
      <div id="home-main-page" className="home-main-page">
        <div className="home_page-content">
          <h1>Học tiếng anh mọi lúc mọi nơi !</h1>
          <p>
            Website được thiết kế để giúp bạn học tập, rèn luyện và chuẩn bị cho
            bài thi TOEIC chính thức, hoặc đơn giản là để cải thiện kỹ năng
            tiếng Anh của bạn, giúp theo dõi hiệu suất của bạn nhằm giúp bạn
            biết điểm mạnh, điểm yếu của mình và những gì bạn cần tập trung hơn
            để có kết quả tốt nhất.
            {/* Website cung cấp những kiến thức cần thiết về ngữ pháp, topic từ
            vựng theo chủ đề. Ngoài ra bạn còn có thể thi online và học từ vựng
            qua video. */}
          </p>
          <Link to="/exams">
            <button>Khám phá ngay !</button>
          </Link>
        </div>

        <div className="box-container">
          <div className="box">
            <div className="box-icon">
              <ReadOutlined />
            </div>
            <h3>Đăng ký lớp học</h3>
            <p>
              Với mỗi khóa học, Anh ngữ Sunrise sẽ tặng bạn một tài khoản học
              online hoàn toàn MIỄN PHÍ
            </p>
          </div>

          <div className="box">
            <div className="box-icon">
              <PlayCircleOutlined />
            </div>
            <h3>Luyện thi</h3>
            <p>
              {/* Luyện nghe từ vựng và các câu qua các được hỗ trợ video trên
              website  */}
              Luyện tập các bài thi TOEIC mới nhất được hỗ trợ trên website
            </p>
          </div>

          <div className="box">
            <div className="box-icon">
              <AppstoreOutlined />
            </div>
            <h3>Từ vựng</h3>
            <p>Học từ vựng qua các chủ đề phổ biến có kèm hình ảnh minh họa</p>
          </div>
        </div>
      </div>

      <div className="about-section" id="about-section">
        <h1 className="heading">Về chúng tôi</h1>
        <h3 className="title">
          Bắt đầu chuyến hành trình của bạn với chúng tôi
        </h3>

        <div className="row">
          <div className="content-about-section">
            <h3>
              Hãy nâng cao trình độ tiếng anh của bạn qua các bài học trên
              website của chúng tôi{' '}
            </h3>
            <p>
              Các bài học trên website đều là miễn phí, bên cạnh đó còn có các
              gói từ vựng được chia theo topic giúp bạn dễ dàng tiếp cận những
              chủ đề yêu thích làm cho việc học tiếng anh của bạn trở nên dễ
              dàng{' '}
            </p>

            <p>
              Ở Anh ngữ Sunrise các bạn sẽ được thực hành cùng đội ngũ sứ giả
              tài năng. Các sứ giả không đơn thuần là một người giảng dạy,
              truyền đạt kiến thức mà còn là người truyền cảm hứng, giúp bạn
              khám phá Tiếng Anh bằng chính niềm đam mê của mình.
            </p>

            <Link to="/courses">
              <button>Tìm hiểu</button>
            </Link>
          </div>
          <div className="image-about">
            <img src={AboutImage} alt="" />
          </div>
        </div>
      </div>

      <div id="section-course" className="section-course">
        <h1 className="heading">Tính năng</h1>
        <h3 className="title">
          Nâng cấp trình độ của bạn qua những tính năng của chúng tôi
        </h3>
        <div className="box-course-container">
          <div className="box-course">
            <div className="box-course-icon">
              <AppstoreOutlined />
            </div>
            <h3>Đăng ký lớp học</h3>
            <p>Học các từ vựng thông dụng và chuyên sâu theo chủ đề</p>
          </div>

          {/* <div className="box-course">
            <div className="box-course-icon">
              <PlayCircleOutlined />
            </div>
            <h3>Video</h3>
            <p>Luyện nghe tiếng anh qua các chủ đề</p>
          </div> */}

          <div className="box-course">
            <div className="box-course-icon">
              <FormOutlined />
            </div>
            <h3>Wordnote</h3>
            <p>Ghi chú các từ vựng online, ôn tập qua các trò chơi.</p>
          </div>

          {/* <div className="box-course">
            <div className="box-course-icon">
              <ReadOutlined />
            </div>
            <h3>Từ vựng</h3>
            <p>Học ngữ pháp và các mẹo thi qua các bài giảng.</p>
          </div> */}

          <div className="box-course">
            <div className="box-course-icon">
              <CarryOutOutlined />
            </div>
            <h3>Thi Online</h3>
            <p>Thi trực tuyến có lời giải và đáp án.</p>
          </div>

          {/* <div className="box-course">
            <div className="box-course-icon">
              <FileSearchOutlined />
            </div>
            <h3>Tra từ</h3>
            <p>Tra từ vựng trực tiếp trên website.</p>
          </div> */}
        </div>
      </div>

      <div className="review-section" id="review-section">
        <h1 className="heading">Đánh giá của người dùng</h1>
        <h3 className="title">Người dùng nói gì về chúng tôi ? </h3>

        <div className="review-container">
          <div className="review-box">
            <img src={PhucBuoi} alt="" />
            <h3>Bùi Hoàng Phúc</h3>
            <p>
              {`"Chưa bao giờ viết feedback cho app nào mà nửa đêm phải mò vào đây
              để đánh giá. App quá xịn sò luôn. Rất hữu ích cho việc ôn thi
              toeic của mình !."`}
            </p>
            <div className="starts">
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
            </div>
          </div>

          <div className="review-box">
            <img src={TuanBuoi} alt="" />
            <h3>Nguyễn Tuấn Anh</h3>
            <p>
              {`"Trước giờ mình rất ít viết đánh giá, nhưng Website này rất hữu
              ích cho ai muốn tự ôn TOEIC. Thật sự rất tuyệt vời cho 1 app free
              mà lại hay đến thế, giao diện đơn giản dễ nhìn 🎈🎈".`}
            </p>
            <div className="starts">
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
            </div>
          </div>

          <div className="review-box">
            <img src={PhuocBuoi} alt="" />
            <h3>Trương Đình Phước</h3>
            <p>
              {`"Mình rất thích phần mềm, nó giúp mình học tốt hơn. Cảm ơn người
              đã tạo ra nó rất nhiều"`}
            </p>{' '}
            <div className="starts">
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
            </div>
          </div>
        </div>
      </div>

      <BackToTopButton />
    </>
  );
}

export default MainPage;
