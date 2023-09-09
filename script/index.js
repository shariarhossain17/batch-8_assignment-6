const loadAllCategories = async () => {
    const res = await fetch("http://localhost:8800/dress/categories");
    const data = await res.json();
    const allCategories = data.data;

    const categoryContainer = document.getElementById("category-container");
    allCategories.forEach((category) => {
        const div = document.createElement("div");
        const categoryId = category.category_id; // Store the category_id in a variable
        div.innerHTML = `
            <a onclick="loadCategoriesDataById(${categoryId})" class="btn bg-gray-300 hover:bg-[#FF1F3D] text-black hover:text-white border-0 md:px-6 px-5 rounded capitalize text-base">${category.category}</a>
        `;
        categoryContainer.appendChild(div);
    });
};

let allVideos;

const loadCategoriesDataById = async (id) => {
    const res = await fetch(`http://localhost:8800/dress/categories/${id}`);
    const data = await res.json();
     allVideos = data.data;
    showDisplayData(allVideos);
};

loadCategoriesDataById(1000)

const showDisplayData = (data) => {
    const videoContainer = document.getElementById("video-container");
    const errorPage = document.getElementById("error-page");

    // for remove the data
    videoContainer.innerText="";
    if (data.length == 0) {

        errorPage.classList.remove("hidden")
    } else {

        errorPage.classList.add("hidden")
        data.forEach((video) => {

            const div = document.createElement("div");

            div.innerHTML = `
            <div class="card w-96 bg-base-100 shadow-xl px-4 py-2 rounded-lg">
             <figure><img class="w-[300px] h-[300px]" src="${video.thumbnail}" alt="Shoes" /></figure>
           <div class="card-body">
            <h2 class="card-title">${video.brand}</h2>
            <h2>$${video.others.price}</h2>
            <p>Shop owner: ${video.shop[0].owner}</p>
            <p>Shop Name: ${video.shop[0].shop_name}</p>
            <p>Reviews: ${video.shop[0].reviews ?video.shop[0].reviews:"no reviews yet"}</p>
        
        </div>
        </div>
           </div>
            `;

            videoContainer.appendChild(div)
        });
    }
};

const sortAllData = () => {
    const sortData = allVideos.sort((a, b) => {
        const reviewsA = parseInt(a.shop[0].reviews) || 0;
        const reviewsB = parseInt(b.shop[0].reviews) || 0;

        console.log('reviewsA:', reviewsA);
        console.log('reviewsB:', reviewsB);

        return reviewsB - reviewsA;
    });

    showDisplayData(sortData)
}




loadAllCategories();
