import {FooterButton, LinkButton} from '@/assets/global/Button';
import {Box, RowBox} from '@/assets/global/Container';
import {DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import React from 'react';

export default function AlertModal({
  title = '',
  content = '',
  leftContent = '확인',
  rightContent = '',
  leftPress = () => {},
  rightPress = () => {},
}) {
  return (
    <>
      {title !== '' && <ModalTitleBox title={title} />}

      <Box justifyContent="center" alignItems="center" width="100%" height="84px">
        <DarkText fontSize={Theme.fontSize.fs18} textAlignVertical="center">
          {content}
        </DarkText>
      </Box>
      <RowBox mg="20px 0px 0px" width="100%">
        {rightContent !== '' ? (
          <FooterButton
            buttonWidth="169px"
            width="100%"
            isRelative
            isChange
            leftContent={leftContent}
            rightContent={rightContent}
            rightPress={rightPress}
            leftPress={leftPress}
          />
        ) : (
          <RowBox justifyContent="center" width="100%">
            <LinkButton to={leftPress} content={leftContent} width="250px" />
          </RowBox>
        )}
      </RowBox>
    </>
  );
}
