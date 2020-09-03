import React, { useState, useEffect } from "react";
import "./StudentSchedule.module.scss";

import { useSelector } from "react-redux";

import { MaterialCard } from "./MaterialCard";

import moment from "moment";
import { getValidMomentTime } from "../../Util/TimeFunctions";

let times = [];
const days = ["حد", "ثن", "ثل", "ربع", "خمس"];

export const StudentSchedule = React.forwardRef((_, tableRef) => {
    const materialsInSchedule = useSelector(
        state => state.materials.scheduleMaterials
    );
    const [schedule, setSchedule] = useState({});
    useEffect(() => {
        let updated_schedule = {};
        times = [];

        for (let day of days){
            updated_schedule[day] = materialsInSchedule.filter(m => {
                
                if(m.time_days.includes(day)){
                    times.push(getValidMomentTime(m.time_days));
                    return true;     
                }
                return false;
            });
        }

        if (times.length === 0) times = [getValidMomentTime("8:00am"), getValidMomentTime("9:00am"), getValidMomentTime("9:30am")];
        else {
            /* Removes all dublicates */0
            const comparisonValues = times.map(v => v.valueOf());
            times = times.filter(
                (v, i) => comparisonValues.indexOf(v.valueOf()) == i
            );
        }

        console.log(times);

        setSchedule(updated_schedule);
    }, [materialsInSchedule]);

    const materialsCount = materialsInSchedule.length;
    const totalHours =
        materialsCount == 0
            ? 0
            : materialsInSchedule
                  .map(m => m.credit_hours)
                  .reduce((accum, value) => accum + value);

    return (
        <div className="studentSchedule" ref={tableRef}>
            <div className="single-table">
                <table>
                    <thead>
                        <tr>
                            {days.map((day, index) => (
                                <th key={index}>{day}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {times
                            .sort((a, b) =>
                                moment(a).isBefore(moment(b)) ? -1 : 1
                            )
                            .map((t, index) => (
                                <tr key={index}>
                                    {days.map((day, index) => (
                                        <td key={index}>
                                            {" "}
                                            {day in schedule &&
                                            schedule[day].some(m =>
                                                moment(t).isSame(
                                                    getValidMomentTime(m.time_days)
                                                )
                                            ) ? (
                                                <MaterialCard
                                                    material={
                                                        schedule[
                                                            day
                                                        ].filter(m =>
                                                            moment(t).isSame(
                                                                getValidMomentTime(
                                                                    m.time_days
                                                                )
                                                            )
                                                        )[0]
                                                    }
                                                />
                                            ) : (
                                                <pre> {null} </pre>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="left-schedule">
                <table>
                    <thead>
                        <tr>
                            {days.map((day, index) => {
                                if (index % 2 == 0)
                                    return <th key={index}>{day}</th>;
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {times
                            .sort((a, b) =>
                                moment(a).isBefore(moment(b)) ? -1 : 1
                            )
                            .map((t, index) => (
                                <tr key={index}>
                                    {["حد", "ثل", "خمس"].map((day, index) => (
                                        <td key={index}>
                                            {" "}
                                            {day in schedule &&
                                            schedule[day].some(m =>
                                                moment(t).isSame(
                                                    getValidMomentTime(m.time_days)
                                                )
                                            ) ? (
                                                <MaterialCard
                                                    material={
                                                        schedule[
                                                            day
                                                        ].filter(m =>
                                                            moment(t).isSame(
                                                                getValidMomentTime(
                                                                    m.time_days
                                                                )
                                                            )
                                                        )[0]
                                                    }
                                                />
                                            ) : (
                                                <pre> {null} </pre>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div className="right-schedule">
                <table>
                    <thead>
                        <tr>
                            {days.map((day, index) => {
                                if (index % 2 == 1)
                                    return <th key={index}>{day}</th>;
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {times
                            .sort((a, b) =>
                                moment(a).isBefore(moment(b)) ? -1 : 1
                            )
                            .map((t, index) => (
                                <tr key={index}>
                                    {["ثن", "ربع"].map((day, index) => (
                                        <td key={index}>
                                            {" "}
                                            {day in schedule &&
                                            schedule[day].some(m =>
                                                moment(t).isSame(
                                                    getValidMomentTime(m.time_days)
                                                )
                                            ) ? (
                                                <MaterialCard
                                                    material={
                                                        schedule[
                                                            day
                                                        ].filter(m =>
                                                            moment(t).isSame(
                                                                getValidMomentTime(
                                                                    m.time_days
                                                                )
                                                            )
                                                        )[0]
                                                    }
                                                />
                                            ) : (
                                                <pre> {null} </pre>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div className="table-info-display">
                <div className="count-display">
                    <span> {materialsCount} عدد المواد </span>
                </div>

                <div className="hours-display">
                    <span> {totalHours} مجموع الساعات </span>
                </div>
            </div>
        </div>
    );
});
