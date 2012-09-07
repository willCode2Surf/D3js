<?php

class Job
{
	public $Name;
	public $Revision;
	public $Status;
	public $Date;
	
	public function __construct($Name, $Revision, $Status)
	{
		$this->Name = $Name;
		$this->Revision = $Revision;
		$this->Status = $Status;
		$this->Date = strtotime('+1 day');
	}
}

$Jobs = array();
$Jobs[] = new Job("Portal.Build.Trunk", 111, true);
$Jobs[] = new Job("Portal.Build.Trunk", 112, false);
$Jobs[] = new Job("Portal.Unit.Trunk", 112, true);


echo json_encode($Jobs);
?>