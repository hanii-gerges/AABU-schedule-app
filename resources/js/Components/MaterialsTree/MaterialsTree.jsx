import React, { useEffect, useState } from "react";

import Tree, { withStyles } from "react-vertical-tree";
import { MaterialNode } from "./MaterialNode";

import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { Spinner } from "reactstrap";

import "./MaterialsTree.module.scss";

//? data recieved from API.

// const rows_of_data = [
//     {
//         id: 1,
//         name: "حاسوب 2 ",
//         pre_req: null,
//         sections: [
//             {
//                 id: 1,
//                 section: 1,
//                 time_days: " 8.00 AM- 9.00 AM  حد ثل خمس",
//                 room: "تم202",
//                 instructor: "TutorName"
//             }
//         ]
//     },

//     {
//         id: 2,
//         name: "برمجة كينونية ",
//         pre_req: 1,
//         sections: [
//             {
//                 id: 2,
//                 section: 1,
//                 time_days: " 10.00 AM- 11.00 AM  حد ثل خمس",
//                 room: "تم202",
//                 instructor: "TutorName"
//             }
//         ]
//     },

//     {
//         id: 3,
//         name: "تراكيب البيانات",
//         pre_req: 2,
//         sections: [
//             {
//                 id: 3,
//                 section: 1,
//                 time_days: " 10.00 AM- 11.00 AM  حد ثل خمس",
//                 room: "تم202",
//                 instructor: "TutorName"
//             }
//         ]
//     },
//     {
//         id: 4,
//         name: "تصميم الصفحات الالكترونية",
//         pre_req: 2,
//         sections: [
//             {
//                 id: 4,
//                 section: 1,
//                 time_days: " 10.00 AM- 11.00 AM  حد ثل خمس",
//                 room: "تم202",
//                 instructor: "TutorName"
//             }
//         ],

//         lab_sections: [
//             {
//                 id: 44,
//                 section: 1,
//                 time_days: " 8.00 AM- 9.30 AM ربع",
//                 room: "تم202",
//                 instructor: "TutorName"
//             }
//         ]
//     },
//     {
//         id: 5,
//         name: "البرمجة بلغة جافا",
//         pre_req: 2,
//         sections: [
//             {
//                 id: 5,
//                 section: 1,
//                 time_days: " 10.00 AM- 11.00 AM  حد ثل خمس",
//                 room: "تم202",
//                 instructor: "ابو عليم"
//             },
//             {
//                 id: 5,
//                 section: 2,
//                 time_days: " 8.00 AM- 9.30 AM  ثن ربع",
//                 room: "تم202",
//                 instructor: "جوجو"
//             }
//         ]
//     },
//     {
//         id: 6,
//         name: "البرمجة المرئية",
//         pre_req: 5,
//         sections: [
//             {
//                 id: 6,
//                 section: 1,
//                 time_days: " 10.00 AM- 11.00 AM  حد ثل خمس",
//                 room: "تم202",
//                 instructor: "TutorName"
//             },
//             {
//                 id: 6,
//                 section: 2,
//                 time_days: " 11.00 AM- 12.00 AM  حد ثل خمس",
//                 room: "تم202",
//                 instructor: "وحده هبله"
//             },
//             {
//                 id: 6,
//                 section: 3,
//                 time_days: " 2.00 AM- 3.30 AM  حد ثل خمس",
//                 room: "تم202",
//                 instructor: "واحد اهبل"
//             }
//         ],

//         lab_sections: [
//             {
//                 id: 66,
//                 section: 1,
//                 time_days: " 8.00 AM- 9.00 AM  ثن ",
//                 room: "تم202",
//                 instructor: "واحد اهبل"
//             },
//             {
//                 id: 66,
//                 section: 2,
//                 time_days: " 9.00 AM- 10.00 AM  خمس",
//                 room: "تم202",
//                 instructor: "وحده هبله"
//             }
//         ]
//     },

//     {
//         id: 7,
//         name: "رياضيات متقطعة",
//         pre_req: null,
//         sections: [
//             {
//                 section: 1,
//                 time_days: " 10.00 AM- 11.00 AM  حد ثل خمس",
//                 room: "تم202",
//                 instructor: "TutorName"
//             }
//         ]
//     },
//     {
//         id: 8,
//         name: "تصميم منطق الحاسوب",
//         pre_req: 7,
//         sections: [
//             {
//                 section: 1,
//                 time_days: " 10.00 AM- 11.00 AM  حد ثل خمس",
//                 room: "تم202",
//                 instructor: "قص قص"
//             }
//         ]
//     },
//     {
//         id: 9,
//         name: "نظرية الحسابات ",
//         pre_req: 7,
//         sections: [
//             {
//                 section: 1,
//                 time_days: " 10.00 AM- 11.00 AM  حد ثل خمس",
//                 room: "تم202",
//                 instructor: "TutorName"
//             }
//         ]
//     }
// ];

export const MaterialsTree = () => {
    const getMaterialsForParent = id => {
        let result_child_array = [];

        const child_array = rows_of_data.filter(m => m.pre_req === id);
        for (const material of child_array) {
            let dataObject = { ...material, parent: id, children: [] }; //{id: material.id, parent: id, name: material.name, children: []};
            dataObject.children = getMaterialsForParent(material.id);
            result_child_array.push(dataObject);
        }

        return result_child_array;
    };

    const getArrayForMaterial = material => {
        let dataObject = { ...material, parent: null, children: [] }; //{id: material.id, parent: null, name: material.name, children: []};

        dataObject.children = getMaterialsForParent(material.id);

        return [dataObject];
    };

    const AvaliableFacilities = ["كلية تكنلوجيا المعلومات", "المتطلبات"];
    const Majors = {
        "كلية تكنلوجيا المعلومات": ["CS", "CIS", "MIS"],
        المتطلبات: ["الكل"]
    };

    const [facilityDropdownOpen, setFacilityDropdownOpen] = useState(false);
    const [majorDropdownOpen, setMajorDropdownOpen] = useState(false);

    const [selectedValue, setSelectedValue] = useState(AvaliableFacilities[0]);
    const [majorValue, setMajorValue] = useState("CS");

    //? API call
    const [rows_of_data, setData] = useState([]);

    // useEffect(() => {
    //     setData([
    //         {
    //             id: 1,
    //             name: "حاسوب 2 ",
    //             pre_req: 0,
    //             lab_sections: [],
    //             sections: [
    //                 {
    //                     course_id: 1,
    //                     credit_hours: 3,
    //                     number: 1,
    //                     time_days: " 8.00 AM- 9.00 AM  حد ثل خمس",
    //                     room: "تم202",
    //                     instructor: "TutorName"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 2,
    //             name: "تدريب ميداني",
    //             pre_req: 0,
    //             lab_sections: [],
    //             sections: [
    //                 {
    //                     course_id: 2,
    //                     credit_hours: 3,
    //                     number: 1,
    //                     time_days: " 8.00 PM- 9.00 PM  حد ثل خمس",
    //                     room: "تم202",
    //                     instructor: "TutorName"
    //                 }
    //             ]
    //         }
    //     ]);
    // }, []);
    useEffect(() => {
        setData([]);

        fetch(`https://aabuschedule.herokuapp.com/api/courses/${majorValue == 'الكل' ? 'optional' : majorValue}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => setData(res.data))
            .catch(e => console.log(`ERR: ${e}`));
    }, [majorValue]);

    const styles = {
        lines: {
            color: "green",
            height: "20px"
        }
    };

    const parents_array = rows_of_data.filter(m => m.pre_req === 0);
    const StyledTree = withStyles(styles)(Tree);

    return (
        <div className="studyPlanTree">
            {parents_array.length === 0 && (
                <Spinner className="loading-spinner" color="success" />
            )}

            {parents_array.map((material, index) => (
                <div key={index} className="tree">
                    <StyledTree
                        data={getArrayForMaterial(material)}
                        render={item => <MaterialNode material={item} />}
                    />
                </div>
            ))}

            <div className="info-display">
                <div className="display facility-display">
                    <div className="keyword"> الكلية </div>
                    <Dropdown
                        isOpen={facilityDropdownOpen}
                        toggle={() =>
                            setFacilityDropdownOpen(!facilityDropdownOpen)
                        }
                    >
                        <DropdownToggle caret>{selectedValue}</DropdownToggle>
                        <DropdownMenu>
                            {AvaliableFacilities.map((facility, index) => (
                                <DropdownItem
                                    key={index}
                                    onClick={() => {
                                        setSelectedValue(facility);
                                        setMajorValue(Majors[facility][0]);
                                    }}
                                >
                                    {facility}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <div className="display major-display">
                    <div className="keyword"> التخصص </div>
                    <Dropdown
                        isOpen={majorDropdownOpen}
                        toggle={() => setMajorDropdownOpen(!majorDropdownOpen)}
                    >
                        <DropdownToggle caret>{majorValue}</DropdownToggle>
                        <DropdownMenu>
                            {Majors[selectedValue].map((major, index) => (
                                <DropdownItem
                                    key={index}
                                    onClick={() => setMajorValue(major)}
                                >
                                    {major}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};
