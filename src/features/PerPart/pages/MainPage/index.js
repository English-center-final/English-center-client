import { Divider, Typography } from 'antd';
import TestPartList from 'features/PerPart/components/TestPartList';
import { fetchBooks } from 'features/PerPart/perPartSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import './style.scss';

const { Title } = Typography;

MainPage.propTypes = {};

function MainPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const { numberPart } = match.params;
  const { books } = useSelector((state) => state.perPart);

  useEffect(() => {
    document.title = `Đề thi part ${numberPart}`;
  });

  useEffect(() => {
    if (books.length > 0) {
      return;
    }
    dispatch(fetchBooks());
  }, []);

  return (
    <div id="per-part-main-page">
      <div className="main">
        <Title level={3}>Đề Thi Part {numberPart}</Title>
        <Divider></Divider>
        <TestPartList books={books} numberPart={numberPart} />
      </div>
    </div>
  );
}

export default MainPage;
