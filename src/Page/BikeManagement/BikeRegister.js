import React from 'react';

import {useState} from 'react';
import BikeRegisterContainer from '@/Component/BikeManagement/BikeRegisterContainer';
import {useEffect} from 'react';

export default function BikeRegister({route}) {
  const [bike, setBike] = useState({
    idx: '',
    bikeName: '',
    bikeModel: '',
    vehicleNumber: '',
    vehicleYear: '',
    type: '',
    modelDetail: '',
    size: '',
    color: '',
    wheelSize: '',
    drivetrain: '',
    motorManufacturer: '',
    power: '',
  });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (route?.params?.bike) {
      const data = route.params.bike;
      setBike({
        mbt_idx: data.idx,
        bikeName: data?.mbt_nick,
        bikeModel: data.mbt_brand + '\t\t' + data.mbt_model,
        vehicleNumber: data.mbt_serial,
        vehicleYear: data.mbt_year,
        size: data.mbt_size,
        color: data.mbt_color,
        wheelSize: data.mbt_wheel,
        drivetrain: data.mbt_drive,
        motorManufacturer: data.mbt_motor,
        power: data.mbt_power,
        type: data.mbt_type,
        modelDetail: data.mbt_model_detail,
      });
      setImage(data?.mbt_image);
      setIsUpdate(true);
    }
  }, []);

  const [image, setImage] = useState();
  return <BikeRegisterContainer isUpdate={isUpdate} bike={bike} setBike={setBike} image={image} setImage={setImage} />;
}
