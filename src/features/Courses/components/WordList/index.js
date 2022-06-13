import { Col, Row } from 'antd';
import BackToTopButton from 'components/BackToTopButton';
import { useWordNoteOptions } from 'features/Courses/hooks';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import WordCard from '../WordCard';

function WordList(props) {
  const { data, isWordNote, wordnoteId } = props;
  const { wordNotes } = useSelector((state) => state.wordNote);

  const wordNoteOptions = useWordNoteOptions(wordNotes);

  return (
    <>
      <Row justify="start" gutter={[36, 24]}>
        {data.length > 0 &&
          data.map((word, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={12}>
              <WordCard
                word={word}
                wordNoteOptions={wordNoteOptions}
                isWordNote={isWordNote}
                wordnoteId={wordnoteId}
              />
            </Col>
          ))}
      </Row>
      <BackToTopButton />
    </>
  );
}

WordList.propTypes = {
  data: PropTypes.array,
  isWordNote: PropTypes.bool,
  wordnoteId: PropTypes.number,
};
WordList.defaultProps = {
  data: [],
  isWordNote: false,
  wordnoteId: 0,
};
export default WordList;
