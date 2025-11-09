const accesskey = "nMaZk-aPZ5_0RLM6BK3IvJd3hR7NF5usPUqJm_vlsSM"
let showmorebtn = document.querySelector("#showmorebtn")
let searchbtn = document.querySelector("#searchbtn")
let inputbox = document.querySelector("#input-box")
let form = document.querySelector("form")
let searchresult = document.querySelector(".showresults")

let inputdata;
let page = 1
async function searchimages(){
    inputdata = inputbox.value
    console.log("input is",inputdata)
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`
    console.log(url)
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    if(page > 2){
        searchresult.innerHTML = ""
    }
    const results = data.results
    console.log(results)

    results.map((result)=> {
        const imagewrapper = document.createElement("div")
        imagewrapper.classList.add("showresults")
        const img = document.createElement("img")
        img.src = result.urls.small
        img.alt = result.alt_description
        const imglink = document.createElement("a")
        imglink.href = result.links.html
        imglink.target = "_black"
        imglink.textContent = result.alt_description

        imagewrapper.appendChild(img)
        imagewrapper.appendChild(imglink)
        searchresult.appendChild(imagewrapper)

    })
    if(page > 1){
        showmorebtn.style.display = "block"
        console.log(page)
    }
}
form.addEventListener("submit", (event)=> {
    event.preventDefault()
    console.log("submited")
    page++
    searchimages()
})
showmorebtn.addEventListener("click",()=> {
    page++
    searchimages()
})