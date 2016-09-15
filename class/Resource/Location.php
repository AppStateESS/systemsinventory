<?php

namespace systemsinventory\Resource;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */

class Location extends \Resource
{

  protected $display_name;
  protected $description;
  protected $active = 1;
  protected $table = 'systems_location';

    public function __construct()
    {
      parent::__construct();
      $this->display_name = new \Variable\TextOnly(null,'display_name');
      $this->description = new \Variable\TextOnly(null,'description');
      $this->active = new \Variable\Integer(1,'active');

          }

    public function setDisplayName($name){
      $this->display_name->set($name);
    }

    public function setDescription($description){
        $this->description->set($description);
    }  
    
    public function setActive($active){
        $this->active->set($active);
    }  

}
