<?php
header('Content-type: application/json');

$RATINGS_PER_MOVIE = 90;

$mongo   = new MongoClient();
$reduce  =<<<REDUCE
function(doc,resObj)
{
  var latestRatings = doc.ratings.slice(-{$RATINGS_PER_MOVIE})
      ,months       = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      ;

  for(i = 0;i < latestRatings.length;i++)
  {
    var d        = latestRatings[i].timestamp
        ,hours   = d.getHours()
        ,minutes = d.getMinutes()
        ;

    resObj.ratings.push(
      {
        rating:latestRatings[i].rating
        ,date:months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear()
        ,time:(hours % 12 == 0 ? 12 : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes)
        ,timePeriod:hours < 12 ? 'AM' : 'PM'
      }
    );
  }
}
REDUCE;

$updates = $mongo->cinegram->movies->group(
  Array('_id' => 1)
  ,Array('ratings' => Array())
  ,$reduce
);

echo json_encode($updates['retval']);
?>
