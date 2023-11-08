let addToy = false;
let form = document.querySelector(".add-toy-form")



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});




function getAllToys(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => renderOneToy(toy)))
}

 form.addEventListener("submit",(e)=>{
  e.preventDefault()
  handleSubmit(e)
  form.reset()
})


function handleSubmit(e){
  let toyObject = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes:0,
    id:e.target.id.value
  }
  newToy(toyObject)

}

function renderOneToy(toy){
    likesCount = toy.likes
    let card = document.createElement("div")
    let likeBtn = document.createElement("button")
    likeBtn.addEventListener("click",(e)=>{
    let payload = {
      id: e.target.id,
      likes: toy.likes+=1
    }
    updateLikes(payload)

    })
    likeBtn.id = `${toy.id}`
    likeBtn.textContent = "Like ❤️"
    card.className = "card"
    card.innerHTML = `
    
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes}</p>
  
    `
    card.appendChild(likeBtn)
    document.querySelector("#toy-collection").appendChild(card)
}


function newToy(toyObject){
  fetch("http://localhost:3000/toys",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(toyObject)
  })
  .then(res=>res.json())
  .then(toy=>renderOneToy(toy))
}

function updateLikes(toyObject){
  fetch(`http://localhost:3000/toys/${toyObject.id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(toyObject)
  })
  .then(res=>res.json())
  .then(toy=>updateCardByID(toy))
}

function updateCardByID(toy){
 let tar = document.getElementById(toy.id)
 tar.parentNode.querySelector("p").textContent = toy.likes;
}

function start(){
  getAllToys()
}

start()