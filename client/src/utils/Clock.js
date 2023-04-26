const Clock = (params) => {
    const { mins, clock } = params;
    const timemins = mins ? mins : 0;
    const timeclock= clock ? clock : 0;
   
    return `${timemins} : ${timeclock<10?0:''}${timeclock}`;
};

export default Clock;