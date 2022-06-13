import { Pagination, Row, Space } from 'antd';
import { fetchBranches } from 'app/globalSlice';
import { fetchClasses } from 'features/Classes/classesSlice';
import ClassesSearch from 'features/Classes/components/ClassesSearch';
import ClassesTable from 'features/Classes/components/ClassesTable';
import { fetchLevels } from 'features/Levels/levelSlice';
import { fetchClassOfUser } from 'features/Me/meSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commonFuc from 'utils/commonFuc';
import './style.scss';

function MainPage() {
  const dispatch = useDispatch();

  const { listLevels } = useSelector((state) => state.level);
  const { branches } = useSelector((state) => state.global);
  const { classesPage } = useSelector((state) => state.classes);
  const { data, page, totalPages } = classesPage;

  const [query, setQuery] = useState({
    levelSlug: '',
    branchId: null,
    status: '',
    dateFrom: '',
    dateTo: '',
    page: 0,
    size: 10,
  });

  const handleSearchChange = (queryValue) => {
    const { levelSlug, branchId, status, dateFrom, dateTo } = queryValue;

    setQuery({
      levelSlug,
      branchId,
      status,
      dateFrom,
      dateTo,
      page: 0,
      size: 10,
    });
  };

  const handlePageChange = (page) => {
    setQuery({ ...query, page: page - 1 });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Lịch khai giảng';
    dispatch(fetchLevels());
    dispatch(fetchBranches());
  }, []);

  useEffect(() => {
    dispatch(fetchClasses(query));
    dispatch(fetchClassOfUser());
  }, [query]);

  return (
    <div id="class-main-page">
      <section id="SECTION">
        <h1 id="text-header">Lịch khai giảng</h1>
      </section>
      <br />
      <div id="course-main-page">
        <div></div>
        <Row justify="space-between" gutter={[8, 8]}>
          <ClassesSearch
            levels={listLevels}
            branches={commonFuc.groupBranch(branches)}
            onChange={handleSearchChange}
          />
        </Row>
        <br />
        <Space direction="vertical" style={{ width: '100%' }}>
          <div className="class-main-page__table">
            <ClassesTable
              classes={commonFuc.addSTTForList(data, query.page * query.size)}
              query={query}
            />
          </div>
          <div style={{ textAlign: 'right', marginBlock: '16px' }}>
            <Pagination
              current={page + 1 || 1}
              total={totalPages * 10 || 0}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </Space>
      </div>
    </div>
  );
}
MainPage.propTypes = {};
MainPage.defaultProps = {};

export default MainPage;
