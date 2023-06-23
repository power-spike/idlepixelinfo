

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
  tabInfos.style.color = "rgb(0,212,250)"

  let itemsContainer = document.createElement("div")
  itemsContainer.style = containerRow
  itemsContainer.style.textAlign = "center"
  right.appendChild(itemsContainer)



  let oresColumn = document.createElement("div")
  oresColumn.style = containerColumn
  oresColumn.setAttribute("id", "oresColumn")
  itemsContainer.appendChild(oresColumn)

  let barsColumn = document.createElement("div")
  barsColumn.style = containerColumn
  barsColumn.setAttribute("id","barsColumn")
  itemsContainer.appendChild(barsColumn)

  let itemsColumn = document.createElement("div")
  itemsColumn.style = containerColumn
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
  buildColumns(oresArray,  oresTable,  itemDisplayTop, itemDisplayMiddle, imgSizeStars, 1)
  buildColumns(barsArray,  barsTable,  itemDisplayTop, itemDisplayMiddle, imgSizeStars, 1)
  buildColumns(itemsArray, itemsTable, itemDisplayTop, itemDisplayMiddle, imgSizeStars, 1)

  oresArray.forEach(function(ore) {

  })
}
