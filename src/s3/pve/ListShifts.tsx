import React, {useState} from "react";
import {GetShifts} from "./getShift";
import {ShiftStub} from "./shift";
import {Link, Outlet} from "react-router-dom";

export default function ListShifts(): JSX.Element {
    const [state, setState] = useState({retrieved: false, shifts: [] as ShiftStub[]})
    if (!state.retrieved) {
        GetShifts(null).then((retreivedShifts) => setState({retrieved: true, shifts: retreivedShifts}))
    }
    return <table>
         <thead>
         <tr>
             <th></th>
             <th>Stage</th>
             <th>Player Weapons</th>
             <th>Player Special</th>
             <th>Result</th>
             <th>Salmometer</th>
             <th>Hazard Level</th>
             <th>Title (After)</th>
             <th>Played Time</th>
         </tr>
         </thead>
         <tbody>
         {state.shifts && state.shifts.map((shift, index) => <tr key={`${index}`}>
             <td><Link to={`${shift.userId}/${shift.data.coopHistoryDetail!.id}`}>Details</Link></td>
             <td>{shift.data.coopHistoryDetail!.coopStage.name}</td>
             <td>{shift.data.coopHistoryDetail!.myResult.weapons.map((weapon, index) => `${index+1}: ${weapon.name} \t`)}</td>
             <td>{shift.data.coopHistoryDetail!.myResult.specialWeapon!.name}</td>
             <td>{function () {
                switch (shift.data.coopHistoryDetail!.resultWave) {
                    case 0:
                        return <><span>Cleared</span>{shift.data.coopHistoryDetail!.bossResult &&
                            <span> - {`${(shift.data.coopHistoryDetail!.bossResult.hasDefeatBoss && "Victory against ") || ("Loss against ")} ${shift.data.coopHistoryDetail!.bossResult.boss!.name}`}</span>}</>;
                    case 1:
                        return "Failed in wave 1";
                    case 2:
                        return "Failed in wave 2";
                    case 3:
                        return "Failed in wave 3";
                }
            }()}</td>
            <td>{shift.data.coopHistoryDetail!.smellMeter}</td>
            <td>{`${shift.data.coopHistoryDetail!.dangerRate*100}%`}</td>
            <td>{`${shift.data.coopHistoryDetail!.afterGrade!.name} ${shift.data.coopHistoryDetail!.afterGradePoint}`}</td>
            <td>{shift.data.coopHistoryDetail!.playedTime}</td>
        </tr>)}
        </tbody>
     </table>
}