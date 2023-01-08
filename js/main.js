const search = document.querySelector(".container-search");
const input = document.querySelector(".input-search");
const btn = document.querySelector(".btn");
const productsItem = document.querySelector(".best__products-list");
const linkMen = document.querySelector(".link-men");
const linkJewelery = document.querySelector(".link-jewelery");
const linkElectronics = document.querySelector(".link-electronics");
const linkWomen = document.querySelector(".link-women");
const linkAll = document.querySelector(".link-all");
const loadMore = document.querySelector(".load-more");
const korzinkaImgCount = document.querySelector(".korzinka-img-count");

let data2 = [];
function renderData(data) {
  console.log(data);
  productsItem.innerHTML = data
    .map((item) => {
      data2.push(item);
      let box;
      if (item.title.length > 30) {
        box = item.title.slice(0, 20) + "...";
      } else {
        box = item.title;
      }
      return `
    <li class="best__products-item">
    <img class="best__products-img" src="${item.image}" alt="img" />
    <h3 class="best__products-title">${box}</h3>
    <img class="best__products-rite" src="./img/rate.svg" alt="img" />
    <div class="best__products-price-box">
      <p class="best__products-price">$${item.price}</p>
      <del class="best__products-price-del">$${(
        (item.price * 100) /
        76
      ).toFixed(2)}</del>
      <p class="best__products-price-2">24% Off</p>
    </div>
    <div class="best__products-icon">
            <button class="best__product-inner-icon-1">
            <img src="./img/heart-img.svg" alt="img">
            </button>
            <button class="best__product-inner-icon-2">
              <img id="${item.id}" src="./img/korzinka-img.svg" alt="img">
            </button>
          </div>
  </li>
    `;
    })
    .join("");
}

function getData() {
  fetch("https://fakestoreapi.com/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let more = data.slice(0, 6);
      console.log(more);
      renderData(more);
      let son = 1;
      loadMore.addEventListener("click", (e) => {
        son += 1;
        if (son % 2 == 1) {
          loadMore.innerHTML = "LOAD MORE";
          renderData(more);
        } else {
          loadMore.innerHTML = "EXIT";
          renderData(data);
        }
      });
    });
}

getData();

// btn.addEventListener("click", () => {
//   search.classList.toggle("active");
//   input.focus();
// });

productsItem.addEventListener("click", (e) => {
  data2.forEach((item) => {
    if (e.target.id == item.id) {
    let arr = JSON.parse(localStorage.getItem("item")) || [];

      if (!arr.find((i) => i.id == item.id)) {
        arr.push(item);
      } else {
        alert("Avval qo'shilgan");
      }
      localStorage.setItem("item", JSON.stringify(arr));
          for (let i = 0; i < arr.length; i++) {
            korzinkaImgCount.textContent = i + 1;
          }
  
    }
  });
});

let arr = JSON.parse(localStorage.getItem("item"));
    for (let i = 0; i < arr.length; i++) {
      korzinkaImgCount.textContent = i + 1;
    }




function category() {
  fetch("https://fakestoreapi.com/products/category/men's%20clothing")
    .then((res) => res.json())
    .then((data) =>
      linkMen.addEventListener("click", (e) => {
        renderData(data);
      })
    );
}
category();

function category2() {
  fetch("https://fakestoreapi.com/products/category/jewelery")
    .then((res) => res.json())
    .then((data) =>
      linkJewelery.addEventListener("click", (e) => {
        renderData(data);
      })
    );
}

category2();

function category3() {
  fetch("https://fakestoreapi.com/products/category/electronics")
    .then((res) => res.json())
    .then((data) =>
      linkElectronics.addEventListener("click", (e) => {
        renderData(data);
      })
    );
}

category3();

function category4() {
  fetch("https://fakestoreapi.com/products/category/women's%20clothing")
    .then((res) => res.json())
    .then((data) =>
      linkWomen.addEventListener("click", (e) => {
        renderData(data);
      })
    );
}
category4();

linkAll.addEventListener("click", () => {
  getData();
});

let elSearch = document.querySelector(".search");
let elResult = document.querySelector(".result");

let elSearch2 = document.querySelector(".search-2");
let elResult2 = document.querySelector(".result-2");

elSearch.addEventListener("keyup", function (e) {
  elResult.innerHTML = null;
  let newArr = data2.filter((el) =>
    el.title.toLowerCase().includes(elSearch.value.toLowerCase())
  );
  if (newArr.length === 0) {
    elResult.textContent = "User Not Found 🔍";
  }
  newArr.forEach((element) => {
    let h4 = document.createElement("h4");
    let hr = document.createElement("hr");
    h4.textContent = element.title;
    elResult.appendChild(h4, hr);
  });
});

elSearch2.addEventListener("keyup", function (e) {
  elResult2.innerHTML = null;
  let newArr = data2.filter((el) =>
    el.title.toLowerCase().includes(elSearch2.value.toLowerCase())
  );
  if (newArr.length === 0) {
    elResult2.textContent = "User Not Found 🔍";
  }
  newArr.forEach((element) => {
    let h4 = document.createElement("h4");
    let hr = document.createElement("hr");
    h4.textContent = element.title;
    elResult2.appendChild(h4, hr);
  });
});
