const colorInput = document.getElementById('input-color')
const colorBtn = document.getElementById('get-scheme')
const schemeEl = document.getElementById("scheme-options")
const mainHtml = document.getElementById('color-stripes')
const hexHtml = document.getElementById('hex-names')
const darkModeBtn= document.getElementById("dark-mode")
const headerCont = document.getElementById('header-cont')
const darkMode = document.querySelector('.drkmode-container')
let colorsName = ["#000000","#1B1B1B","#323232","#514649","#676767"]

// BUTTON EVENT LISTENERS

colorBtn.addEventListener('click', fillColor)

darkModeBtn.addEventListener("click", ()=>{
    darkModeBtn.innerText = darkModeBtn.innerText ==="Dark mode" ? "Light mode" : "Dark mode"
    const elements = [headerCont, darkMode, hexHtml, schemeEl, colorBtn, darkModeBtn];
    
    for (element of elements){
        if (darkModeBtn.innerText==="Light mode") {
      element.classList.add('dark');
      if (element === schemeEl || darkModeBtn) {
        element.classList.add('dark-text');
      }
    } else {
      element.classList.remove('dark');
      if (element === schemeEl || darkModeBtn) {
        element.classList.remove('dark-text');
      }
    }
  }
    for(let i=1; i<=5 ; i++){
            let colEl = document.getElementById(`name${i}`).innerText
            colorsName.push(colEl)
        }
        mainHtml.innerHTML =""
        hexHtml.innerHTML = ""   
        feedColor() 
})

document.addEventListener("click", (e)=>{
    const validIds = ["color1", "color2", "color3", "color4", "color5"]
    
  if (validIds.includes(e.target.id)) {
      e.target.style.cursor ='wait'
      setTimeout(()=>{
        let colorHex = document.getElementById(`name${e.target.id.slice(5,6)}`) 
        let realColor = colorHex.innerText
        navigator.clipboard.writeText(realColor)
        e.target.style.cursor ='default'
      },100)
      
  }
})


// MAIN FUNCTIONS

function fillColor(){
    let colorValue = colorInput.value.substring(1)
    let schemeValue = schemeEl.value
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorValue}&mode=${schemeValue}&count=5`)
    .then(res => res.json())
    .then(data => {
        const infArr = data.colors
        for (info of infArr){ 
           colorsName.push(info.name.closest_named_hex)
        }  
        mainHtml.innerHTML =""
        hexHtml.innerHTML = ""    
        feedColor() 
       
   })
}

function feedColor(){
    for(name of colorsName){
        let indexColor = colorsName.indexOf(name)+1
    mainHtml.innerHTML += `
    <div id="color${indexColor}" class="colors-cont">
    </div>
    `
    document.getElementById(`color${indexColor}`).style.backgroundColor = name
    hexHtml.innerHTML += `
    <div class="color-names">
        <h1 id="name${indexColor}" class="${darkModeBtn.innerText==="Light mode" ? "dark-text" : ""}">${name}</h1>
    </div>` 
  }
  colorsName=[]
}

// INITIAL FUNCTION CALL TO POPULATE THE APP
feedColor()