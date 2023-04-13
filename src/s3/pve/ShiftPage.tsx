import {CoopHistoryDetailResult} from "@samuel/splatnet3-types/dist/splatnet3";
import React from "react";
import {useLoaderData} from "react-router-dom";

export default function ShiftPage(): JSX.Element {
    const {shift} = useLoaderData() as { shift: { data: CoopHistoryDetailResult } };

    return <>
        <table>
            <tbody>
            <tr>
                <th>Rotation</th>
                <td>{shift.data.coopHistoryDetail!.weapons.map((w) => `${w.name}, `)}</td>
            </tr>
            <tr>
                <th>Stage</th>
                <td>{shift.data.coopHistoryDetail!.coopStage.name}</td>
            </tr>
            <tr>
                <th>Hazard Level</th>
                <td>{`${shift.data.coopHistoryDetail!.dangerRate * 100}%`}</td>
            </tr>
            <tr>
                <th>Salmometer</th>
                <td>{`${shift.data.coopHistoryDetail!.smellMeter} / 5`}</td>
            </tr>
            <tr>
                <th>Result</th>
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
            </tr>
            <tr>
                <th>Title After</th>
                <td>{`${shift.data.coopHistoryDetail!.afterGrade!.name} ${shift.data.coopHistoryDetail!.afterGradePoint}`}</td>
            </tr>
            <tr>
                <th>Job Points</th>
                <td>{`${shift.data.coopHistoryDetail!.jobPoint} = ${shift.data.coopHistoryDetail!.jobScore} * ${shift.data.coopHistoryDetail!.jobRate} + ${shift.data.coopHistoryDetail!.jobBonus}`}</td>
            </tr>
            <tr>
                <th>Eggs</th>
                <td>{`${shift.data.coopHistoryDetail!.waveResults.map((w) => w.teamDeliverCount).reduce((partialSum, a) => partialSum! + a!)} Golden, ${shift.data.coopHistoryDetail!.memberResults.map((m) => m.deliverCount).reduce((partialSum, a) => partialSum! + a!) + shift.data.coopHistoryDetail!.myResult.deliverCount} Power`}</td>
            </tr>
            {shift.data.coopHistoryDetail!.scale && <tr>
                <th>Fish Scales</th>
                <td></td>
            </tr>}
            <tr>
                <th>Job Started</th>
                <td>{shift.data.coopHistoryDetail!.playedTime}</td>
            </tr>
            </tbody>
        </table>
        <h3>Waves</h3>
        <table>
            <thead>
            <tr>
                <th />
                <th>Result</th>
                <th>Event</th>
                <th>Water Level</th>
                <th>Golden Egg Delivers / Quota</th>
                <th>Golden Egg Appearances</th>
                <th>Specials</th>
            </tr>
            </thead>
            <tbody>
            {shift.data.coopHistoryDetail!.waveResults.map((w) => <tr key={w.waveNumber}>
                <th>Wave {w.waveNumber}</th>
                <td>{`${shift.data.coopHistoryDetail!.resultWave == 0 || shift.data.coopHistoryDetail!.resultWave > w.waveNumber}`}</td>
                <td>{w.eventWave && w.eventWave.name}</td>
                <td>{w.waterLevel}</td>
                <td>{w.teamDeliverCount} / {w.deliverNorm}</td>
                <td>{w.goldenPopCount}</td>
                <td>{w.specialWeapons.map((s) => `${s.name}, `)}</td>
            </tr>)}
            <tr>
                <th>Total</th>
                <td/>
                <td/>
                <td/>
                <td>{shift.data.coopHistoryDetail!.waveResults.map((w) => w.teamDeliverCount).reduce((partialSum, a) => partialSum! + a!)}</td>
                <td>{shift.data.coopHistoryDetail!.waveResults.map((w) => w.goldenPopCount).reduce((partialSum, a) => partialSum! + a!)}</td>
            </tr>
            </tbody>
        </table>
        <h3>Players</h3>
        <table>
            <thead>
            <tr>
                <th/>
                <th>Uniform</th>
                <th>Weapons</th>
                <th>Special</th>
                <th>Golden Egg Delivers</th>
                <th>Power Eggs</th>
                <th>Rescues</th>
                <th>Rescued</th>
                <th>Boss Salmonid Kills</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>{`${shift.data.coopHistoryDetail!.myResult.player.name}#${shift.data.coopHistoryDetail!.myResult.player.nameId}`}</th>
                <td>{shift.data.coopHistoryDetail!.myResult.player.uniform.name}</td>
                <td>{shift.data.coopHistoryDetail!.myResult.weapons.map((w) => `${w.name}, `)}</td>
                <td>{shift.data.coopHistoryDetail!.myResult.specialWeapon!.name}</td>
                <td>{`${shift.data.coopHistoryDetail!.myResult.goldenDeliverCount} <${shift.data.coopHistoryDetail!.myResult.goldenAssistCount}>`}</td>
                <td>{shift.data.coopHistoryDetail!.myResult.deliverCount}</td>
                <td>{shift.data.coopHistoryDetail!.myResult.rescueCount}</td>
                <td>{shift.data.coopHistoryDetail!.myResult.rescuedCount}</td>
                <td>{shift.data.coopHistoryDetail!.myResult.defeatEnemyCount}</td>
            </tr>
            {shift.data.coopHistoryDetail!.memberResults.map((m) => <tr>
                <th>{`${m.player.name}#${m.player.nameId}`}</th>
                <td>{m.player.uniform.name}</td>
                <td>{m.weapons.map((w) => `${w.name}, `)}</td>
                <td>{m.specialWeapon!.name}</td>
                <td>{`${m.goldenDeliverCount} <${m.goldenAssistCount}>`}</td>
                <td>{m.deliverCount}</td>
                <td>{m.rescueCount}</td>
                <td>{m.rescuedCount}</td>
                <td>{m.defeatEnemyCount}</td>
            </tr>)}
            </tbody>
        </table>
        <h3>Boss Salmonids</h3>
        <table>
            <thead>
            <tr>
                <th>Boss Salmonid</th>
                <th>Defeated</th>
                <th>Appearances</th>
            </tr>
            </thead>
            <tbody>
            {shift.data.coopHistoryDetail!.enemyResults.map((e) => <tr>
                <th>{e.enemy.name}</th>
                <td>{`${e.teamDefeatCount} (${e.defeatCount})`}</td>
                <td>{e.popCount}</td>
            </tr>)}
            <tr>
                <th>Total</th>
                <td>{`${shift.data.coopHistoryDetail!.enemyResults.map((e) => e.teamDefeatCount).reduce((sum, a) => sum+a)} (${shift.data.coopHistoryDetail!.enemyResults.map((e) => e.defeatCount).reduce((sum, a) => sum+a)})`}</td>
                <td>{shift.data.coopHistoryDetail!.enemyResults.map((e) => e.popCount).reduce((sum, a) => sum+a)}</td>
            </tr>
            </tbody>
        </table>
    </>
}