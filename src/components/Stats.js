import { useContext, useMemo } from "react";
import { AppContext } from "../App.context";
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { getAvaregePostLengthByKey } from '../App.service';

// extend dayjs to support .week 
dayjs.extend(isoWeek)

const Stats = () => {
    const {posts} = useContext(AppContext);
    const enhancedPost = useMemo(() => {
        return posts.map((post) => {
            return {
                ...post,
                month: dayjs(post.created_time).month(),
                week: dayjs(post.created_time).isoWeek()
            }
        })
    }, [posts]);

    console.log(getAvaregePostLengthByKey(enhancedPost, 'month'));
    return(
        <div className="supermetrics-stats">
            <h2 className="supermetrics-heading">Stats</h2>
        </div>
    )
};

export default Stats;