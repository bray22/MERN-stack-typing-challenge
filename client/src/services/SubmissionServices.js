import axios from "axios";

const SubmissionServices = {
  getSubmissions: async () => {
    const response = await axios.get('/submissions')
   .catch(function (error) {
     return error;
   });
    return response.data;
  },

  getRandomChallenge: async (level) => {
    const response = await axios.get(`/challenges/random/${level}`)
   .catch(function (error) {
     return error;
   });
    return response.data;
  },

  postSubmission: async (params) => {
    const { accuracy, challengeId, seconds, userId, words } = params;
    axios.post('/addSubmission', {
      accuracy: accuracy, 
      challengeId: challengeId, 
      seconds: seconds, 
      userId: userId, 
      words: words
   })
   .catch(function (error) {
     return error;
   });
  }
};

export default SubmissionServices;