import React, {useState} from "react";
import GetShifts from "./getShift";
import {ShiftStub} from "./shift";

export default function ListShifts(): JSX.Element {
    const [state, setState] = useState({retrieved: false, shifts: [] as ShiftStub[]})
    if (!state.retrieved) {
        GetShifts(null).then((retreivedShifts) => setState({retrieved: true, shifts: retreivedShifts}))
    }
    return <table>
        {state.shifts.map((shift, index) => <tr id={`${index}`}>
            <td><a href={`${shift.userId}/${shift.data.coopHistoryDetail!.id}`}>Details</a></td>
            <td>{shift.data.coopHistoryDetail!.coopStage.name}</td>
            <td>{shift.data.coopHistoryDetail!.myResult.weapons.map((weapon) => weapon.name)}</td>
            <td>{shift.data.coopHistoryDetail!.myResult.specialWeapon!.name}</td>
        </tr>)}
    </table>;
}