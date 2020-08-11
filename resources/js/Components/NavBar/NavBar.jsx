import React, { useState, useEffect } from "react";

import { CLEAR_SCHDULE } from "../../Redux/actions/types";
import { useDispatch } from "react-redux";

import "!style-loader!css-loader!bootstrap/dist/css/bootstrap.css";
import {
    faInfoCircle,
    faFileImage,
    faTable,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./NavBar.module.scss";

import Modal from "./Modal";

import htmlToImage from "html-to-image";
const download = require("downloadjs");

export const NavBar = ({ table }) => {
    //? init hooks
    const [tableLayout, setTableLayout] = useState(3);
    const layoutModes = [
		"2 يومي",
		"ثلاث ايام",
		"يومين",
		"يومي",
	];
    const dispatch = useDispatch();

    const TakeImageOfTable = () => {
        htmlToImage
            .toPng(table.current, {
                backgroundColor: "white",
                style: { margin: "0px" }
            })
            .then(function(dataUrl) {
                download(dataUrl, "my-table.png");
            })
            .catch(function(error) {
                console.error("oops, something went wrong! ", error);
            });
    };

    //?  ChangeTableLayout:
    useEffect(() => {
        if (tableLayout === 3) {
            table.current.children[0].style.display = "none";

            for (let i = 1; i < 3; ++i)
                table.current.children[i].style.display = "table";
        } else {
            for (let i = 0; i < 3; ++i) {
                if (i === tableLayout)
                    table.current.children[i].style.display = "table";
                else table.current.children[i].style.display = "none";
            }
        }
    }, [tableLayout]);

    const [showModal, setModal] = useState(false);

    return (
        <menu className="top-menu">
            <Modal
                title="جدول الطالب و جريدة المواد و الخطة الشجرية في مكان واحد!"
                content={
                    <div>
                        <p>
                            ان هذا المشروع صنع من قبل طلاب جامعة ال البيت - كلية
                            تكنلوجيا المعلومات ليكون مفتوح المصدر ويتيح للجميع
                            التعديل عليه وتحسينه ليصبح ملائما لاستخدام الطالب في
                            اختيار المواد التي يريد تسجيلها, وعلى امل ان يتم
                            تطوير المشروع ليستطيع الطالب التسجيل من خلاله
                            مباشرة.
                        </p>
                        <p>المساهمون</p>

                        <div style={{ textAlign: "center" }}>
                            <p>
                                Front-end Developer (React):
                                <a href="https://github.com/MrN-Nabhani" target="_blank"> Najm Nabhani </a>
                            </p>
                            <p>
                                Backend Developer (Laravel):
                                <a href="https://github.com/abualhen" target="_blank"> Hanii Gerges </a>
                            </p>
                        </div>
                        <p>
                            كن جزء من هذا
                            <a href="#"> المشروع </a>
                            :)
                        </p>
                    </div>
                }
                show={showModal}
                toggle={() => setModal(false)}
            />

            <div className="left-nav">
                <span className="logo">
                    {/* {
                        <img
                            className="logo"
                            src={"Assets/logo/somename.jpg"}
                            alt="LOGO"
                        />
                    }
                    &nbsp; */}
                    <h2 className="title"> AABU Schedule Builder </h2>
                </span>
            </div>

            <div className="right-nav">
                <button className="btn" onClick={() => setModal(true)}>
                    {" "}
                    عن المشروع <FontAwesomeIcon icon={faInfoCircle} />{" "}
                </button>

                <button className="btn" onClick={() => TakeImageOfTable()}>
                    حفظ صورة <FontAwesomeIcon icon={faFileImage} />
                </button>

                <button
                    className="btn"
                    onClick={() =>
                        setTableLayout(tableLayout => ++tableLayout % 4)
                    }
                >
                    تغيير نوع الجدول
                    <small>{layoutModes[tableLayout]}</small>
                    <FontAwesomeIcon icon={faTable} />
                </button>

                <button
                    className="btn"
                    onClick={() => dispatch({ type: CLEAR_SCHDULE })}
                >
                    مسح الجدول <FontAwesomeIcon icon={faTrash} />
                </button>

                {/* <button className='btn'>		
									تواصل معنا
							</button> */}
            </div>
        </menu>
    );
};
