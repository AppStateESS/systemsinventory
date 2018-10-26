<?php

namespace systemsinventory\Resource;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */

class Location extends \phpws2\Resource
{

  protected $display_name;
  protected $parent_location;
  protected $description;
  protected $active = 1;
  protected $table = 'systems_location';

    public function __construct()
    {
      parent::__construct();
      $this->display_name = new \phpws2\Variable\TextOnly(null,'display_name');
      $this->parent_location = new \phpws2\Variable\IntegerVar(1,'parent_location');
      $this->description = new \phpws2\Variable\TextOnly(null,'description');
      $this->active = new \phpws2\Variable\IntegerVar(1,'active');

          }

    public function setDisplayName($name){
      $this->display_name->set($name);
    }

    public function setParentLocation($parent_location){
        $this->parent_location = $parent_location;
    }
    
    public function setDescription($description){
        $this->description->set($description);
    }  
    
    public function setActive($active){
        $this->active->set($active);
    }  

}
