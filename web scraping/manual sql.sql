-- delete c++ object html labs from courses
DELETE FROM courses WHERE id=901134;
DELETE FROM courses WHERE id=901214;
DELETE FROM courses WHERE id=902354;

-- insert c++ object html lab sections
INSERT INTO sections VALUES
(90113300,1,25,"12.00 AM-2.00 PM حد","اسماء عوض علي الجيزاوي","4 تم"),
(90113300,1,26,"2.00 PM-4.00 PM ثن","سهيله فرحان احمد ابو عويضه","1 تم"),
(90113300,1,27,"2.00 PM-4.00 PM ثل","احمد عبد المعطي مصطفى الترك","تم 4"),
(90113300,1,28,"8.00 AM-10.00 PM ربع","سحر محمد فاضي الحسبان","تم 4"),

(90121000,1,1,"2.00 PM-4.00 PM حد","احمد عبد المعطي مصطفى الترك","تم12"),
(90121000,1,2,"2.00 PM-4.00 PM ثن","احمد عبد المعطي مصطفى الترك","تم12"),
(90121000,1,3,"8.00 AM-10.00 AM ثل","رائد رياض بشير عبدالعال","تم12"),
(90121000,1,4,"2.00 PM-4.00 PM ثل","رائد رياض بشير عبدالعال","تم12"),
(90121000,1,5,"12.30 AM-2.30 PM ربع","احمد عبد المعطي مصطفى الترك","تم12"),

(90235000,1,1,"10.00 AM-12.00 AM حد","محمد ابراهيم عبد القادر الحسن","1 تم"),
(90235000,1,2,"2.00 PM-4.00 PM حد","محمد ابراهيم عبد القادر الحسن","1 تم"),
(90235000,1,3,"8.00 AM-10.00 AM ثن","محمد ابراهيم عبد القادر الحسن","1 تم"),
(90235000,1,4,"2.00 PM-4.00 PM ثن","اسماء عوض علي الجيزاوي","4 تم"),
(90235000,1,5,"8.00 AM-10.00 AM ثل","اسماء عوض علي الجيزاوي","4 تم"),
(90235000,1,6,"12.00 AM-2.00 PM ثل","محمد ابراهيم عبد القادر الحسن","1 تم"),
(90235000,1,7,"2.00 PM-4.00 PM ثل","سحر محمد فاضي الحسبان","1 تم"),
(90235000,1,8,"2.00 PM-4.00 PM ربع","سحر محمد فاضي الحسبان","1 تم"),
(90235000,1,9,"12.30 PM-2.30 PM ربع ","محمد ابراهيم عبد القادر الحسن","4 تم");



-- change pre_reqs
UPDATE courses SET pre_req=0 WHERE id=901133; -- c++
UPDATE courses SET pre_req=901133 WHERE id=901210; -- object
UPDATE courses SET pre_req=901133 WHERE id=902210; -- basic
UPDATE courses SET pre_req=901325 WHERE id=901327 AND major="cs"; -- wireless cs
UPDATE courses SET pre_req=901320 WHERE id=901332 AND major="cs"; -- os cs
UPDATE courses SET pre_req=901325 WHERE id=901480 AND major="cs"; -- security cs
UPDATE courses SET pre_req=901325 WHERE id=901420 AND major="cs"; -- ربط الشبكات وتطبيقاته	cs
UPDATE courses SET pre_req=901210 WHERE id=901350 AND major="cs"; -- الرسم بالحاسوب cs
UPDATE courses SET pre_req=901341 WHERE id=902480 AND major="cs"; -- حماية cs
UPDATE courses SET pre_req=902221 WHERE id=901327 AND major="cis"; -- wireless cis
UPDATE courses SET pre_req=902220 WHERE id=901332 AND major="cis"; -- os cis
UPDATE courses SET pre_req=904460 WHERE id=901480 AND major="cis"; -- security cis
UPDATE courses SET pre_req=902221 WHERE id=901420 AND major="cis"; -- ربط الشبكات وتطبيقاته	cis
UPDATE courses SET pre_req=901133 WHERE id=902220 AND major="cis"; --  تركيب النظم الحاسوبية cis
UPDATE courses SET pre_req=904230 WHERE id=904354 AND major="mis"; -- محاسبية محوسبة mis
UPDATE courses SET pre_req=904230 WHERE id=902221 AND major="mis"; -- شبكات mis
UPDATE courses SET pre_req=904230 WHERE id=904370 AND major="mis"; -- ادارة معرفة mis
UPDATE courses SET pre_req=904230 WHERE id=904340; -- تحليل






-- change is sections id
UPDATE sections SET course_id=904230 WHERE course_id=904233;
















