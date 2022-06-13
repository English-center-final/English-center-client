import { Divider, Pagination, Row } from 'antd';
import CourseList from 'features/Courses/components/CourseList';
import CourseSearch from 'features/Courses/components/CourseSearch';
import { fetchCourses, fetchTopics } from 'features/Courses/courseSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import '../../style.scss';

function MainPage() {
  // const history = useHistory();

  const [query, setQuery] = useState({
    name: '',
    topicSlug: '',
    page: 0,
    size: 12,
  });

  const dispatch = useDispatch();
  const { courses, topics } = useSelector((state) => state.course);

  const { data = [], page = 1, size = 1, totalPages = 1 } = courses;

  const handleSearchChange = (queryValue) => {
    const { name, topicSlug } = queryValue;
    setQuery({ page: 0, size: 12, name, topicSlug });
  };

  const handlePageChange = (page) => {
    setQuery({ ...query, page: page - 1 });
  };

  useEffect(() => {
    document.title = 'Khóa học từ vựng';
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCourses(query));
    dispatch(fetchTopics());
  }, [query]);

  return (
    // <div className='course-wrapper'>

    <div id="course-page">
      <section id="SECTION_1">
        <div id="wrap-svg">
          <svg id="svg">
            <g id="g_5">
              <path id="path_6"></path>
            </g>
          </svg>
        </div>
        <div id="wrap-header">
          <h1 id="text-title">Từ Vựng</h1>
        </div>
      </section>
      <br />
      <div id="course-main-page">
        <Row justify="start" gutter={[8, 8]}>
          <CourseSearch topics={topics} onChange={handleSearchChange} />
        </Row>

        <Divider />

        <CourseList courses={data} />

        {totalPages > 1 && (
          <Row justify="center">
            <Pagination
              total={totalPages * size}
              showQuickJumper
              pageSize={size}
              onChange={handlePageChange}
              showSizeChanger={false}
              current={page + 1}
            />
          </Row>
        )}
        <br />
      </div>
    </div>
  );
}

MainPage.propTypes = {};
MainPage.defaultProps = {};

export default MainPage;
