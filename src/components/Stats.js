import { Fragment, useContext, useMemo } from "react";
import { AppContext } from "../App.context";
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { getAvaregePostLengthByKey, getLongestPostByChar, totalPostNumber, averagePostPerUserPerMonth } from '../App.service';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// extend dayjs to support .week 
dayjs.extend(isoWeek)

const Stats = () => {
    const {posts} = useContext(AppContext);
    const enhancedPost = useMemo(() => {
        if(posts.length === 0) return [];
        return posts.map((post) => {
            return {
                ...post,
                month: months[dayjs(post.created_time).month()],
                week: dayjs(post.created_time).isoWeek()
            }
        })
    }, [posts]);

    const averageCharLengthByMonthEntity = useMemo(() => {
        return Object.entries(getAvaregePostLengthByKey(enhancedPost, 'month'));
    }, [enhancedPost]);

    const LongestPostPerCharByMonth = useMemo(() => {
        return Object.entries(getLongestPostByChar(enhancedPost, 'month'));
    }, [enhancedPost]);

    const postEntityByWeekNumber = useMemo(() => {
        return Object.entries(totalPostNumber(enhancedPost, 'week'));
    }, [enhancedPost]);

    const averagePostByUser = useMemo(() =>{
        return Object.entries(averagePostPerUserPerMonth(enhancedPost));
    }, [enhancedPost])

    console.log('------------------------------------------------')
    console.log('Average character length of posts per month')
    console.log(averageCharLengthByMonthEntity);
    console.log('------------------------------------------------')
    console.log('Longest post by character length per month')
    console.log(LongestPostPerCharByMonth);
    console.log('------------------------------------------------')
    console.log('Total posts split by week number')
    console.log(postEntityByWeekNumber);
    console.log('------------------------------------------------')
    console.log('Average number of posts per user per month')
    console.log(averagePostByUser);
    if(posts.length === 0) return null;
    return(
        <div className="supermetrics-stats">
            <h2 className="supermetrics-heading">Stats</h2>
            <br/>
            <h3>Please check the log from the developer tool to see the detail data</h3>
            <hr/>
            <br/>
            <h3>Average character length of posts per month </h3>
            <br/>
             {
                 averageCharLengthByMonthEntity.map(([key, value]) => {
                     return <p key={key}>{`${key} ------ ${value}`}</p>
                 })
             }  
             <br/>

            <br/>
            <hr/>
            <br/>
            <h3>Longest post by character length per month </h3>
            <br/>
             {
                 LongestPostPerCharByMonth.map(([key, value]) => {
                     return <Fragment key={key}>
                         <p>{`${key} ------ ${value.message}`}</p>
                         <br/>
                     </Fragment>
                 })
             }  
             <br/>

             <br/>
            <hr/>
            <br/>
            <h3>Total posts split by week number </h3>
            <br/>
             {
                 postEntityByWeekNumber.map(([key, value]) => {
                     return <p key={key}>{`week no - ${key} ------ number of posts - ${value}`}</p>
                 })
             }  
             <br/>

             <br/>
            <hr/>
            <br/>
            <h3>Average number of posts per user per month </h3>
            <br/>
             {
                 averagePostByUser.map(([userId, postNo]) => {
                     return (
                        <p key={userId}>{`${userId} have ${postNo} posts per month Avg`}</p> 
                     )
                 })
             }  
             <br/>

            <br/>
            <hr/>
            <br/>

        </div>
    )
};

export default Stats;