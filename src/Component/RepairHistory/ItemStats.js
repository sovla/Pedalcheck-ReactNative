import {Box, RowBox} from '@/assets/global/Container';
import React from 'react';
import {DarkBoldText, DarkMediumText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {LinkWhiteButton} from '@/assets/global/Button';
import {bikeStats} from '@/assets/global/dummy';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';

const ItemStats = ({
  itemList = bikeStats,
  title = '정비 종류별 통계',
  headerList = {
    title: '자전거 카테고리',
    countName: '정비 건수',
    rateName: '비율',
  },
  showCount = 4,
  onPressMore,
  isFull,
  width = 380,
}) => {
  return (
    <Box
      width={`${width}px`}
      pd="20px 16px 20px"
      borderRadius="10px"
      mg={!isFull && '20px 0px 0px'}>
      <RowBox mg="0px 0px 20px">
        <DarkBoldText fontSize={Theme.fontSize.fs15}>{title}</DarkBoldText>
      </RowBox>
      <TableRow
        width={`${width - 32}px`}
        backgroundColor={Theme.color.backgroundBlue}
        itemList={Object.values(headerList)}
      />
      {itemList.map((item, index) => {
        if (index < showCount)
          return (
            <TableRow
              width={`${width - 32}px`}
              key={index}
              backgroundColor={index === 0 && Theme.color.backgroundWhiteBlue}
              itemList={Object.values(item)}
            />
          );
      })}
      {onPressMore && (
        <LinkWhiteButton width="348px" mg="20px 0px 0px" content={'더보기'} to={onPressMore} />
      )}
    </Box>
  );
};

export default ItemStats;

const TableRow = ({backgroundColor, width = '348px', height = '40px', itemList}) => {
  return (
    <RowBox
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      style={borderBottomWhiteGray}>
      {itemList.map((item, index) => (
        <DarkMediumText
          key={item + index}
          backgroundColor="#0000"
          height={height}
          style={{flex: index === 0 ? 1.5 : 1, textAlign: 'center', textAlignVertical: 'center'}}
          fontSize={Theme.fontSize.fs13}>
          {item}
        </DarkMediumText>
      ))}
    </RowBox>
  );
};
