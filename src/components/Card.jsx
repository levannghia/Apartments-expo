import { View} from 'react-native'
import React from 'react'
import ImageCarousel from './ImageCarousel';
import CardInformation from './CardInformation';

const Card = ({property, style}) => {

  return (
    <View style={style}>
      <ImageCarousel images={property.images}/>
      <CardInformation property={property}/>
    </View>
  )
}

export default Card
