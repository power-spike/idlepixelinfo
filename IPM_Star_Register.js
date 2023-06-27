
const starContainerColumn = `
  display:flex;
  flex-direction:column;
  color: white;
  width:256px;
  `
const starsData = {};

starsData.ore = {};
starsData.bar = {};
starsData.item = {};


// THis will Load the saved data from local storage
var SavedData = localStorage.getItem("SavedData");
if (SavedData !== null) {
  savedStarData = JSON.parse(SavedData);
  for (const [key, value] of Object.entries(savedStarData)) {
    for (const [key2, value2] of Object.entries(value)) {
      starsData[key][key2] = value2;
    }
  }
}


function saveStarData() {
  localStorage.setItem("SavedData", JSON.stringify(starsData));
}


// Templates for the buildStarColumns function (copy of buildColumns function)- to let us Create More Advanced Elements - also Faster :)
const itemTemplate = '<div style="display: flex; place-content: center; align-items: center;"><span style="display: inline-block;">{img}</span><span style="display: inline-block; padding-left: 10px; padding-right: 5px;">{increase} <input type="text"  maxlength="4" size="4" value="{amount}" class="js-{type}-{name}" /> {decrease}</span></div>';
const increaseTemplate = '<span class="js-increase-stars" style="cursor: pointer; font-size: 18px; font-weight: bold;" data-type="{type}" data-name="{name}">+</span>';
const decreaseTemplate = '<span class="js-decrease-stars" style="cursor: pointer; font-size: 18px; font-weight: bold;" data-type="{type}" data-name="{name}">-</span>';
const imageTemplate = '<img src="{src}" style="width: {imgSize}; height: {imgSize}; border: white 1px solid; display: block;" />';






function buildStars() {
  let imgSize = 35;
  let textSize = 18;
  let tabInfos = document.createElement("div")
  right.appendChild(tabInfos)
  tabInfos.setAttribute("id","tabInfos")
  tabInfos.innerHTML = `This is the Star Tracker for your Game World`
  tabInfos.style = textStyle
  tabInfos.style.fontSize = textSize + "px"
  tabInfos.style.height = textSize + "px"
  tabInfos.style.marginLeft = textSize + "px"
  tabInfos.style.marginBottom = 70 + "px"
  tabInfos.style.color = "rgb(200,100,255)"



//region Column Row Setup

  let itemsContainer = document.createElement("div")
  itemsContainer.style = containerRow
  itemsContainer.style.textAlign = "center"
  right.appendChild(itemsContainer)



  let oresColumn = document.createElement("div")
  oresColumn.style = starContainerColumn
  oresColumn.setAttribute("id", "oresColumn")
  itemsContainer.appendChild(oresColumn)

  let barsColumn = document.createElement("div")
  barsColumn.style = starContainerColumn
  barsColumn.setAttribute("id","barsColumn")
  itemsContainer.appendChild(barsColumn)

  let itemsColumn = document.createElement("div")
  itemsColumn.style = starContainerColumn
  itemsColumn.setAttribute("id","itemsColumn")
  itemsContainer.appendChild(itemsColumn)


  let itemDisplay = document.createElement("div")
  itemDisplay.setAttribute("id","itemDisplay")
  itemsContainer.appendChild(itemDisplay)



  let itemDisplayTop = document.createElement("div")
  itemDisplayTop.setAttribute("id","itemDisplayTop")
  itemDisplay.appendChild(itemDisplayTop)

  let itemDisplayMiddle = document.createElement("div")
  itemDisplayMiddle.setAttribute("id","itemDisplayMiddle")
  itemDisplay.appendChild(itemDisplayMiddle)

  let itemDisplayBottom = document.createElement("div")
  itemDisplayBottom.setAttribute("id","itemDisplayBottom")
  itemDisplay.appendChild(itemDisplayBottom)
//endregion


  /**
   * Will Increase the Stars of a given type and name
   * @param type
   * @param name
   */
  function increaseStars(type, name) {
    console.log('Increase Stars', type, name);
    if (starsData[type][name] === undefined) {
      starsData[type][name] = 1;
    } else {
      starsData[type][name]++;
    }

    let selector = '.js-' + type + '-' + fixName(name);
    document.querySelector(selector).value++;
    saveStarData();
  }

  /**
   * Will Decrease the Stars of a given type and name
   * @param type
   * @param name
   */
  function decreaseStars(type, name) {

    console.log('Increase Stars', type, name);
    if (starsData[type][name] === undefined) {
      starsData[type][name] = 0;
    } else {
      if (starsData[type][name] > 0) {
        starsData[type][name]--;
      }
    }

    let selector = '.js-' + type + '-' + fixName(name);
    if (document.querySelector(selector).value > 0) {
      document.querySelector(selector).value--;
    }
    saveStarData();
  }



  // Called when the Document is loaded - will run the anonymous function
  docReady(() => {
    console.log('DOM Content Loaded');
    // this will attach to any element that has the class "js-increase-stars"
    document.querySelectorAll('.js-increase-stars').forEach(function(element) {
      element.addEventListener('click', function(event) {
        let target = event.target;
        console.log('target', target);
        let type = target.getAttribute('data-type');
        let name = target.getAttribute('data-name');
        increaseStars(type, name);
      });
    });

    // this will attach to any element that has the class "js-decrease-stars"
    document.querySelectorAll('.js-decrease-stars').forEach(function(element) {
      element.addEventListener('click', function(event) {
        let target = event.target;
        console.log('target', target);
        let type = target.getAttribute('data-type');
        let name = target.getAttribute('data-name');
        decreaseStars(type, name);
      });
    });
  });

  // Vanilla JS Document Ready
  function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }


  /**
   * This function replace spaces with hyphens
   * @param name
   * @returns {string}
   */
  function fixName(name) {
    return name.toLowerCase().replace(/ /g, "-");
  };


  function buildStarColumns(arraySource, targetTable, itemDisplayTop, itemDisplayMiddle, imgSize, cellCount){

    // Set Defaults So we don't have to specify them for the function call
    if (cellCount < 1)
    {
      cellCount = 2
    }
    if (imgSize < 1)
    {
      imgSize = 32
    }
    // end set Defaults
    let tr = document.createElement("tr")
    targetTable.appendChild(tr)
    let td = undefined

    let itemCount = 0

    arraySource.forEach((item)=>{
      // console.log(item);
      // item.type = ore / bar / item
      itemCount += 1
      td = document.createElement("td")
      tr.appendChild(td)

      // Setup Templates
      let currentImage = imageTemplate.replace("{src}", item.img).replace("{imgSize}", imgSize);
      let currentIncrease = increaseTemplate.replace("{type}", item.type).replace("{name}", item.label);
      let currentDecrease = decreaseTemplate.replace("{type}", item.type).replace("{name}", item.label);
      let currentAmount;

      // console.group("Item Load");
      // console.log('[item.type]', item.type);
      // console.log('[item.label]', item.label);
      // console.log('starsData[item.type]', starsData[item.type]);
      // console.log('starsData[item.type][item.label]', starsData[item.type][item.label]);
      // console.groupEnd();

      if (starsData[item.type] === undefined || starsData[item.type][item.label] === undefined) {
        if (starsData[item.type] === undefined) {
          starsData[item.type] = {};
        }
        currentAmount = starsData[item.type][item.label] = 0;
      } else {
        currentAmount = starsData[item.type][item.label];
      }


      // console.log('item', item);
      // baseSellValue { value, unit }
      let currentItem = itemTemplate
          .replace("{type}", item.type)
          .replace("{name}", fixName(item.label))
          .replace("{decrease}", currentDecrease)
          .replace("{img}", currentImage)
          .replace("{increase}", currentIncrease)
          .replace("{amount}", currentAmount);

      td.innerHTML = currentItem;

      if (itemCount === cellCount) {
        itemCount = 0
        tr = document.createElement("tr")
        targetTable.appendChild(tr)
      }

      td.addEventListener("mouseover",()=>{
        cleanParent(itemDisplayTop)

        let thisContainer = document.createElement("div")
        thisContainer.style = containerStyle
        thisContainer.style.textAlign = "left"
        thisContainer.style.marginLeft = 20 + "px"
        thisContainer.style.width = 300 + "px"
        itemDisplayTop.appendChild(thisContainer)

        img = new Image (40,40)
        img.src = item.img
        img.style.display = "block"
        img.style = textStyle
        thisContainer.appendChild(img)

        let mydiv = document.createElement("div")
        mydiv.style = textStyle
        thisContainer.appendChild(mydiv)
        mydiv.innerHTML = "Name : "+item.label

        if(item.foundOnPlanets.length>0){
          mydiv = document.createElement("div")
          mydiv.style = textStyle
          thisContainer.appendChild(mydiv)
          mydiv.innerHTML = "Found on Planet(s) : <br>"
          for (i=0;i<item.foundOnPlanets.length;i++){
            if (i===4 && item.foundOnPlanets.length > 4){
              mydiv.innerHTML += "<br>"
            }
            mydiv.innerHTML += item.foundOnPlanets[i] + " - "
          }
          mydiv.innerHTML = mydiv.innerHTML.slice(0,mydiv.innerHTML.length-2)
        }

        mydiv = document.createElement("div")
        mydiv.style = textStyle
        thisContainer.appendChild(mydiv)
        mydiv.innerHTML = "Unlock Cost : "+item.unlockCost
        if(item.type === "ore")
        {mydiv.innerHTML += " (" + item.foundOnPlanets[0] + ")"}

        if (item.type !== "ore"){
          mydiv = document.createElement("div")
          mydiv.style = textStyle
          thisContainer.appendChild(mydiv)

          let msg = "Base Smelt/Craft Time : "
          if (item.baseCraftTime.hr > 0) {msg+= item.baseCraftTime.hr+"h "}
          if (item.baseCraftTime.mn > 0) {msg+= item.baseCraftTime.mn+"m "}
          msg+= item.baseCraftTime.sc+"s"
          mydiv.innerHTML = msg

          mydiv = document.createElement("div")
          mydiv.style = textStyle
          thisContainer.appendChild(mydiv)
          mydiv.innerHTML = "Required materials to Smelt/Craft :<br>(base => min. values)"
          mydiv.style.borderBottom = "blue solid 3px"

          for (i=0;i<item.ingredients.length;i++){

            let thisDiv = document.createElement("div")
            thisContainer.appendChild(thisDiv)
            thisDiv.style = containerRow

            img = new Image(30,30)
            img.src = "./IPM Components/"+item.ingredients[i].label+".jpg"
            img.style = textStyle
            thisDiv.appendChild(img)

            mydiv = document.createElement("div")
            mydiv.style = textStyle
            thisDiv.appendChild(mydiv)
            mydiv.innerHTML =
                item.ingredients[i].amount + " => " + item.ingredients[i].min + " " + item.ingredients[i].label
          }
          mydiv = document.createElement("div")
          thisContainer.appendChild(mydiv)
          mydiv.style.borderTop = "blue solid 3px"
        }

        mydiv = document.createElement("div")
        mydiv.style = textStyle
        thisContainer.appendChild(mydiv)
        thisContainer.style.height = 400 + "px"
        mydiv.innerHTML = item.baseSellValue.unit === "" ?
            "Base Sell Value : $ "+item.baseSellValue.value :
            "Base Sell Value : $ "+item.baseSellValue.value + " " + item.baseSellValue.unit
      })

      td.addEventListener("click",function(){setCrafting(item,tabInfos)})
    })}


  let oresTable = document.createElement("table")
  oresColumn.innerHTML = "Ores"
  oresColumn.appendChild(oresTable)
  let barsTable = document.createElement("table")
  barsColumn.innerHTML = "Bars"
  barsColumn.appendChild(barsTable)
  let itemsTable = document.createElement("table")
  itemsColumn.innerHTML = "Items"
  itemsColumn.appendChild(itemsTable)
  let imgSizeStars = 64
  buildStarColumns(oresArray,  oresTable,  itemDisplayTop, itemDisplayMiddle, imgSizeStars, 1)
  buildStarColumns(barsArray,  barsTable,  itemDisplayTop, itemDisplayMiddle, imgSizeStars, 1)
  buildStarColumns(itemsArray, itemsTable, itemDisplayTop, itemDisplayMiddle, imgSizeStars, 1)

  oresArray.forEach(function(ore) {

  })
}
