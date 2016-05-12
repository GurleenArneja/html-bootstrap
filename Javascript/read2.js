<<<<<<< HEAD
var fs = require("fs"),
    readline = require('readline'),
    robberyCases=[],
    cases=[],
    flag=false,
    totalCount=0,
    caseType,robberyType,desc;
var rl = readline.createInterface({
  input: fs.createReadStream('Crimes_-_2001_to_present.csv')
});
rl.on('line', (line) => {
  var lines=line.toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  lines=lines||[];
  for(var i=0;i<lines.length;i++){
      if(lines[i]=="Primary Type"){
      caseType=i;
    }
    else if(lines[i]=="IUCR"){
      robberyType=i;
    }
    else if(lines[i]=="Description"){
      desc=i;
    }
  }
    if(lines[caseType].toUpperCase()=="ROBBERY"){
            for(var i in robberyCases){
              if(robberyCases[i]["Type"]===lines[robberyType]){
                robberyCases[i]["case"]=lines[desc];
                robberyCases[i]["count"]+=1;
                totalCount+=1;
                flag=true;
                break;
              }}
            if(flag==false){
              totalCount+=1;
              robberyCases.push({Type:lines[robberyType],case:lines[desc],count:1});
            }
            flag=false;
    }
});
rl.on('close',function(){
  for(var i=0;i<robberyCases.length;i++){
    cases.push({case:robberyCases[i]["case"],percentage:(robberyCases[i]["count"]/totalCount)*100});
  }
  sorting(cases,'case')
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
  fs.writeFile('Robbery.json', JSON.stringify(cases, null, 2), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + 'Robbery.json');
      }
  });
});
=======
var fs = require("fs"),
    readline = require('readline'),
    robberyCases=[],
    cases=[],
    flag=false,
    totalCount=0,
    caseType,robberyType,desc;
var rl = readline.createInterface({
  input: fs.createReadStream('Crimes_-_2001_to_present.csv')
});
rl.on('line', (line) => {
  var lines=line.toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  lines=lines||[];
  for(var i=0;i<lines.length;i++){
      if(lines[i]=="Primary Type"){
      caseType=i;
    }
    else if(lines[i]=="IUCR"){
      robberyType=i;
    }
    else if(lines[i]=="Description"){
      desc=i;
    }
  }
    if(lines[caseType].toUpperCase()=="ROBBERY"){
            for(var i in robberyCases){
              if(robberyCases[i]["Type"]===lines[robberyType]){
                robberyCases[i]["case"]=lines[desc];
                robberyCases[i]["count"]+=1;
                totalCount+=1;
                flag=true;
                break;
              }}
            if(flag==false){
              totalCount+=1;
              robberyCases.push({Type:lines[robberyType],case:lines[desc],count:1});
            }
            flag=false;
    }
});
rl.on('close',function(){
  for(var i=0;i<robberyCases.length;i++){
    cases.push({case:robberyCases[i]["case"],percentage:(robberyCases[i]["count"]/totalCount)*100});
  }
  sorting(cases,'case')
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
  fs.writeFile('Robbery.json', JSON.stringify(cases, null, 2), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + 'Robbery.json');
      }
  });
});
>>>>>>> 3531bcbd7eda54dfc7102d5bc0f1b79c21fd67ee
