import moment from 'moment'

export const ReferenceCount = (data) => 
{
    //gets count of each token from tweets
    let countObject = {}

    for(let obj of data){
        let filtered = obj.tweet.toUpperCase().match(/(\s\$\S+)/ig);
        if(filtered){
            for(let token of filtered){
                if(token[2] && isNaN(token[2])){
                    if(!countObject.hasOwnProperty(token)){countObject[token] = 0}
                    countObject[token]++;
                }
            }
        }
        
    }
    return countObject;
}

export const StringToDate = (data) =>
{
    //converts dates to js Date readable
    return data.map(obj => {obj.created_at = new Date(obj.created_at.slice(0,19));return obj;})
}

export const DataDateFilter = (data,dateFrom,dateTo) =>
{
    //filters data between given dates
    return data.filter(item => item.created_at > dateFrom && item.created_at < dateTo)
}

export const FormatLineData = (data, minuteIncrement, customTokens = null, countMin = 10)=>
{
    //format for line data
    let dateList = [] //columns
    let tableData = [] //lines

    
    if(!customTokens){
        //get all tokens in data
        let initData = ReferenceCount(data)
        let tokens = Object.keys(initData);
        //populate array
        for(let token of tokens){
            if(initData[token] >= countMin){
                tableData.push({token:token, data:[]})
            }
            
        }
    }else{
        //use custom tokens only
        for(let token of customTokens){
            tableData.push({token:" "+token, data:[]})
        }
    }
    

    //get count for each interval of time period and add it to array
    let dateTrack = data[data.length-1].created_at
    while(data[0].created_at > dateTrack){
        //get from and to dates
        let fromDate = dateTrack
        dateTrack = moment(dateTrack).add(minuteIncrement, "m").toDate()
        dateList.push(moment(dateTrack).format('HH:mm:ss'))
        //get filtered data and the reference count
        let filteredData = DataDateFilter(data, fromDate, dateTrack)
        let referenceCount = ReferenceCount(filteredData)
        let tokenList = Object.keys(referenceCount)
        for(let obj of tableData){
            //populate token count array
            if(tokenList.includes(obj.token)){
                obj.data.push(referenceCount[obj.token])
            }else{
                obj.data.push(0)
            }
        }
    }

    return {columns:dateList, data:tableData}
}

export const Random = (from, to)=>{
    return Math.floor(Math.random() * (to-from+1)) + from;
}