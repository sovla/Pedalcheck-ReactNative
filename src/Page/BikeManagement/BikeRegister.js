import React from 'react';

import {useState} from 'react';
import BikeRegisterContainer from '@/Component/BikeManagement/BikeRegisterContainer';

export default function BikeRegister() {
  const [bike, setBike] = useState({
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
  const [image, setImage] = useState();
  console.log(bike, 'bike');
  console.log(image?.path, 'image');
  return <BikeRegisterContainer bike={bike} setBike={setBike} image={image} setImage={setImage} />;
}
