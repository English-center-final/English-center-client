import { Spin } from 'antd';
import ListExam from 'features/OnlineExam/components/ListExam';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
MainPage.propTypes = {};

function MainPage() {
  const { setExam, isLoading } = useSelector((state) => state.exam);

  useEffect(() => {
    document.title = 'Luyện thi TOEIC';
  }, []);
  return (
    <Spin spinning={isLoading}>
      <div id="list_exam">
      <section id="section-exam">
        <h1 id="text-header">Luyện thi Toeic</h1>
      </section>
      <br />
        <ListExam examList={setExam} />
      </div>
    </Spin>
  );
}

export default MainPage;
