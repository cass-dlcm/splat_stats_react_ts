import {BASEURL} from "../../globals";
import {ShiftStub} from "./shift";

export default async function GetShifts(userId: number | null): Promise<ShiftStub[]> {
    if (userId) {
        return fetch(`${BASEURL}/api/three_salmon/${userId}/`).then((v) => v.json())
    }
    return fetch(`${BASEURL}/api/three_salmon/`).then((v) => v.json())
}