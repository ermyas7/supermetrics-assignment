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

    if(posts.length === 0) return null;
    return(
        <div className="supermetrics-stats">
            <h2 className="supermetrics-heading">Stats</h2>
            <br/>
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

        </div>
    )
};

export default Stats;