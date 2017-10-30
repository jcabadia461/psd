<style>
input{
<<<<<<< HEAD
    padding:20px;
=======
    padding:5px;
>>>>>>> develop
}

input[type="submit"]{
    background: #db2b36;
    color: white;
    border: 0;
    border-radius: 10px;
}

body{
    background:#333;
    color:white;
    font-family:Arial;
}
</style>

<?php


if($_GET['hacer']){
	$texto = 
'<?php
    header("Content-Type: text/event-stream");
    header("Cache-Control: no-cache");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Origin: *");
$valor = "' . $_GET['hacer'] . '";
echo "data: " . $valor . "\n\n";
    flush();
?>';

$filename=dirname(__FILE__) . "/es.php";
$mystring = $texto; 

if (($fh = @fopen($filename, "w")) !== false)
{
    if (@fwrite($fh, $mystring) === false)
    {
        die(sprintf("Unable to write to file: %s!", $filename));
    }else{
	}
    fclose($fh);
}
else
{
    die(sprintf("Could not open file %s for writing!", $filename));
}  
}

?>
<form method='get' action=''>
	<p>
		<select name='hacer'>
			<option value='k'>Do nothing</option>
			<option value='1'>Launch ad</option>
			<option value='2'>Pause player</option>
			<option value='3'>Play player</option>
		</select>
		<input type='submit' value='Run!'/>
	</p>
</form>
