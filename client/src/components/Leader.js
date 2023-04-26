
const Leader = (props) => {
  const  {submission, counter} = props

  return  (
  <div key={counter} className='entry'>
    <div>{counter+1}</div>
    <div>{submission.userId.fullname}</div>
    <div>{submission.words}</div>
    <div>{submission.challengeId.level}</div>
    <div>{submission.seconds} sec</div>
    <div>{submission.accuracy}%</div>
  </div>);
  
}

export default Leader;