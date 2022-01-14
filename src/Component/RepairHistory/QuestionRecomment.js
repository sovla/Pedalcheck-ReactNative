import {BorderButton, LinkWhiteButton} from '@/assets/global/Button';
import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import ArrowUpIcon from '@assets/image/list_arr_top.png';
import ArrowDownIcon from '@assets/image/arr_down.png';
import {TouchableOpacity} from 'react-native';
import ReplyIcon from '@assets/image/ic_reply.png';
import {DarkBoldText, DarkMediumText, DarkText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {useSelector} from 'react-redux';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';

export default function QuestionRecomment({
  categoryName = '',
  status = '',
  questionTitle = '',
  writeDate = '',
  content = '',
  adminContent = '',
  adminWriteDate = '',
  isSelect = false,
  onPressItem,
  onPressUpdate,
  onPressSubmit,
}) {
  const size = useSelector(state => state.size);
  const color = status === '답변완료' ? Theme.color.skyBlue : Theme.color.red;

  return (
    <Box>
      <TouchableOpacity onPress={onPressItem}>
        <Box pd="0px 0px 0px 10px" style={borderBottomWhiteGray} width={size.minusPadding}>
          <BetweenBox width="370px" mg="16px 0px">
            <Box>
              {categoryName !== '' && (
                <IndigoText fontSize={Theme.fontSize.fs14}>{categoryName}</IndigoText>
              )}
              <DarkBoldText fontSize={Theme.fontSize.fs15}>{questionTitle}</DarkBoldText>
              <GrayText fontSize={Theme.fontSize.fs12} letterSpacing="0px">
                {' '}
                {writeDate}
              </GrayText>
            </Box>
            <RowBox>
              <BorderButton
                backgroundColor={color}
                borderColor={color}
                color={Theme.color.white}
                width="66px"
                fontSize={Theme.fontSize.fs13}
                height="25px">
                {status}
              </BorderButton>
              <Box mg="0px 0px 0px 10px">
                <DefaultImage
                  source={isSelect ? ArrowUpIcon : ArrowDownIcon}
                  width="24px"
                  height="24px"
                />
              </Box>
            </RowBox>
          </BetweenBox>
        </Box>
      </TouchableOpacity>
      {isSelect && (
        <Box style={borderBottomWhiteGray}>
          <DarkText pd="10px" fontSize={Theme.fontSize.fs15}>
            {content}
          </DarkText>

          {status === '답변완료' && (
            <RowBox
              pd="13px 10px 13px 0px"
              width={size.minusPadding}
              backgroundColor={Theme.color.backgroundBlue}
              borderRadius="10px">
              <RowBox
                width="44px"
                pd="0px 11px 0px 0px"
                justifyContent="flex-end"
                backgroundColor="#0000">
                <DefaultImage source={ReplyIcon} width="24px" height="24px" />
              </RowBox>
              <Box backgroundColor="#0000">
                <BetweenBox width="326px" backgroundColor="#0000" alignItems="center">
                  <RowBox backgroundColor="#0000" alignItems="center">
                    <DarkBoldText fontSize={Theme.fontSize.fs15}>사장님</DarkBoldText>
                    <GrayText mg="0px 0px 0px 5px" fontSize={Theme.fontSize.fs12}>
                      {adminWriteDate}
                    </GrayText>
                  </RowBox>
                  {status === '답변완료' && (
                    <TouchableOpacity onPress={onPressUpdate}>
                      <Box mg="0px 5px">
                        <BorderButton
                          width="38px"
                          height="25px"
                          borderColor={Theme.borderColor.gray}
                          color={Theme.color.black}>
                          <DarkMediumText fontSize={Theme.fontSize.fs13}>수정</DarkMediumText>
                        </BorderButton>
                      </Box>
                    </TouchableOpacity>
                  )}
                </BetweenBox>
                <DarkText mg="8px 0px 0px" numberOfLines={3} width="325px">
                  {adminContent}
                </DarkText>
              </Box>
            </RowBox>
          )}
          {status === '미답변' && (
            <RowBox>
              <LinkWhiteButton
                to={onPressSubmit}
                mg="15px 0px"
                content="답변등록"
                width="380px"
                height="35px"
                fontSize={Theme.fontSize.fs13}
                borderRadius="3px"
              />
            </RowBox>
          )}
        </Box>
      )}
    </Box>
  );
}
