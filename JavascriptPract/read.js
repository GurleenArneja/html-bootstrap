var fs = require("fs"),
    readline = require('readline'),
    cases=[],
    flag=false,
    caseType,yearIndex;
var rl = readline.createInterface({
  input: fs.createReadStream('Crimes_-_2001_to_present.csv')
});
rl.on('line', (line) => {
  var lines=line.toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  lines=lines||[];
  aggregatedCases(lines);

});
function aggregatedCases(lines){
  for(var i=0;i<lines.length;i++){
      if(lines[i]=="Primary Type"){
      caseType=i;
    }else if(lines[i]=="Year"){
      yearIndex=i;
    }
    }
    if(lines[caseType].toUpperCase()=="ROBBERY"){
      if(lines[yearIndex]>=2001 || lines[yearIndex]<=2016){
        for(var i in cases){
          if(cases[i]["year"]===lines[yearIndex]){
            cases[i]["robberyCount"]+=1;
            flag=true;
            break;
          }}
        if(flag==false){
          cases.push({year:lines[yearIndex],robberyCount:1,burglaryCount:0});
        }
        flag=false;
      }
    }
    else if (lines[caseType].toUpperCase()=="BURGLARY") {
      if(lines[yearIndex]>=2001 || lines[yearIndex]<=2016){
        for(var i in cases){
          if(cases[i]["year"]===lines[yearIndex]){
            cases[i]["burglaryCount"]+=1;
            flag=true;
            break;
          }}
        if(flag==false){
          cases.push({year:lines[yearIndex],robberyCount:0,burglaryCount:1});
        }
        flag=false;
      }
    }

}

function
rl.on('close',function(){
  sorting(cases,'year')
  function sorting(a, par)
   {
   var swapped;
   do {
     swapped = false;
     for (var i = 0; i < a.length - 1; i++) {
         if (a[i][par] > a[i + 1][par]) {
             var temp = a[i];
             a[i] = a[i + 1];
             a[i + 1] = temp;
             swapped = true;
         }
     }
   } while (swapped);
 }
  fs.writeFile('AggregatedCases.json', JSON.stringify(cases, null, 2), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + 'AggregatedCases.json');
      }
  });
});
