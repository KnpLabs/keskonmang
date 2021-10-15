import React from 'react'
import { useParams } from 'react-router-dom'
import Container from './container'

export default () => {
  let { id } = useParams();

  return (<Container currentRestaurantId={id} />);
}