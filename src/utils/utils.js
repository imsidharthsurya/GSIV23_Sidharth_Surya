//extra functions to make things easier

function prepareHeader(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_API_TOKEN}`);
        myHeaders.append("accept", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        return requestOptions;
}

function getDateRange(){
        var lower_date="2000-08-01"
        var limit_date=new Date()
        var curr_month=limit_date.getMonth()
        limit_date.setMonth(curr_month+1)
        // console.log("the new date will be: ",limit_date)
        const offset = limit_date.getTimezoneOffset()
        limit_date = new Date(limit_date.getTime() - (offset*60*1000))
        limit_date= limit_date.toISOString().split('T')[0]
        return {lower_date,limit_date}
}
module.exports={
    prepareHeader,
    getDateRange
}