<?php
$Agent["name"] = "Beth";
$Agent["team"] = "Lion";
$Agent["att"] = array(array("1/1/2012",600), array("12/31/2012", 340));
$Agent["fcr"] = array(array("1/1/2012",0.38), array("12/31/2012",0.40));

$Agents[] = $Agent;
echo json_encode($Agents);
?>