<?php

class Job
{
	public $Job;
	public $Revision;
	public $Status;
	public $Date;
	
	public function __construct($Name, $Revision, $Status, $Date)
	{
		$this->Job = $Name;
		$this->Revision = $Revision;
		$this->Status = $Status;
		$this->Date = $Date;
	}
}

class Pipeline
{
	public static $Minute = 1;
	public static function getJobs($Name, $Branch, $Jobs, $Revision, $LastStatus=null, $LastJob=null)
	{
		if (is_null($LastStatus))
		{
			if (is_null($LastJob))
			{
				$LastJob = end($Jobs);
				$LastStatus = 'pass';
			}
			else
			{
				$LastStatus = 'run';
			}
		}
		else
		{
			if (is_null($LastJob))
			{
				$LastJob = end($Jobs);
			}
		}

		$PipelineJobs = array();
		foreach ($Jobs as $Job)
		{
			$Status = ($Job == $LastJob ? $LastStatus : 'pass');
			$PipelineJobs[] = new Job($Name.".".$Job.".".$Branch, $Revision, $Status, strtotime((Pipeline::$Minute+=1).' minute'));
			if ($Job == $LastJob)
			{
				break;
			}
		}
		return $PipelineJobs;
	}
}

class CommitPipeline
{
	public static function getJobs($Name, $Branch, $Revision, $LastStatus=null, $LastJob=null)
	{
		return Pipeline::getJobs($Name, $Branch, array('Build', 'UTS', 'UTDB', 'UTL'), $Revision, $LastStatus, $LastJob);
	}
}

$Days = 1;

$Jobs = array();

$Jobs = array_merge($Jobs, CommitPipeline::getJobs("Portal", "Trunk", 109));
$Jobs = array_merge($Jobs, CommitPipeline::getJobs("Portal", "Trunk", 110));
$Jobs = array_merge($Jobs, CommitPipeline::getJobs("Portal", "Trunk", 111));
$Jobs = array_merge($Jobs, CommitPipeline::getJobs("Portal", "Trunk", 112, 'fail'));
$Jobs = array_merge($Jobs, CommitPipeline::getJobs("Portal", "Trunk", 113, 'run', 'Build'));
$Jobs = array_merge($Jobs, CommitPipeline::getJobs("AE", "Trunk", 114));
$Jobs = array_merge($Jobs, CommitPipeline::getJobs("DA", "Trunk", 115));
$Jobs = array_merge($Jobs, CommitPipeline::getJobs("CRS", "Trunk", 116));

echo json_encode($Jobs);
?>