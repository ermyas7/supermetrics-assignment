export const doHttp = async (url, params) => {
    try {
        const response = await fetch(
            url,
             {  mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                ...params});       
        const responseBody = await response.json();
        if(responseBody.error && responseBody.error.message){
            return {error: responseBody.error.message};
        }
        return {data: responseBody.data};
    } catch (error) {
        console.log(error);
        return {error: error.message}
    }
}

const  groupByKey = (arr, key) => {
    if(!Array.isArray(arr)){
        return;
    }
    return arr.reduce((obj, element) => {
        obj[element[key]] = obj[element[key]] || [];
        obj[element[key]].push(element);
        return obj;
    }, Object.create(null));
}

const averageCharLength = (arr) => {
    const sum = arr.reduce((acc, ele) => acc + ele.message.length, 0);
    return (sum / arr.length);
}

export const getAvaregePostLengthByKey = (arr, key) => {
    const arrayGroupedObj = groupByKey(arr, key);
    const result = {};
    Object.keys(arrayGroupedObj).forEach((key) => {
        result[key] = averageCharLength(arrayGroupedObj[key]);
    });
    return result;
}

