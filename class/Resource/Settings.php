<?php

namespace systemsinventory\Resource;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */

class Settings extends \Resource
{

  protected $user_id;
  protected $departments;  
  protected $table = 'systems_permission';

    public function __construct()
    {
      parent::__construct();
      $this->user_id = new \Variable\Integer(0,'user_id');
      $this->departments = new \Variable\TextOnly(null,'departments');
          }

    public function setUserID($user_id){
      $this->user_id->set($user_id);
    }

    public function setDepartments($departments){
        $this->departments->set($departments);
    }  

}

