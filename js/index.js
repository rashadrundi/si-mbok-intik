const root = document.body.style;

const scroll = () => {
  const position = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
  root.setProperty('--scroll', position);
};

const results = document.querySelector(".results")

document.addEventListener('DOMContentLoaded', () => {
    showOptions("")
    scroll();
    window.addEventListener('scroll', scroll, false);
});

const aboutSection = document.querySelector('.about');
const testimonialsection = document.querySelector(".testimonial");

const parallax = (element, speed) => {
    const scrollY = window.scrollY;
    const elementOffsetTop = element.offsetTop;
    const elementPositionY = Math.max(0, (scrollY - elementOffsetTop) * speed);
    element.style.backgroundPosition = `center ${elementPositionY}px`
}

document.addEventListener('scroll', () => {
    parallax(aboutSection, 0.5);
    parallax(testimonialsection, 0.5);
});

class Option {
    constructor(name, price, image, categories) {
        this.name = name;
        this.price = price;
        this.image = "option" + image;
        this.categories = categories;
        this.qty = 0;
    }
}

let cart = [];
let qtys = [];
let sum = 0;
const sumElem = document.querySelector(".sum")

    const options = [
        new Option("Summer Dress Pink", "200.000", 1, ["Women", "L"]),
        new Option("Summer Dress Green", "200.000", 2, ["Women", "L"]),
        new Option("Summer Dress Blue", "200.000", 3, ["Women", "S"]),
        new Option("Summer Dress Red", "200.000", 4, ["Women", "M"]),
        new Option("Winter Dress Pink", "200.000", 1, ["Women", "XL"]),
        new Option("Winter Dress Blue", "200.000", 2, ["Women", "XS"]),
        new Option("Summer Batik Grey", "300.000", 5, ["Men", "L"]),
        new Option("Summer Batik Black", "300.000", 6, ["Men", "S"])
    ]

const changeQuantity = (increment, item, price) => {
    if (qtys[item-1] + increment != -1) {
        console.log(`qty${item}`)
        const qtyHolder = document.getElementById(`qty${item}`);
        const newValue = parseInt(qtyHolder.innerHTML) + increment;
        qtyHolder.innerHTML = newValue;
        qtys[item-1] += increment
        sum += price * increment
        sumElem.innerHTML = `Rp${sum}.000`
    }
}

const order = document.getElementById("checkout");
const carterror = document.querySelector(".carterror");

const rackCart = () => {
    const itemsElem = document.querySelector(".items");
    carterror.classList.remove("visible");
    itemsElem.innerHTML = '';   
    sum = 0;
    sumElem.innerHTML = `Rp0`;
    let incP = 1;

    if (cart.length > 0) {
        order.disabled=false;
    } else {
        order.disabled=true;
    }

    cart.forEach(item => {
        const curr = incP;
        const cartitemcontainer = Object.assign(document.createElement("div"), {
            className: "cartitemcontainer",
        })
        itemsElem.appendChild(cartitemcontainer)

        const cartitem = Object.assign(document.createElement("div"), {
            className: "cartitem"
        })
        cartitemcontainer.appendChild(cartitem)

        const image = Object.assign(document.createElement("img"), {
            className: "itemimg",
            src: `assets/order/${item.image}.jpeg`
        })
        cartitem.appendChild(image)

        const iteminfo = Object.assign(document.createElement("div"), {
            className: "iteminfo"
        })
        cartitem.appendChild(iteminfo)

        const itemtitle = Object.assign(document.createElement("p"), {
            className: "itemtitle",
            innerHTML: item.name
        })
        iteminfo.appendChild(itemtitle)

        const itemprice = Object.assign(document.createElement("h1"), {
            className: "itemprice",
            innerHTML: "Rp" + item.price
        })
        iteminfo.appendChild(itemprice)

        const quantity = Object.assign(document.createElement("div"), {
            className: "quantity"
        })
        iteminfo.appendChild(quantity)

        const remove = Object.assign(document.createElement("button"), {
            id: "remove",
            className: "qtybtn",
            innerHTML: "<i class='fa-solid fa-minus'></i>"
        })
        remove.addEventListener('click', () => {
            changeQuantity(-1, curr, parseInt(item.price))
        })
        quantity.appendChild(remove)

        if (qtys[incP-1] == null) {
            qtys.push(1)
        }

        const amtcontainer = Object.assign(document.createElement("div"), {
            className: "amtcontainer",
            innerHTML: `<p id="qty${incP}" class="qtytag">${qtys[incP-1]}</p>`
        })
        quantity.appendChild(amtcontainer)

        const add = Object.assign(document.createElement("button"), {
            id: "add",
            className: "qtybtn",
            innerHTML: "<i class='fa-solid fa-plus'></i>"
        })
        add.addEventListener('click', () => {
            changeQuantity(1, curr, parseInt(item.price))
        })
        quantity.appendChild(add)

        sum += parseInt(item.price) * qtys[incP-1];
        sumElem.innerHTML = `Rp${sum}.000`;

        const deleteElem = Object.assign(document.createElement("button"), {
            className: "delete",
            innerHTML: "<i class='fa-solid fa-trash'></i>"
        })
        
        cartitem.appendChild(deleteElem)

        deleteElem.addEventListener('click', e => {
            e.preventDefault();
            console.log(curr)
            console.log(cart)
            console.log(qtys)
            cart.splice(curr-1, 1);
            qtys.splice(curr-1, 1);
            console.log(cart);
            console.log(qtys)
            rackCart();
        })

        incP++;
    })
}

const showOptions = query => {
    options.forEach(option => {
        if (option.name.toLowerCase().includes(query)) {
            console.log(`Found ${option}`)
            const optiondiv = Object.assign(document.createElement("div"), {
                className: "option"
            });
            results.appendChild(optiondiv)

            const image = Object.assign(document.createElement("img"), {
                className: "optionimg",
                src: `assets/order/${option.image}.jpeg`
            }) 
            optiondiv.appendChild(image)

            const optioninfo = Object.assign(document.createElement("div"), {
                className: "optioninfo"
            })
            optiondiv.appendChild(optioninfo)

            const optionprice = Object.assign(document.createElement("h1"), {
                className: "optionprice",
                innerHTML: "Rp" + option.price
            })
            optioninfo.appendChild(optionprice)

            const optionname = Object.assign(document.createElement("p"), {
                className: "optionname",
                innerHTML: option.name
            })
            optioninfo.appendChild(optionname)

            const categories = Object.assign(document.createElement("div"), {
                className: "categories"
            })
            optioninfo.appendChild(categories)

            option.categories.forEach(category => {
                const categoryElem = Object.assign(document.createElement("div"), {
                    className: "category",
                    innerHTML: `<p>${category}</p>`
                })
                categories.appendChild(categoryElem);
            })

            const addcart = Object.assign(document.createElement("button"), {
                className: "addcart",
                innerHTML: "Add to Cart"
            })
            optiondiv.appendChild(addcart);

            addcart.addEventListener('click', () => {
                if (!cart.some(e => e.name === option.name)) {
                    cart.push(option);
                    rackCart();
                } else {
                    console.log(carterror)
                    carterror.classList.add("visible", "wow", "animate__animated", "animate__shakeX");
                }
            })
        }
    })
}
const itemlist = document.querySelector(".items");
const searchbar = document.getElementById("search")
const searchbtn = document.getElementById("searchbtn");

searchbtn.addEventListener('click', e => {
    e.preventDefault();
    results.innerHTML = '';
    const query = searchbar.value.toLowerCase();
    console.log(`Searching '${query}'`)
    showOptions(query)
})

searchbar.addEventListener('keydown', event => {
    if (event.key == "Enter") {
        results.innerHTML = '';
        const query = searchbar.value.toLowerCase();
        console.log(`Searching '${query}'`)
        showOptions(query)
    }
})

const emailForm = document.querySelector(".emailDiv")
const submitFormContainer = document.querySelector(".submitDiv")
const submitForm = document.querySelector(".submitform")

order.addEventListener('click', e => {
    e.preventDefault();
    console.log("clicked")
    submitFormContainer.style.display = "flex";
    emailForm.style.display = "block";
})

submitFormContainer.addEventListener('click', event => {
    if (submitFormContainer.style.display == 'flex' && !submitForm.contains(event.target)) {
        submitFormContainer.style.display = 'none';
        emailForm.style.display = 'none';
    }
})



jQuery(document).ready(function($) {
        		"use strict";
        		//  TESTIMONIALS CAROUSEL HOOK
		        $('#customers-testimonials').owlCarousel({
		            loop: true,
		            center: true,
		            items: 3,
		            margin: 0,
		            autoplay: true,
		            dots:true,
		            autoplayTimeout: 8500,
		            smartSpeed: 450,
		            responsive: {
		              0: {
		                items: 1
		              },
		              768: {
		                items: 2
		              },
		              1170: {
		                items: 3
		              }
		            }
		        });
        	});

function Marquee(selector, speed) {
  const parentSelector = document.querySelector(selector);
  const clone = parentSelector.innerHTML;
  const firstElement = parentSelector.children[0];
  let i = 0;
  console.log(firstElement);
  parentSelector.insertAdjacentHTML('beforeend', clone);
  parentSelector.insertAdjacentHTML('beforeend', clone);

  setInterval(function () {
    firstElement.style.marginLeft = `-${i}px`;
    if (i > firstElement.clientWidth) {
      i = 0;
    }
    i = i + speed;
  }, 0);
}

//after window is completed load
//1 class selector for marquee
//2 marquee speed 0.2
window.addEventListener('load', Marquee('.marquee', 0.2))
emailjs.init("qGpWE4cbxgZmccnV8");

document.getElementById("subButton").addEventListener("click", function() {
    let incP = 0;
    
    const list = cart.map(item => {
        const newItem = { ...item, qty: qtys[incP] };
        incP++;
        return newItem;
    })
    
    const formData = {
        person_name: document.getElementById("person_name").value,
        person_email: document.getElementById("person_email").value,
        person_number: document.getElementById("person_number").value,
        items: list,
        finalTotal: `Rp${sum}.000`
    };
    // Send form data using Email.js
    emailjs.send("service_95lafhf", "template_26519oj", formData)
        .then(function(response) {
        alert("Order terkirim!");
        
        })
        .catch(function(error) {
        alert("Failed to send message: " + error.text);
        });

    submitFormContainer.style.display = 'none';
    emailForm.style.display = 'none';
    cart = []
    qtys = []
    rackCart();

    document.getElementById("person_name").value = '';
    document.getElementById("person_email").value = '';
    document.getElementById("person_number").value = '';
});

