import cloud from './images/clear-cloud.svg'
import cloudly_day from './images/mostly-cloudy.svg'
import sunny from './images/sunny.svg'
import rain from './images/rain.svg'
import { ReactElement } from 'react';

interface Props {
  condition: string;
  description: string;
}

function getImageWeather({ condition, description }: Props): ReactElement {
  switch (condition) {
    case 'clear_day':
      return <img src={sunny} alt={description} />
    case 'cloud':
      return <img src={cloud} alt={description} />
    case 'cloudly_day':
      return <img src={cloudly_day} alt={description} />
    case 'rain':
      return <img src={rain} alt={description} />
    default:
      return <p>erro</p>
  }
}

export default getImageWeather;