const loadAllCategories = async () => {
    const res = await fetch("http://localhost:8800/dress/categories");
    const data = await res.json();

    

    // itterate array and show button on display
    const categorySection = document.getElementById("category");
    data.data.forEach((categories) => {
       const div = document.createElement("div");

       div.innerHTML = `
        
       <a onclick="loadDataCategoryById(${categories.category_id})" class="btn btn-primary">${categories.category}</a>
       `

       categorySection.appendChild(div);
    })
}



let sortData;

const loadDataCategoryById = async (id) => {
    const res = await fetch(`http://localhost:8800/dress/categories/${id}`);
    const data = await res.json();

    const videosData=data.data;
    sortData=videosData;
    displayShowData(videosData)

}


loadDataCategoryById(1000);


const video = {
    thumbnail:"",
    others:{
        price:10
    },
    shop:[
        {
            shop_name: 'Easy shop house',
             reviews: '5'
        }
    ]
}
const displayShowData = (videosData) => {


    // videos data 
    const displayData= document.getElementById("display");

    displayData.innerText ="";

    const errorSection = document.getElementById("error")
    if(videosData.length==0){
    
        errorSection.classList.remove("hidden")
    }
    videosData.forEach((video) => {
        errorSection.classList.add("hidden")
        const div=document.createElement("div");

        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
  <figure><img class="h-[300px] w-[300px]" src="${video.thumbnail}" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">${video.brand}</h2>
   <div class="flex">
   <span class="font-bold">Price:</span> <span>$${video.others.price}</span>
   </div>
   <div class="flex">
   <span class="font-bold">Owner:</span> <span>${video.shop[0].owner}</span>
   </div>
   <div class="flex">
   <span class="font-bold">Shop Name:</span> <span>${video.shop[0].shop_name}</span>
   </div>
   <div class="flex">
   <span class="font-bold">Reviews:</span> <span>${video.shop[0].reviews ?video.shop[0].reviews :"no reviews yet"}</span>
   </div>
  </div>
</div>
        `
        displayData.appendChild(div);
    })

}


const handleSort = () => {
   const updateData = sortData.sort((a,b) => {

    const reviewA= parseInt(a.shop[0].reviews) ||0;
    const reviewB= parseInt(b.shop[0].reviews) ||0;


    // ছোট থেকে বড় a -b
    // বড় থেকে ছোট b-a
    return reviewB- reviewA  ;
   }) 

  displayShowData(updateData);
}


loadAllCategories();
