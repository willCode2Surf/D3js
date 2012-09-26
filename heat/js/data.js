//var names = ["Chan","Jonathan","Ali","Gagan","Lucas","Alim","Faisal","Candi","Mary","Carlos","Arthur","Acar","Boris","John","Sofia","Fady","Laila","Lionel","Francsisco","Genevieve","Hank","Adonis","Acelin","Agustin","Dario","Josh","Ekaraj","Ken","Ambrose","Ambrosea","Raju","Ayushi","Mark","Maximiliano","Dave","Alice","Banaj","Wayne","Bandhu","Karl","Avilash","Qiao","Rupreet","Sarish","Panav","Kevin","Nikolay","Sunay","Shrish","Kazuki","Fai","Takumi","Yatin"];
var names = ["Chan","Jonathan","Ali","Gagan","Lucas","Alim","Faisal","Mary","Arthur","Acar","Boris","John","Sofia","Laila","Lionel","Adonis","Acelin","Agustin","Dario","Ekaraj","Ambrose","Raju","Ayushi","Dave","Alice","Banaj","Wayne","Bandhu","Karl","Avilash","Sarish","Panav","Kevin","Nikolay","Sunay","Kazuki","Fai","Takumi","Yatin"];

var names_zoners = ["Ayushi","Ali","Gagan","Mary","Acar","Laila","Dario","Raju","Dave","Alice","Banaj","Wayne","Bandhu","Karl","Sarish","Kevin","Sunay","Fai","Sofia","John","Boris","Alim"];
var names_seaters = ["Chan","Adonis","Arthur","Panav","Kazuki"];
var names_jumpers = ["Jonathan","Lucas","Lionel","Acelin","Agustin","Ekaraj","Ambrose","Avilash","Nikolay","Takumi","Yatin"];

names.sort();
names_zoners.sort();
names_seaters.sort();
names_jumpers.sort();

var data_Chan = [];
data_Chan.push(
{"x": 10, "y": 3, "count": 1},
{"x": 10, "y": 2, "count": 6},
{"x": 11, "y": 2, "count": 1},
{"x": 8, "y": 2, "count": 1},
{"x": 9, "y": 2, "count": 1},
{});

var data_Jonathan = [];
data_Jonathan.push(
{"x": 6, "y": 4, "count": 1},
{"x": 2, "y": 4, "count": 2},
{"x": 2, "y": 2, "count": 1},
{"x": 1, "y": 2, "count": 1},
{"x": 2, "y": 5, "count": 1},
{"x": 3, "y": 4, "count": 2},
{"x": 5, "y": 1, "count": 1},
{"x": 3, "y": 1, "count": 1},
{"x": 8, "y": 4, "count": 1},
{"x": 8, "y": 3, "count": 1},
{"x": 5, "y": 3, "count": 1},
{"x": 2, "y": 3, "count": 1},
{"x": 4, "y": 1, "count": 1},
{"x": 2, "y": 1, "count": 1},
{});

var data_Ali = [];
data_Ali.push(
{"x": 3, "y": 3, "count": 3},
{"x": 2, "y": 3, "count": 4},
{"x": 4, "y": 4, "count": 1},
{"x": 3, "y": 4, "count": 3},
{"x": 1, "y": 2, "count": 1},
{"x": 2, "y": 4, "count": 4},
{"x": 2, "y": 5, "count": 2},
{});

var data_Gagan = [];
data_Gagan.push(
{"x": 7, "y": 4, "count": 1},
{"x": 8, "y": 2, "count": 1},
{"x": 5, "y": 4, "count": 1},
{"x": 6, "y": 4, "count": 1},
{"x": 6, "y": 2, "count": 1},
{"x": 4, "y": 2, "count": 1},
{"x": 4, "y": 3, "count": 4},
{"x": 7, "y": 3, "count": 1},
{"x": 5, "y": 2, "count": 2},
{"x": 5, "y": 3, "count": 1},
{"x": 4, "y": 4, "count": 2},
{});

var data_Lucas = [];
data_Lucas.push(
{"x": 6, "y": 2, "count": 3},
{"x": 5, "y": 3, "count": 1},
{"x": 9, "y": 3, "count": 1},
{"x": 4, "y": 3, "count": 1},
{"x": 5, "y": 4, "count": 1},
{"x": 8, "y": 4, "count": 1},
{"x": 6, "y": 3, "count": 3},
{"x": 4, "y": 4, "count": 1},
{"x": 12, "y": 3, "count": 1},
{"x": 3, "y": 3, "count": 1},
{"x": 7, "y": 1, "count": 1},
{"x": 4, "y": 2, "count": 1},
{"x": 9, "y": 5, "count": 1},
{"x": 7, "y": 3, "count": 1},
{});

var data_Alim = [];
data_Alim.push(
{"x": 12, "y": 2, "count": 1},
{"x": 2, "y": 4, "count": 2},
{"x": 2, "y": 3, "count": 2},
{"x": 2, "y": 5, "count": 1},
{"x": 1, "y": 4, "count": 2},
{"x": 1, "y": 5, "count": 1},
{"x": 1, "y": 3, "count": 1},
{"x": 10, "y": 5, "count": 1},
{});

/*
var data_Faisal = [];
data_Faisal.push(
{"x": 5, "y": 3, "count": 1},
{"x": 6, "y": 4, "count": 1},
{"x": 8, "y": 5, "count": 1},
{"x": 7, "y": 2, "count": 1},
{"x": 10, "y": 3, "count": 1},
{"x": 10, "y": 5, "count": 1},
{"x": 7, "y": 4, "count": 1},
{"x": 8, "y": 4, "count": 1},
{"x": 10, "y": 4, "count": 1},
{});
*/

/*
var data_Candi = [];
data_Candi.push(
{"x": 1, "y": 4, "count": 1},
{});
*/

var data_Mary = [];
data_Mary.push(
{"x": 2, "y": 2, "count": 3},
{"x": 3, "y": 2, "count": 1},
{"x": 1, "y": 2, "count": 1},
{"x": 2, "y": 1, "count": 3},
{"x": 10, "y": 2, "count": 1},
{"x": 3, "y": 1, "count": 3},
{});

/*
var data_Carlos = [];
data_Carlos.push(
{"x": 12, "y": 2, "count": 1},
{});
*/

var data_Arthur = [];
data_Arthur.push(
{"x": 5, "y": 5, "count": 1},
{"x": 3, "y": 5, "count": 5},
{"x": 4, "y": 5, "count": 1},
{"x": 2, "y": 5, "count": 4},
{"x": 1, "y": 5, "count": 1},
{});

var data_Acar = [];
data_Acar.push(
{"x": 4, "y": 1, "count": 2},
{"x": 5, "y": 1, "count": 5},
{"x": 8, "y": 1, "count": 1},
{"x": 6, "y": 1, "count": 3},
{"x": 4, "y": 2, "count": 1},
{"x": 5, "y": 2, "count": 3},
{"x": 4, "y": 3, "count": 1},
{"x": 3, "y": 2, "count": 1},
{});

var data_Boris = [];
data_Boris.push(
{"x": 5, "y": 5, "count": 1},
{"x": 8, "y": 4, "count": 1},
{"x": 7, "y": 3, "count": 1},
{"x": 6, "y": 2, "count": 2},
{"x": 8, "y": 3, "count": 1},
{"x": 7, "y": 2, "count": 1},
{"x": 5, "y": 2, "count": 1},
{"x": 11, "y": 4, "count": 1},
{"x": 9, "y": 2, "count": 5},
{"x": 8, "y": 2, "count": 2},
{"x": 10, "y": 2, "count": 2},
{});

var data_John = [];
data_John.push(
{"x": 10, "y": 4, "count": 3},
{"x": 11, "y": 3, "count": 1},
{"x": 11, "y": 4, "count": 3},
{"x": 9, "y": 4, "count": 1},
{"x": 9, "y": 5, "count": 1},
{"x": 5, "y": 5, "count": 1},
{"x": 10, "y": 5, "count": 3},
{"x": 2, "y": 4, "count": 1},
{});

var data_Sofia = [];
data_Sofia.push(
{"x": 4, "y": 2, "count": 1},
{"x": 7, "y": 3, "count": 1},
{"x": 4, "y": 3, "count": 2},
{"x": 11, "y": 5, "count": 1},
{"x": 2, "y": 4, "count": 1},
{"x": 5, "y": 3, "count": 2},
{"x": 3, "y": 4, "count": 1},
{"x": 4, "y": 4, "count": 1},
{"x": 2, "y": 3, "count": 1},
{"x": 6, "y": 4, "count": 2},
{"x": 2, "y": 2, "count": 1},
{"x": 6, "y": 3, "count": 2},
{});

/*
var data_Fady = [];
data_Fady.push(
{"x": 5, "y": 2, "count": 1},
{"x": 7, "y": 4, "count": 1},
{"x": 3, "y": 5, "count": 1},
{});
*/

var data_Laila = [];
data_Laila.push(
{"x": 3, "y": 2, "count": 5},
{"x": 5, "y": 2, "count": 1},
{"x": 3, "y": 3, "count": 1},
{"x": 4, "y": 3, "count": 1},
{"x": 2, "y": 2, "count": 4},
{"x": 1, "y": 1, "count": 1},
{"x": 4, "y": 2, "count": 2},
{});

var data_Lionel = [];
data_Lionel.push(
{"x": 11, "y": 5, "count": 1},
{"x": 6, "y": 3, "count": 1},
{"x": 5, "y": 5, "count": 1},
{"x": 2, "y": 1, "count": 1},
{"x": 5, "y": 3, "count": 2},
{"x": 8, "y": 5, "count": 1},
{"x": 5, "y": 4, "count": 2},
{"x": 7, "y": 5, "count": 1},
{"x": 4, "y": 4, "count": 1},
{"x": 3, "y": 4, "count": 1},
{"x": 3, "y": 3, "count": 1},
{"x": 12, "y": 4, "count": 1},
{});

/*
var data_Genevieve = [];
data_Genevieve.push(
{"x": 3, "y": 4, "count": 1},
{});
*/

/*
var data_Hank = [];
data_Hank.push(
{"x": 2, "y": 4, "count": 1},
{});
*/

var data_Adonis = [];
data_Adonis.push(
{"x": 11, "y": 1, "count": 11},
{"x": 6, "y": 5, "count": 1},
{"x": 12, "y": 3, "count": 3},
{});

var data_Acelin = [];
data_Acelin.push(
{"x": 6, "y": 4, "count": 1},
{"x": 11, "y": 4, "count": 1},
{"x": 6, "y": 3, "count": 1},
{"x": 12, "y": 3, "count": 1},
{"x": 9, "y": 2, "count": 1},
{"x": 8, "y": 4, "count": 1},
{"x": 8, "y": 2, "count": 2},
{"x": 3, "y": 5, "count": 1},
{"x": 9, "y": 3, "count": 1},
{"x": 7, "y": 1, "count": 1},
{"x": 8, "y": 3, "count": 1},
{"x": 4, "y": 5, "count": 1},
{"x": 11, "y": 3, "count": 1},
{"x": 1, "y": 4, "count": 1},
{"x": 2, "y": 3, "count": 1},
{});

var data_Agustin = [];
data_Agustin.push(
{"x": 8, "y": 4, "count": 1},
{"x": 9, "y": 5, "count": 1},
{"x": 6, "y": 5, "count": 2},
{"x": 3, "y": 3, "count": 2},
{"x": 2, "y": 3, "count": 2},
{"x": 3, "y": 2, "count": 1},
{"x": 4, "y": 4, "count": 1},
{"x": 6, "y": 2, "count": 1},
{"x": 7, "y": 2, "count": 1},
{});

var data_Dario = [];
data_Dario.push(
{"x": 1, "y": 1, "count": 2},
{"x": 7, "y": 1, "count": 2},
{"x": 5, "y": 1, "count": 4},
{"x": 6, "y": 1, "count": 1},
{"x": 4, "y": 1, "count": 1},
{"x": 3, "y": 1, "count": 1},
{});

/*
var data_Josh = [];
data_Josh.push(
{"x": 10, "y": 5, "count": 1},
{"x": 7, "y": 4, "count": 1},
{"x": 11, "y": 5, "count": 1},
{});
*/

var data_Ekaraj = [];
data_Ekaraj.push(
{"x": 9, "y": 2, "count": 1},
{"x": 7, "y": 2, "count": 1},
{"x": 8, "y": 2, "count": 1},
{"x": 2, "y": 4, "count": 1},
{"x": 3, "y": 5, "count": 1},
{"x": 6, "y": 1, "count": 1},
{"x": 2, "y": 3, "count": 1},
{"x": 7, "y": 1, "count": 2},
{"x": 3, "y": 3, "count": 1},
{});

/*
var data_Ken = [];
data_Ken.push(
{"x": 12, "y": 4, "count": 1},
{"x": 5, "y": 1, "count": 1},
{});
*/

var data_Ambrose = [];
data_Ambrose.push(
{"x": 4, "y": 5, "count": 1},
{"x": 3, "y": 5, "count": 1},
{"x": 5, "y": 3, "count": 1},
{"x": 5, "y": 2, "count": 1},
{"x": 7, "y": 1, "count": 1},
{"x": 1, "y": 3, "count": 1},
{"x": 4, "y": 1, "count": 1},
{"x": 7, "y": 5, "count": 1},
{"x": 11, "y": 3, "count": 1},
{"x": 11, "y": 5, "count": 1},
{"x": 2, "y": 5, "count": 1},
{"x": 1, "y": 5, "count": 1},
{"x": 6, "y": 4, "count": 1},
{"x": 6, "y": 3, "count": 1},
{});

var data_Raju = [];
data_Raju.push(
{"x": 11, "y": 3, "count": 2},
{"x": 4, "y": 4, "count": 1},
{"x": 9, "y": 3, "count": 2},
{"x": 11, "y": 2, "count": 1},
{"x": 8, "y": 4, "count": 1},
{"x": 10, "y": 3, "count": 2},
{"x": 9, "y": 4, "count": 1},
{"x": 10, "y": 4, "count": 2},
{});

var data_Ayushi = [];
data_Ayushi.push(
{"x": 2, "y": 1, "count": 2},
{"x": 3, "y": 1, "count": 4},
{"x": 8, "y": 5, "count": 1},
{"x": 1, "y": 1, "count": 1},
{"x": 4, "y": 1, "count": 2},
{"x": 7, "y": 5, "count": 2},
{"x": 1, "y": 2, "count": 1},
{});

/*
var data_Mark = [];
data_Mark.push(
{"x": 8, "y": 3, "count": 1},
{});
*/

/*
var data_Maximiliano = [];
data_Maximiliano.push(
{"x": 7, "y": 3, "count": 2},
{"x": 3, "y": 4, "count": 1},
{"x": 4, "y": 4, "count": 1},
{"x": 5, "y": 4, "count": 1},
{"x": 8, "y": 4, "count": 1},
{"x": 4, "y": 1, "count": 1},
{"x": 6, "y": 3, "count": 1},
{});
*/

var data_Dave = [];
data_Dave.push(
{"x": 8, "y": 5, "count": 1},
{"x": 4, "y": 4, "count": 1},
{"x": 9, "y": 5, "count": 2},
{"x": 10, "y": 5, "count": 3},
{"x": 4, "y": 5, "count": 1},
{"x": 11, "y": 5, "count": 2},
{});

var data_Alice = [];
data_Alice.push(
{"x": 6, "y": 1, "count": 1},
{"x": 2, "y": 2, "count": 1},
{"x": 2, "y": 1, "count": 2},
{"x": 3, "y": 1, "count": 1},
{"x": 3, "y": 2, "count": 2},
{"x": 1, "y": 1, "count": 1},
{"x": 8, "y": 1, "count": 1},
{"x": 6, "y": 2, "count": 1},
{"x": 3, "y": 3, "count": 1},
{"x": 9, "y": 2, "count": 1},
{"x": 11, "y": 3, "count": 1},
{"x": 7, "y": 2, "count": 2},
{"x": 7, "y": 3, "count": 1},
{"x": 12, "y": 1, "count": 1},
{});

var data_Banaj = [];
data_Banaj.push(
{"x": 6, "y": 5, "count": 1},
{"x": 7, "y": 5, "count": 3},
{"x": 9, "y": 5, "count": 1},
{"x": 4, "y": 5, "count": 1},
{"x": 1, "y": 5, "count": 2},
{"x": 11, "y": 5, "count": 1},
{"x": 5, "y": 5, "count": 1},
{"x": 11, "y": 4, "count": 1},
{"x": 9, "y": 3, "count": 1},
{"x": 12, "y": 5, "count": 1},
{});

var data_Wayne = [];
data_Wayne.push(
{"x": 1, "y": 3, "count": 5},
{"x": 12, "y": 5, "count": 1},
{"x": 1, "y": 4, "count": 3},
{"x": 2, "y": 3, "count": 1},
{"x": 2, "y": 4, "count": 1},
{"x": 5, "y": 4, "count": 1},
{"x": 8, "y": 5, "count": 1},
{});

var data_Bandhu = [];
data_Bandhu.push(
{"x": 7, "y": 1, "count": 1},
{"x": 8, "y": 1, "count": 4},
{"x": 6, "y": 1, "count": 4},
{"x": 4, "y": 1, "count": 2},
{"x": 1, "y": 1, "count": 1},
{"x": 3, "y": 2, "count": 1},
{});

var data_Karl = [];
data_Karl.push(
{"x": 3, "y": 1, "count": 3},
{"x": 4, "y": 1, "count": 4},
{"x": 3, "y": 2, "count": 1},
{"x": 10, "y": 2, "count": 1},
{"x": 2, "y": 1, "count": 2},
{"x": 1, "y": 1, "count": 2},
{});

var data_Avilash = [];
data_Avilash.push(
{"x": 4, "y": 3, "count": 4},
{"x": 3, "y": 4, "count": 1},
{"x": 9, "y": 5, "count": 1},
{"x": 8, "y": 5, "count": 1},
{"x": 5, "y": 5, "count": 3},
{"x": 6, "y": 5, "count": 1},
{"x": 4, "y": 4, "count": 2},
{"x": 5, "y": 2, "count": 1},
{"x": 6, "y": 2, "count": 1},
{"x": 4, "y": 5, "count": 1},
{});

/*
var data_Qiao = [];
data_Qiao.push(
{"x": 11, "y": 4, "count": 1},
{"x": 11, "y": 2, "count": 2},
{"x": 12, "y": 4, "count": 2},
{"x": 12, "y": 5, "count": 2},
{"x": 12, "y": 2, "count": 2},
{});
*/

/*
var data_Rupreet = [];
data_Rupreet.push(
{"x": 10, "y": 2, "count": 1},
{"x": 5, "y": 2, "count": 1},
{"x": 3, "y": 4, "count": 1},
{"x": 12, "y": 3, "count": 1},
{"x": 12, "y": 5, "count": 1},
{"x": 11, "y": 5, "count": 1},
{});
*/

var data_Sarish = [];
data_Sarish.push(
{"x": 5, "y": 4, "count": 1},
{"x": 4, "y": 5, "count": 1},
{"x": 1, "y": 3, "count": 1},
{"x": 2, "y": 5, "count": 2},
{"x": 2, "y": 4, "count": 1},
{"x": 1, "y": 5, "count": 2},
{"x": 3, "y": 5, "count": 1},
{"x": 11, "y": 4, "count": 1},
{});

var data_Panav = [];
data_Panav.push(
{"x": 9, "y": 3, "count": 7},
{"x": 10, "y": 4, "count": 1},
{"x": 10, "y": 3, "count": 5},
{"x": 11, "y": 3, "count": 2},
{"x": 10, "y": 2, "count": 1},
{"x": 11, "y": 4, "count": 1},
{});

var data_Kevin = [];
data_Kevin.push(
{"x": 4, "y": 4, "count": 3},
{"x": 6, "y": 2, "count": 1},
{"x": 3, "y": 2, "count": 2},
{"x": 4, "y": 2, "count": 1},
{"x": 2, "y": 1, "count": 1},
{"x": 4, "y": 3, "count": 2},
{"x": 11, "y": 4, "count": 1},
{"x": 1, "y": 4, "count": 1},
{});

var data_Nikolay = [];
data_Nikolay.push(
{"x": 7, "y": 3, "count": 1},
{"x": 10, "y": 5, "count": 3},
{"x": 8, "y": 5, "count": 2},
{"x": 7, "y": 5, "count": 2},
{"x": 5, "y": 2, "count": 1},
{"x": 6, "y": 5, "count": 1},
{"x": 6, "y": 2, "count": 1},
{"x": 5, "y": 1, "count": 1},
{"x": 7, "y": 2, "count": 1},
{"x": 6, "y": 1, "count": 3},
{"x": 3, "y": 1, "count": 1},
{});

var data_Sunay = [];
data_Sunay.push(
{"x": 2, "y": 5, "count": 2},
{"x": 1, "y": 5, "count": 3},
{"x": 2, "y": 2, "count": 1},
{"x": 12, "y": 2, "count": 1},
{"x": 3, "y": 3, "count": 1},
{"x": 1, "y": 2, "count": 1},
{"x": 4, "y": 5, "count": 1},
{});

var data_Kazuki = [];
data_Kazuki.push(
{"x": 12, "y": 4, "count": 1},
{"x": 12, "y": 2, "count": 1},
{"x": 11, "y": 2, "count": 8},
{"x": 10, "y": 3, "count": 1},
{"x": 11, "y": 3, "count": 2},
{"x": 9, "y": 2, "count": 1},
{});

var data_Fai = [];
data_Fai.push(
{"x": 12, "y": 3, "count": 1},
{"x": 12, "y": 2, "count": 1},
{"x": 10, "y": 3, "count": 1},
{"x": 11, "y": 1, "count": 1},
{"x": 8, "y": 1, "count": 6},
{});

var data_Takumi = [];
data_Takumi.push(
{"x": 11, "y": 3, "count": 1},
{"x": 7, "y": 4, "count": 1},
{"x": 12, "y": 2, "count": 2},
{"x": 11, "y": 4, "count": 1},
{"x": 9, "y": 2, "count": 1},
{"x": 1, "y": 2, "count": 2},
{"x": 11, "y": 2, "count": 1},
{"x": 9, "y": 3, "count": 1},
{"x": 2, "y": 2, "count": 1},
{"x": 5, "y": 3, "count": 1},
{"x": 4, "y": 4, "count": 1},
{"x": 8, "y": 1, "count": 1},
{"x": 6, "y": 2, "count": 1},
{});

var data_Yatin = [];
data_Yatin.push(
{"x": 5, "y": 1, "count": 1},
{"x": 12, "y": 1, "count": 1},
{"x": 8, "y": 4, "count": 1},
{"x": 3, "y": 3, "count": 2},
{"x": 2, "y": 2, "count": 3},
{"x": 2, "y": 4, "count": 1},
{"x": 4, "y": 1, "count": 1},
{"x": 7, "y": 3, "count": 1},
{"x": 9, "y": 3, "count": 1},
{"x": 12, "y": 2, "count": 1},
{"x": 5, "y": 2, "count": 1},
{});