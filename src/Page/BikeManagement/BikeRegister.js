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

  console.log(bike, 'bike :::::');

  const [image, setImage] = useState();
  return <BikeRegisterContainer bike={bike} setBike={setBike} image={image} setImage={setImage} />;
}
