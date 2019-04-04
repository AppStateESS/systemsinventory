<?php
namespace systemsinventory\Factory;

require_once PHPWS_SOURCE_DIR . 'mod/systemsinventory/config/react.php';


/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Matthew McNaney <mcnaney at gmail dot com>
 */
class React
{

    public static function view($view_name)
    {
        static $vendor_included = false;
        if (!$vendor_included) {
            $script[] = self::getScript('vendor');
            $vendor_included = true;
        }
        $script[] = self::getScript($view_name);
        $react = implode("\n", $script);
        $content = <<<EOF
<div id="$view_name"></div>
EOF;
        \Layout::addJSHeader($react);
        return $content;
    }

    public static function getScript($filename)
    {
        $root_directory = PHPWS_SOURCE_HTTP . 'mod/systemsinventory/javascript/';
        if (SYSTEMS_REACT_DEV) {
            $path = "dev/$filename.js";
        } else {
            $path = "build/" . React::getAssetPath($filename);
        }
        $script = "<script type='text/javascript' src='{$root_directory}$path'></script>";
        return $script;
    }
    
    public static function getAssetPath($scriptName)
    {
        $rootDirectory = PHPWS_SOURCE_DIR . "mod/systemsinventory/";
        if (!is_file($rootDirectory . 'assets.json')) {
            exit('Missing assets.json file. Run "npm run build" in the systemsinventory directory.');
        }
        $jsonRaw = file_get_contents($rootDirectory . 'assets.json');
        $json = json_decode($jsonRaw, true);
        if (!isset($json[$scriptName]['js'])) {
            throw new \Exception('Script file not found among assets.');
        }
        return $json[$scriptName]['js'];
    }

}
