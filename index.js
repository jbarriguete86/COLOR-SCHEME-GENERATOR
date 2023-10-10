const colorInput = document.getElementById('input-color')
const colorBtn = document.getElementById('get-scheme')
const schemeEl = document.getElementById("scheme-options")
const mainHtml = document.getElementById('color-stripes')
const hexHtml = document.getElementById('hex-names')
const darkModeBtn= document.getElementById("dark-mode")
let colorsName = ["#000000","#1B1B1B","#323232","#514649","#676767"]

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
        <h1 id="name${indexColor}">${name}</h1>
    </div>` 
  }
  colorsName=[]
}

colorBtn.addEventListener('click', ()=>{
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
    
})})
    


darkModeBtn.addEventListener("click", ()=>{
    alert("you've clicked this button")
})


feedColor()