import { CoopHistoryDetailResult } from "@samuel/splatnet3-types/dist/splatnet3";
import {BASEURL} from "../../globals";
import {ShiftStub} from "./shift";

export async function GetShifts(userId: number | null): Promise<ShiftStub[]> {
    if (userId) {
        return fetch(`${BASEURL}/api/three_salmon/${userId}/`).then((v) => v.json())
    }
    return fetch(`${BASEURL}/api/three_salmon/`).then((v) => v.json())
}

export async function GetShift({params}: {params: {userId: number, shiftId: string}}): Promise<{ shift: CoopHistoryDetailResult }> {
    const shift = await fetch(`${BASEURL}/api/three_salmon/${params.userId}/${params.shiftId}`).then((v) => v.json())
    return {shift}
}