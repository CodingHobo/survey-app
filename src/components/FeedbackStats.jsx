import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackStats() {
  const {feedback} = useContext(FeedbackContext)

  //Calculate average ratings
  let averageRatings = feedback.reduce((acc, curr) => {
    return acc + curr.rating
  }, 0) / feedback.length

  averageRatings = averageRatings.toFixed(1).replace(/[.,]0$/, '')

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(averageRatings) ? 0 : averageRatings}</h4>
    </div>
  )
}

export default FeedbackStats