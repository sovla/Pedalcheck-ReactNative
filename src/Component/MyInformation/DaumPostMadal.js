import {Box, Container} from '@/assets/global/Container';
import React from 'react';

const DaumPostMadal = ({}) => {
  return (
    <Container>
      <Box
        width="100%"
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        padding={20}
        paddingRight={10}>
        {/* <TouchableOpacity onPress={() => setModal(data => !data)}>
          <AutoHeightImage source={require('../../images/close.png')} width={15} />
        </TouchableOpacity> */}
      </Box>
      <Postcode
        style={{flex: 1}}
        jsOptions={{animation: true, hideMapBtn: true}}
        onSelected={address => {
          setPayment_info(data => {
            return {
              ...data,
              address: address.address, //선택주소
              pp_zip: address.zonecode, //우편번호
              pp_zibun: address.jibunAddress === '' ? address.address : address.jibunAddress, //지번
              pp_doro: address.roadAddress === '' ? address.address : address.roadAddress, //도로명
            };
          });
          setModal(false);
        }}
      />
    </Container>
  );
};

export default DaumPostMadal;
