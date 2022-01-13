import {Box} from '@/assets/global/Container';
import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {modalOpen} from '@/Store/modalState';
import {useNavigation} from '@react-navigation/native';
import QuestionRecomment from '@/Component/RepairHistory/QuestionRecomment';

export default function RepairHistorySelectQuestion() {
  const [questionSelect, setQuestionSelect] = useState([]);
  const [selectComment, setSelectComment] = useState([]);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const onPressRecomment = index => {
    if (selectComment.find(findIndex => findIndex === index)) {
      setSelectComment(prev => prev.filter(filterItem => filterItem !== index));
    } else {
      setSelectComment(prev => [...prev, index]);
    }
  };
  const onPressItem = title => {
    if (questionSelect.find(findItem => findItem === title)) {
      setQuestionSelect(prev => prev.filter(filterItem => filterItem !== title));
    } else {
      setQuestionSelect(prev => [...prev, title]);
    }
  };

  const onPressProduct = () => {
    navigation.navigate('Detail');
  };
  return (
    <Box pd="0px 16px">
      {commentList.map((item, index) => (
        <QuestionRecomment
          key={index}
          onPressUpdate={() => dispatch(modalOpen('questionUpdate'))}
          onPressSubmit={() => dispatch(modalOpen('questionSubmit'))}
          onPressItem={() => {
            onPressRecomment(index);
          }}
          isSelect={selectComment.find(findItem => findItem === index) ? true : false}
          status={index % 2 === 0 ? '미답변' : '답변완료'}
        />
      ))}
    </Box>
  );
}

const commentList = [0, 1, 2, 3, 4];
