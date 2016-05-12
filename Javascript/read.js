<<<<<<< HEAD
var fs = require("fs"),
    readline = require('readline'),
    cases=[],
    criminalCases=[],
    robberyCases=[],
    robbCases=[],
    flag=false,
    lineCounter=true,
    totalCount=0,
    caseType,yearIndex,desc,robberyType;
var rl = readline.createInterface({
  input: fs.createReadStream('Crimes_-_2001_to_present.csv')
});
rl.on('line', (line) => {
  var lines=line.toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  lines=lines||[];
  if(lineCounter==true){
  for(var i=0;i<lines.length;i++){
      if(lines[i]=="Primary Type"){
      caseType=i;
    }else if(lines[i]=="Year"){
      yearIndex=i;
    }
    else if(lines[i]=="Description"){
    desc=i;
    }
    else if(lines[i]=="IUCR"){
      robberyType=i;
    }
    lineCounter=false;
  }}
  aggregatedCases(lines);
  criminalDamage(lines);
  robbery(lines);
});
function aggregatedCases(lines){
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
function criminalDamage(lines){
  if(lines[caseType].toUpperCase()=="CRIMINAL DAMAGE"){
      if(lines[yearIndex]>=2001 || lines[yearIndex]<=2016){
        if(lines[desc]==="TO PROPERTY"){
          for(var i in criminalCases){
            if(criminalCases[i]["year"]===lines[yearIndex]){
              criminalCases[i]["criminalDamageCount"]+=1;
              flag=true;
              break;
            }}
          if(flag==false){
            criminalCases.push({year:lines[yearIndex],criminalDamageCount:1,vehicleCount:0,stateSupCount:0});
          }
          flag=false;
        }
        else if(lines[desc]==="TO VEHICLE"){
          for(var i in criminalCases){
            if(criminalCases[i]["year"]===lines[yearIndex]){
              criminalCases[i]["vehicleCount"]+=1;
              flag=true;
              break;
            }}
          if(flag==false){
            criminalCases.push({year:lines[yearIndex],criminalDamageCount:0,vehicleCount:1,stateSupCount:0});
          }
          flag=false;
        }
        else if(lines[desc]==="TO STATE SUP PROP"){
          for(var i in criminalCases){
            if(criminalCases[i]["year"]===lines[yearIndex]){
              criminalCases[i]["stateSupCount"]+=1;
              flag=true;
              break;
            }}
          if(flag==false){
            criminalCases.push({year:lines[yearIndex],criminalDamageCount:0,vehicleCount:0,stateSupCount:1});
          }
          flag=false;
        }
      }
    }
}

function robbery(lines){
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
}

rl.on('close',function(){
  sorting(cases,'year')
  sorting(criminalCases,'year')
  for(var i=0;i<robberyCases.length;i++){
    robbCases.push({case:robberyCases[i]["case"],percentage:(robberyCases[i]["count"]/totalCount)*100});
  }
  sorting(robbCases,'case')
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
  fs.writeFile('CriminalDamage.json', JSON.stringify(criminalCases, null, 2), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + 'CriminalDamage.json');
      }
  });
  fs.writeFile('Robbery.json', JSON.stringify(robbCases, null, 2), function(err) {
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
>>>>>>> 3531bcbd7eda54dfc7102d5bc0f1b79c21fd67ee
