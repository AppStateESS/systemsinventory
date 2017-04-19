<?php

namespace systemsinventory\Resource;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */

class Department extends \phpws2\Resource
{

  protected $display_name;
  protected $parent_department;
  protected $description;
  protected $active = 1;
  protected $table = 'systems_department';

    public function __construct()
    {
      parent::__construct();
      $this->display_name = new \phpws2\Variable\TextOnly(null,'display_name');
      $this->parent_department = new \phpws2\Variable\IntegerVar(1,'parent_department');
      $this->description = new \phpws2\Variable\TextOnly(null,'description');
      $this->active = new \phpws2\Variable\IntegerVar(1,'active');

          }

    public function setDisplayName($name){
      $this->display_name->set($name);
    }

    public function setParentDepartment($parent_dept){
        $this->parent_department->set($parent_dept);
    }  
    
    public function setDescription($description){
        $this->description->set($description);
    }  
    
    public function setActive($active){
        $this->active->set($active);
    }  

}
