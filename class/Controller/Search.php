<?php

namespace systemsinventory\Controller;

use systemsinventory\Factory\Search as Factory;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */
class Search extends \Http\Controller
{

    public function get(\Request $request)
    {
        $data = array();
        $view = $this->getView($data, $request);
        $response = new \Response($view);
        return $response;
    }

    protected function getHtmlView($data, \Request $request)
    {
        $content = Factory::form($request);
        $view = new \View\HtmlView($content);
        return $view;
    }

    public function post(\Request $request){
      $factory = new Factory;

      $factory->runSearch($request);
      $view = $this->getHtmlView($request);
      $response = new \Response($view);
      return $response;
    }
}
