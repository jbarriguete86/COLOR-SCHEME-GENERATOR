const mainHtml = document.getElementById('color-main')
const colorDiv = document.getElementById('color-stripes')
const colorInput = document.getElementById('input-color')
const colorBtn = document.getElementById('get-scheme')
const schemeEl = document.getElementById("scheme-options")
const darkModeBtn= document.getElementById("dark-mode")
const headerCont = document.getElementById('header-cont')
const darkMode = document.querySelector('.drkmode-container')
let colorsArray = []

// BUTTON EVENT LISTENERS

colorBtn.addEventListener('click', fetchData)

darkModeBtn.addEventListener("click", ()=>{
    darkModeBtn.innerText = darkModeBtn.innerText ==="Dark mode" ? "Light mode" : "Dark mode"
    if (darkModeBtn.innerText==="Light mode") {
            document.body.style.backgroundColor = 'black'
            document.querySelectorAll('.color-hex').forEach(hex =>{
                hex.classList.add('dark-text')
            })} else {
                document.body.style.backgroundColor = 'white'
            document.querySelectorAll('.color-hex').forEach(hex =>{
                hex.classList.remove('dark-text')
            })
            }
    const elements = [headerCont, darkMode, schemeEl, colorBtn, darkModeBtn];
    elements.map(element =>{
        if (darkModeBtn.innerText==="Light mode") {
            if(element === headerCont || darkMode){
            element.classList.add('dark')}
            if (element === schemeEl || darkModeBtn) {
            element.classList.add('dark-btn');
            }
        } else{
            element.classList.remove('dark');
            if (element === schemeEl || darkModeBtn) {
            element.classList.remove('dark-btn');
            } 
        }
        })
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

function fetchData(){
    let colorValue = colorInput.value.substring(1)
    let schemeValue = schemeEl.value
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorValue}&mode=${schemeValue}&count=5`)
    .then(res => res.json())
    .then(data => {
        const infArr = data.colors
        for (info of infArr){ 
           colorsArray.push(info.name.closest_named_hex)
        }  
        mainHtml.innerHTML =""   
        for(name of colorsArray){
        let indexColor = colorsArray.indexOf(name)+1
    mainHtml.innerHTML += `
    <div class="color-div"><span id="color${indexColor}" class="colors-cont"></span>
    <p class="color-hex ${darkModeBtn.innerText==="Light mode" ? "dark-text" : ""}">${name}</p>
    </div>
    `
    document.getElementById(`color${indexColor}`).style.backgroundColor = name
  }
  colorsArray=[] 
       
   })
}

// INITIAL FUNCTION CALL TO POPULATE THE APP
fetchData()