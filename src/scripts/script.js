import { serviceList } from "./cardServices.js";
import { createServiceModal } from "./modal.js";

let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function () {
  nextImage();
}, 4000);

function nextImage() {
  count++;
  if (count > 4) {
    count = 1;
  }
  document.getElementById("radio" + count).checked = true;
}

function createServiceCard(service) {
  const liCard = document.createElement("li");
  const title = document.createElement("h3");
  const img = document.createElement("img");
  const paragraph = document.createElement("p");
  const price = document.createElement("strong");

  title.innerText = service.title;
  img.src = service.img;
  img.alt = "imagem de " + service.title;
  paragraph.innerText = service.description;

  const arredondado = Math.round(service.price * 100) / 100;

  const formatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(arredondado);

  price.innerText = `Preço ${formatado}`;

  liCard.append(title, img, paragraph, price);

  liCard.addEventListener("click", function (event) {
    createServiceModal(service);
  });

  return liCard;
}

function renderServices(serviceList) {
  const section = document.querySelector("#ourServices");

  const uniqueCategories = [...new Set(serviceList.map((service) => service.category))];
  for (let i = 0; i < uniqueCategories.length; i++) {
    const categoryFiltered = serviceList.filter((service) => service.category === uniqueCategories[i]);

    const divServices = document.createElement("div");
    divServices.classList.add("ourServicesDiv");
    section.appendChild(divServices);

    const categoryTitle = document.createElement("h2");
    categoryTitle.classList.add("titleCaregory");
    categoryTitle.innerText = uniqueCategories[i];

    const ulServices = document.createElement("ul");
    ulServices.classList.add("ourServicesList");

    divServices.append(categoryTitle, ulServices);

    for (let service of categoryFiltered) {
      const cardService = createServiceCard(service);
      ulServices.appendChild(cardService);
    }
  }
}

function burgerMenu() {
  const burgerMenu = document.querySelector(".menu");

  const menu = document.querySelector(".nav_menu");
  burgerMenu.addEventListener("click", function (event) {
    if (menu.classList.contains("show_menu")) {
      menu.classList.remove("show_menu");
      menu.classList.remove("menu_final_position");
    } else {
      menu.classList.add("show_menu");
      setTimeout(() => {
        menu.classList.add("menu_final_position");
      }, 490);
    }
  });
}

renderServices(serviceList);
burgerMenu();
