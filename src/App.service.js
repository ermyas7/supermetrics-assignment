// const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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

const getBigPostByChar = (posts) => {

    let biggestPost = posts[0];
    posts.forEach((element) => {
        if(element.message.length > biggestPost.message.length){
            biggestPost = element;
            console.log(element.message.length);
        }
    });
    return biggestPost;
}
export const getAvaregePostLengthByKey = (posts, key) => {
    const arrayGroupedObj = groupByKey(posts, key);
    const result = {};
    Object.keys(arrayGroupedObj).forEach((key) => {
        result[key] = averageCharLength(arrayGroupedObj[key]);
    });
    return result;
}

export const getLongestPostByChar = (posts, key) => {
    const groupedPosts = groupByKey(posts, key);
    const bigPostByMonth = {};
    Object.keys(groupedPosts).forEach((key) => {
        bigPostByMonth[key] = getBigPostByChar(groupedPosts[key]);
    });
    return bigPostByMonth;
}

export const totalPostNumber = (posts, key) => {
    const groupedPostsByWeek = groupByKey(posts, key);
    const totalPostByWeek = {};
    Object.keys(groupedPostsByWeek).forEach((key) => {
        totalPostByWeek[key] = groupedPostsByWeek[key].length;
    });
    return totalPostByWeek;
}

