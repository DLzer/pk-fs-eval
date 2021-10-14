import { useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { getAppPlans } from '../../selectors';
import { loadPlansData } from "../../thunks/load-plans";

import styles from './utilization-page.css';

export default function UtilizationPage() {
    const dispatch = useDispatch();
    const plans = useSelector(getAppPlans) || [];

    useEffect(() => {
        dispatch(loadPlansData())
    }, [])

    return(
        <div className={styles.container}>

            <h1 className={styles.profile_title}>Bella's Profile</h1>
            
            <div className={styles.profile_data}>
                <p><b>Birthday: </b> 06/15/2018</p>
                <p><b>Weight: </b> 16 lbs</p>
            </div>

            <Link to="/">Home</Link>

            <hr />

            <div className={styles.container}>
                <h2 className={styles.benefits_title}>Track Benefits</h2>
                {
                plans.length !== 0 ?
                    <table className={styles.plan_table}>
                        <thead><tr><th className={styles.benefits_name}>Preventative Essentials Benefits</th></tr></thead>
                        <tbody>
                            <tr>
                                <td className={styles.plan_utilization_data}>Vaccines</td>
                                <td className={styles.plan_utilization_data}>
                                    { (plans[0].vaccine_utilization ?? 0) + " out of " + plans[0].vaccines}
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.plan_utilization_data}>Wellness Exams</td>
                                <td className={styles.plan_utilization_data}>
                                    { (plans[0].wellness_exam_utilization ?? 0) + " out of " + plans[0].wellness_exam}
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.plan_utilization_data}>Blood Tests</td>
                                <td className={styles.plan_utilization_data}>
                                    { (plans[0].blood_test_utilization ?? 0 )  + " out of " + plans[0].blood_test}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                : <p className={styles.plan_error}>No plans available</p>
                }
            </div>

        </div>
    )

}