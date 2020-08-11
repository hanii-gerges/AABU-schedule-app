import React, { useState, useEffect } from "react";
import "./StudentSchedule.module.scss";

import { useSelector } from "react-redux";

import { MaterialCard } from "./MaterialCard";

import moment from "moment";

let times = [];
const days = ["حد", "ثن", "ثل", "ربع", "خمس"];

export const StudentSchedule = React.forwardRef((_, tableRef) => {
    const materialsInSchedule = useSelector(
        state => state.materials.scheduleMaterials
    );
    const [schedule, setSchedule] = useState({});

    const getTimeOnly = str =>
        str.replace(new RegExp("[^\\d\\.\\-AMP]", "g"), "");

    const getValidTime = time => {
        time = getTimeOnly(time)
            .split("-")[0]
            .toLowerCase()
            .replace(".", ":");
        return moment(time, "hh.mma");
    };

    useEffect(() => {
        let updated_schedule = {};
        times = [];

        for (let day of days) {
            for (let m of materialsInSchedule.filter(m =>
                m.time_days.includes(day)
            )) {
                // console.log(times.has(getValidTime(m.time_days)));
                times.push(getValidTime(m.time_days));

                if (typeof updated_schedule[day] === "undefined")
                    updated_schedule[day] = [];

                updated_schedule[day].push(m);
            }
        }

        if (times.length === 0) times = [getValidTime("8:00am"), getValidTime("9:00am"), getValidTime("9:30am")];
        else {
            /* Removes all dublicates */
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
                                                    getValidTime(m.time_days)
                                                )
                                            ) ? (
                                                <MaterialCard
                                                    material={
                                                        schedule[
                                                            day
                                                        ].filter(m =>
                                                            moment(t).isSame(
                                                                getValidTime(
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
                                                    getValidTime(m.time_days)
                                                )
                                            ) ? (
                                                <MaterialCard
                                                    material={
                                                        schedule[
                                                            day
                                                        ].filter(m =>
                                                            moment(t).isSame(
                                                                getValidTime(
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
                                                    getValidTime(m.time_days)
                                                )
                                            ) ? (
                                                <MaterialCard
                                                    material={
                                                        schedule[
                                                            day
                                                        ].filter(m =>
                                                            moment(t).isSame(
                                                                getValidTime(
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
