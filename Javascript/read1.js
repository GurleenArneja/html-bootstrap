<<<<<<< HEAD
var fs = require("fs"),
    readline = require('readline'),
    cases=[],
    flag=false,
    caseType,yearIndex,desc;
var rl = readline.createInterface({
  input: fs.createReadStream('Crimes_-_2001_to_present.csv')
});
rl.on('line', (line) => {
  var lines=line.toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  lines=lines||[];
  for(var i=0;i<lines.length;i++){
      if(lines[i]=="Primary Type"){
      caseType=i;
    }else if(lines[i]=="Year"){
      yearIndex=i;
    }
    else if(lines[i]=="Description"){
      desc=i;
    }
    }
    if(lines[caseType].toUpperCase()=="CRIMINAL DAMAGE"){
        if(lines[yearIndex]>=2001 || lines[yearIndex]<=2016){
          if(lines[desc]==="TO PROPERTY"){
            for(var i in cases){
              if(cases[i]["year"]===lines[yearIndex]){
                cases[i]["criminalDamageCount"]+=1;
                flag=true;
                break;
              }}
            if(flag==false){
              cases.push({year:lines[yearIndex],criminalDamageCount:1,vehicleCount:0,stateSupCount:0});
            }
            flag=false;
          }
          else if(lines[desc]==="TO VEHICLE"){
            for(var i in cases){
              if(cases[i]["year"]===lines[yearIndex]){
                cases[i]["vehicleCount"]+=1;
                flag=true;
                break;
              }}
            if(flag==false){
              cases.push({year:lines[yearIndex],criminalDamageCount:0,vehicleCount:1,stateSupCount:0});
            }
            flag=false;
          }
          else if(lines[desc]==="TO STATE SUP PROP"){
            for(var i in cases){
              if(cases[i]["year"]===lines[yearIndex]){
                cases[i]["stateSupCount"]+=1;
                flag=true;
                break;
              }}
            if(flag==false){
              cases.push({year:lines[yearIndex],criminalDamageCount:0,vehicleCount:0,stateSupCount:1});
            }
            flag=false;
          }
        }
      }
});
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
  fs.writeFile('CriminalDamage.json', JSON.stringify(cases, null, 2), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + 'CriminalDamage.json');
      }
  });
});
=======
var fs = require("fs"),
    readline = require('readline'),
    cases=[],
    flag=false,
    caseType,yearIndex,desc;
var rl = readline.createInterface({
  input: fs.createReadStream('Crimes_-_2001_to_present.csv')
});
rl.on('line', (line) => {
  var lines=line.toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  lines=lines||[];
  for(var i=0;i<lines.length;i++){
      if(lines[i]=="Primary Type"){
      caseType=i;
    }else if(lines[i]=="Year"){
      yearIndex=i;
    }
    else if(lines[i]=="Description"){
      desc=i;
    }
    }
    if(lines[caseType].toUpperCase()=="CRIMINAL DAMAGE"){
        if(lines[yearIndex]>=2001 || lines[yearIndex]<=2016){
          if(lines[desc]==="TO PROPERTY"){
            for(var i in cases){
              if(cases[i]["year"]===lines[yearIndex]){
                cases[i]["criminalDamageCount"]+=1;
                flag=true;
                break;
              }}
            if(flag==false){
              cases.push({year:lines[yearIndex],criminalDamageCount:1,vehicleCount:0,stateSupCount:0});
            }
            flag=false;
          }
          else if(lines[desc]==="TO VEHICLE"){
            for(var i in cases){
              if(cases[i]["year"]===lines[yearIndex]){
                cases[i]["vehicleCount"]+=1;
                flag=true;
                break;
              }}
            if(flag==false){
              cases.push({year:lines[yearIndex],criminalDamageCount:0,vehicleCount:1,stateSupCount:0});
            }
            flag=false;
          }
          else if(lines[desc]==="TO STATE SUP PROP"){
            for(var i in cases){
              if(cases[i]["year"]===lines[yearIndex]){
                cases[i]["stateSupCount"]+=1;
                flag=true;
                break;
              }}
            if(flag==false){
              cases.push({year:lines[yearIndex],criminalDamageCount:0,vehicleCount:0,stateSupCount:1});
            }
            flag=false;
          }
        }
      }
});
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
  fs.writeFile('CriminalDamage.json', JSON.stringify(cases, null, 2), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + 'CriminalDamage.json');
      }
  });
});
>>>>>>> 3531bcbd7eda54dfc7102d5bc0f1b79c21fd67ee
