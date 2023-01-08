const search = document.querySelector(".container-search");
const input = document.querySelector(".input-search");
const btn = document.querySelector(".btn");
const korzinkaProducts = document.querySelector(".korzinka__products");
const korzinkaProductsItem = document.querySelector(".korzinka__products-item");
// let productsPrice = document.querySelector(".products-price");

// btn.addEventListener("click", () => {
//   search.classList.toggle("active");
//   input.focus();
// });

let count = 1;
let b;

function getRender() {
  let getItemData = JSON.parse(localStorage.getItem("item"));
  korzinkaProducts.innerHTML = getItemData
    .map((item) => {
      let a = item;
      b = a;
      let box;
      if (item.title.length > 30) {
        box = item.title.slice(0, 30) + "...";
      } else {
        box = item.title;
      }

      return `
<li class="korzinka__products-item">
<img class="del" src="./img/del-img.svg" alt="img">
<img class="products-img" src="${item.image}" alt="img">
<h4 class="korzinka__products-title">${box}</h4>
<p class="korzinka__products-price">$${((item.price * 100) / 76).toFixed(2)}</p>
<div class="korzinka__prd">
  <button class="products-minus">-</button><p class="products-price" id="products">${count}</p><button class="products-plus">+</button>
</div>
<p class="korzinka__products-price-2">$${item.price}</p>
<hr class="korzinka__hr">
</li>
`;
    })
    .join("");
}

korzinkaProducts.addEventListener("click", (e) => {
  if (e.target.classList == "products-minus") {
    count -= 1;
  } else if (e.target.classList == "products-plus") {
    count += 1;
  }

  getRender();
});
getRender();

korzinkaProducts.addEventListener("click", (e) => {
  if (e.target.classList == "del") {
    localStorage.removeItem("item");
  }
});
