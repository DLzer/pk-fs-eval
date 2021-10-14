import axios from 'axios';
import { BASE_API, DECISIONS } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, forwardRef } from 'react';
import { Link } from "react-router-dom";
import loadClaimsData from "../../thunks/load-claims";
import { getAppClaims } from "../../selectors";

import styles from './home-page.css';

export default function HomePage() {
    const dispatch = useDispatch();
    const claims = useSelector(getAppClaims) || {};
    const [selections, setSelections] = useState([])

    // Load initial claims data
    useEffect(() => {
        dispatch(loadClaimsData());
    }, []);

    // Set initial selections objects array
    useEffect(() => {
        if (Object.entries(claims).length !== 0) {
            const selections = []
            claims.line_items.map((selectedObject, i) => {
                selections.push({id: i, claim_type: selectedObject.claim_line_item_type, decision: selectedObject.decision})
            })
            setSelections(selections)
        }
    }, [claims])

    /**
     * Not sure if this project allowed using additional dependencies.
     * I would have opted to use a data table to manage the state and 
     * updating, but considering we have some raw HTML to deal with I went
     * with a traditional JS direction.
     * 
     * On change we're getting the claim type, and selected value from the row.
     * The new value is then mapped to the initialState (selections) so it can be
     * updated.
     * 
     * @param {Event} e 
     */
    const onChange = e => {
        let value = e.target.value
        let claimType = e.target.parentNode.previousSibling.previousSibling.childNodes[0].nodeValue
        selections.map((claimRow, index) => {
            if ( claimRow.claim_type === claimType) {
                let updatedData = [...selections]
                let selectedIndex ={...updatedData[index]}
                selectedIndex.decision = value
                updatedData[index] = selectedIndex
                setSelections(updatedData)
            }
        })
    }

    // Send the current state of (selections) to the API for updating
    function saveData() {

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
        return axios.post(`${BASE_API}/claims/set`, selections, {headers})
        .then((res => {
            if ( res.status == 200) {
                alert("Decisions updated")
            } else {
                alert("There wans an error saving your selection")
        }
        }))
    }

    return (
        <div className={styles.container}>
            <p>Customer: Paige Davenport</p>
            <p>PKN690800</p>
            <p>Claim: {claims.id}</p>

            <Link to="/utilization">Plan Utilization</Link>
            <hr />

            <p><b>Claim Type:</b></p>
            <p>{claims.claim_type}</p>

            <p><b>Claimed Amount:</b></p>
            <p>{claims.amount_claimed}</p>

            <p style={{ marginTop: '80px' }}><b>Line Items:</b></p>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Qty</th>
                        <th>Decision</th>
                        <th>Amount Claimed</th>
                    </tr>
                </thead>
                <tbody>
                {claims.line_items ? claims.line_items.map((item, index) => (
                    <tr key={index}>
                        <td>{item.claim_line_item_type}</td>
                        <td>{item.quantity}</td>
                        <td>
                            {/* This is not how I would have preferred to manage state, 
                            but I'm not sure how much was allowed to change within this project */}
                            {selections.map((selection) => {
                                if (selection.claim_type === item.claim_line_item_type) {
                                    return(<select
                                    key={index}
                                    type="select" 
                                    onChange={onChange} 
                                    value={selection.decision || "none"}>
                                        <option value="none">Select One</option>
                                        <option value="approved">Approved</option>
                                        <option value="denied">Denied</option>
                                    </select>)
                                }
                            })}
                        </td>
                        <td>{item.amount_claimed}</td>
                    </tr>
                )) : null}
                </tbody>
            </table>
            <button onClick={saveData}>Save</button>
        </div>
    );
}