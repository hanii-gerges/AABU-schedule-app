import React, { useState, useEffect } from "react";

import { ButtonModal } from "./Modal";

import { extractTimeFromString, extractDaysFromString } from "../../Util/TimeFunctions";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

export const InteractiveRow = ({ material }) => {
    const [selectIndex, setSelectIndex] = useState(0);
    const [isDropDownOpen, setDropDownOpen] = useState(false);

    const [sectionsControl, setSectionsControl] = useState({
        useLabs: false,
        displaySections: material.sections
    });

    useEffect(() => {
        setSectionsControl({
            useLabs: false,
            displaySections: material.sections
        });

        //! FIXING TIME PROBLEM FROM AABU's SITE:

        const FIX_AM_PM = t =>
            t[0] + t[1] == "12" ? (t = t.replace(new RegExp("AM"), "PM")) : t;

        let days = extractDaysFromString(
            sectionsControl.displaySections[selectIndex].time_days
        );
        let time = extractTimeFromString(
            sectionsControl.displaySections[selectIndex].time_days
        ).split("-");
        time = [FIX_AM_PM(time[0]), FIX_AM_PM(time[1])].join(" - ");

        sectionsControl.displaySections[selectIndex].time_days = time + days;
        // console.log(
        //     `freash new time: ${sectionsControl.displaySections[selectIndex].time_days}`
        // );
    }, [material]);

    /* //  TODO: 

		?[DONE] Clicking away from the drop-down-menu should close it!
					-> (ترقيع: onMouseLeave)
					-> back to using Dropdown from reactstrap

		* Think of a more user friendly way to deal with having only one option
	
	*/

    const ToggleLabs = () => {
        setSelectIndex(0);

        setSectionsControl({
            useLabs: !sectionsControl.useLabs,
            displaySections: !sectionsControl.useLabs
                ? material.lab_sections
                : material.sections
        });
    };

    const containsLabs = material.lab_sections.length > 0;

    return (
        <tr>
            <td>
                <ButtonModal
                    material={{
                        name: material.name,
                        isLab: sectionsControl.useLabs, // check if should add badge in student schedule
                        ...sectionsControl.displaySections[selectIndex]
                    }}
                />
            </td>

            <td colSpan={containsLabs ? 0 : 2}>
                <span className="material-name">{material.name}</span>
            </td>

            {//	render only for materials with lab_sections
            containsLabs && (
                <td>
                    <button className="switch" onClick={ToggleLabs}>
                        <div
                            className={
                                "selected-highlight " +
                                (sectionsControl.useLabs
                                    ? "right-side"
                                    : "left-side")
                            }
                        ></div>
                        <div className="option-labs">مختبرات</div>

                        <div className="option-materials">شعب المادة</div>
                    </button>
                </td>
            )}

            <td>
                <Dropdown
                    className={"drop-down" + (isDropDownOpen ? " open" : "")}
                    isOpen={isDropDownOpen}
                    onClick={() => setDropDownOpen(!isDropDownOpen)}
                    toggle={() => setDropDownOpen(!isDropDownOpen)}
                >
                    <DropdownToggle
                        tag="span"
                        data-toggle="dropdown"
                        aria-expanded={isDropDownOpen}
                    >
                        <table>
                            <tbody>
                                <tr id={selectIndex}>
                                    <td>
                                        {
                                            sectionsControl.displaySections[
                                                selectIndex
                                            ].instructor
                                        }
                                    </td>
                                    <td>
                                        {
                                            sectionsControl.displaySections[
                                                selectIndex
                                            ].time_days
                                        }
                                    </td>
                                    <td>
                                        {
                                            sectionsControl.displaySections[
                                                selectIndex
                                            ].room
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </DropdownToggle>

                    <DropdownMenu className="drop-down-menu">
                        <table>
                            <tbody>
                                {sectionsControl.displaySections.map(
                                    (_option, index) => (
                                        <tr
                                            key={index}
                                            onClick={() => {
                                                setSelectIndex(index);
                                            }}
                                        >
                                            <td>{_option.instructor}</td>
                                            <td>{_option.time_days}</td>
                                            <td>{_option.room}</td>
                                            <td>
                                                {index == selectIndex
                                                    ? "✔"
                                                    : null}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </DropdownMenu>
                </Dropdown>
            </td>
        </tr>
    );
};
