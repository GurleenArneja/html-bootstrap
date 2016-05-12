var fs = require("fs"),
    readline = require('readline'),
    CountryCont=[],
    lifeExpect=[],
    deathBirthRate=[],
    birthTotal=[],
    top5=[],
    flag=false,
    lineCounter=true,
    totalCount=0,
    continentIndex,countryIndex,indicatorIndex,valueIndex;

    var rl1 = readline.createInterface({
        input: fs.createReadStream("countries.csv")
    });

    rl1.on('line', (line)=> {
        var lines=line.toString().split(";");
        for(var i=0;i<lines.length;i++){
          lines[i]=lines[i].replace(/['"]+/g,"");
        }
        if(lineCounter==true){
        for(var i=0;i<lines.length;i++){
          if(lines[i]=="Country (en)"){
            countryIndex=i;
          }
          else if(lines[i]=="Continent"){
            continentIndex=i;
          }
        }
      }
        countryToContinent(lines);
    })
    rl1.on('close',function(){
      var rl2 = readline.createInterface({
          input: fs.createReadStream( "Indicators.csv")
      });
      rl2.on('line', (line)=> {
        var lines=line.toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          lines=lines||[];
          for(var i=0;i<lines.length;i++){
            lines[i]=lines[i].replace(/['"]+/g,"");
          }
          if(lineCounter==true){
          for(var i=0;i<lines.length;i++){
              if(lines[i]=="IndicatorCode"){
              indicatorIndex=i;
            }else if(lines[i]=="Year"){
              yearIndex=i;
            }
            else if(lines[i]=="CountryName"){
              countryIndex=i;
            }
            else if(lines[i]=="Value"){
              valueIndex=i;
            }
            lineCounter=false;
          }
        }
        lifeExpectancy(lines);
        indiaRate(lines);
        topCountries(lines);
      });
      rl2.on('close',function(){

       fs.writeFile('LifeExpectancy.json', JSON.stringify(lifeExpect, null, 2), function(err) {
           if(err) {
             console.log(err);
           } else {
             console.log("JSON saved to " + 'LifeExpectancy.json');
           }
       });
       fs.writeFile('IndiaDeathBirthRate.json',JSON.stringify(deathBirthRate, null, 2), function(err) {
           if(err) {
             console.log(err);
           } else {
             console.log("JSON saved to " + 'IndiaDeathBirthRate.json');
           }
       });
       sorting(birthTotal,'value')
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
       top5=birthTotal.slice(0,5);
       console.log(top5);
       fs.writeFile('Top5Countries.json',JSON.stringify(top5,null, 2),function(err){
         if(err) {
           console.log(err);
         } else {
           console.log("JSON saved to " + 'Top5Countries.json');
         }
       });
     });
    });
function countryToContinent(lines){
  if(lines[continentIndex]==="Asia"){
    CountryCont.push({country:lines[countryIndex]});
  }
}

function lifeExpectancy(lines){
  if(lines[indicatorIndex]==="SP.DYN.LE00.FE.IN"){
    for(var i in CountryCont){
    if(lines[countryIndex]===CountryCont[i]["country"]){
      if(lines[yearIndex]>=1960 || lines[yearIndex]<=2015){
        for(var j in lifeExpect){
          if(lifeExpect[j]["country"]===lines[countryIndex]){
            lifeExpect[j]["FLifeExpectancy"]=parseFloat(lifeExpect[j]["FLifeExpectancy"])+parseFloat(lines[valueIndex]);
            flag=true;
            break;
          }
        }
        if(flag==false){
          lifeExpect.push({country:lines[countryIndex],FLifeExpectancy:lines[valueIndex],MLifeExpectancy:0});
        }
        flag=false;
      }
    }
  }
}
else if(lines[indicatorIndex]==="SP.DYN.LE00.MA.IN"){
  for(var i in CountryCont){
  if(lines[countryIndex]===CountryCont[i]["country"]){
    if(lines[yearIndex]>=1960 || lines[yearIndex]<=2015){
      for(var j in lifeExpect){
        if(lifeExpect[j]["country"]===lines[countryIndex]){
          lifeExpect[j]["MLifeExpectancy"]=parseFloat(lifeExpect[j]["MLifeExpectancy"])+parseFloat(lines[valueIndex]);
          flag=true;
          break;
        }
      }
      if(flag==false){
        lifeExpect.push({country:lines[countryIndex],FLifeExpectancy:0,MLifeExpectancy:lines[valueIndex]});
      }
      flag=false;
    }
  }
}
}
}

function indiaRate(lines){
  if(lines[countryIndex]==="India"){
  if(lines[indicatorIndex]==="SP.DYN.CBRT.IN"){
    if(lines[yearIndex]>=1960 || lines[yearIndex]<=2015){
      for(var i in deathBirthRate){
        if(deathBirthRate[i]["year"]===lines[yearIndex]){
          deathBirthRate[i]["birthRate"]=lines[valueIndex];
          flag=true;
          break;
        }
      }
      if(flag==false){
          deathBirthRate.push({year:lines[yearIndex],brithRate:lines[valueIndex],deathRate:0});
      }
      flag=false;
    }
  }
  else if(lines[indicatorIndex]==="SP.DYN.CDRT.IN"){
    if(lines[yearIndex]>=1960 || lines[yearIndex]<=2015){
      for(var i in deathBirthRate){
        if(deathBirthRate[i]["year"]===lines[yearIndex]){
          deathBirthRate[i]["deathRate"]=lines[valueIndex];
          flag=true;
          break;
        }
      }
      if(flag==false){
          deathBirthRate.push({year:lines[yearIndex],brithRate:0,deathRate:lines[valueIndex]});
      }
      flag=false;
    }
  }
  }
}

function topCountries(lines){
  if(lines[indicatorIndex]==="SP.DYN.LE00.IN"){
    if(lines[yearIndex]>=1960 || lines[yearIndex]<=2015){
      for(var i in birthTotal){
        if(birthTotal[i]["country"]===lines[countryIndex]){
          birthTotal[i]["value"]=parseFloat(birthTotal[i]["value"])+parseFloat(lines[valueIndex]);
          flag=true;
          break;
        }
      }
      if(flag==false){
        birthTotal.push({country:lines[countryIndex],value:parseFloat(lines[valueIndex])});
      }
      flag=false;
    }
  }
}
