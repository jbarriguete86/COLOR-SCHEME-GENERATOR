
const colorInput = document.getElementById('input-color')
const colorBtn = document.getElementById('get-scheme')
const schemeEl = document.getElementById("scheme-options")
const mainHtml = document.getElementById('color-stripes')
const hexHtml = document.getElementById('hex-names')
const darkModeBtn= document.getElementById("dark-mode")


colorBtn.addEventListener('click', ()=>{
    let colorValue = colorInput.value.substring(1)
    let schemeValue = schemeEl.value
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorValue}&mode=${schemeValue}&count=5`)
    .then(res => res.json())
    .then(data => {
        const infArr = data.colors
        let colorArr =[]
        for (info of infArr){
           colorArr.push(info.name)  
        }       
    console.log(colorArr)
   })})
    


darkModeBtn.addEventListener("click", ()=>{
    alert("you've clicked this button")
})
