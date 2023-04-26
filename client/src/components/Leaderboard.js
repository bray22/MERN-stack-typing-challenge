import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Leader from './Leader'
import SubmissionServices from '../services/SubmissionServices';

const Leaderboard = () => {
    useEffect( () => {
        getSubmissions();
    }, []);

    const [submissions, setSubmissions] = useState([]);
    const getSubmissions = async () => {
        const submissions = await SubmissionServices.getSubmissions();
        
        setSubmissions(submissions);
    };

    return(
        <section>
            <div id="leaderboard">
                <div className="title">
                    <div>Rank</div>
                    <div>Name</div>
                    <div>Words Correct</div>
                    <div>Level</div>
                    <div>time</div>
                    <div>Accuracy</div>
                </div>
                <>   
                    {submissions.sort((a, b) => b.accuracy - a.accuracy).map((submission, i) => (
                     <Leader submission={submission} key={i} counter={i} />
                    ))}
                </>
            </div>
        </section>
    );
}

export default Leaderboard;