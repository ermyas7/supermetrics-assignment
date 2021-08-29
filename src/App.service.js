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
        return {data: responseBody.data};
    } catch (error) {
        console.log(error);
        return {error: error.message}
    }
}
