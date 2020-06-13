-- delete c++ object html labs from courses
DELETE FROM courses WHERE id=901134;
DELETE FROM courses WHERE id=901214;
DELETE FROM courses WHERE id=902354;

-- insert c++ object html lab sections
INSERT INTO sections VALUES
(90113300,1,"8.00 AM-10.00 AM حد ثل","اسلام محمود عليان الدلابيح","4 تم"),
(90113300,3,"10.20 AM-12.20 AM ثن ربع","كوثر احمد عقله الزبون","4 تم"),
(90121000,2,"8.00 AM-10.00 AM ثن ربع","رائد رياض بشير عبدالعال","تم12"),
(90121000,3,"12.40 AM-2.40 PM ثن ربع","رائد ذياب عواد الحرافشه","تم12"),
(90235000,1,"8.00 AM-10.00 AM حد ثل","سحر محمد فاضي الحسبان","1 تم"),
(90235000,3,"10.20 AM-12.20 AM ثن ربع","محمد ابراهيم عبد القادر الحسن","1 تم");

