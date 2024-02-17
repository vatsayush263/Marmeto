
const product_title = document.querySelector(".product-title")
const price = document.querySelector(".price")
const compared_price = document.querySelector(".compared-price")
const colors = document.querySelector(".colors")
const size = document.querySelector(".sizes")
const product_desc = document.querySelector(".product-desc")
const thumbnail_image = document.querySelector(".thumbnail-image");
const product_image = document.querySelector(".product-image")
let images = "";
let mess_color = "";
let mess_size = "";
let product_name = "";


fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448")
    .then(resp => resp.json())
    .then(data => {
        product_name = data.product.title;
        product_title.innerHTML = data.product.title;
        price.innerHTML = data.product.price
        compared_price.innerHTML = data.product.compare_at_price;
        let cal_price = parseInt(data.product.price.substring(1));
        let cal_compared_price = parseInt(data.product.compare_at_price.substring(1));
        let off_val = Math.floor(((cal_compared_price - cal_price) / cal_compared_price * 100))

        document.querySelector(".percentage-off").innerHTML = `${off_val}% off`;



        data.product.options[0]?.values.map((color, index) => {
            const enteries = Object.entries(color);
            mess_color = enteries[0][0];
            const color_child = document.createElement("div");
            const colorHtml = `<label for=${"color-check" + index} id=${"" + index}>
                    <input type="radio" class="color-toggel" name="color-check" id=${"color-check" + index} value=${enteries[0][0]} checked>
                    <div class="color" id=${index.toString()} style="background: ${enteries[0][1]}">
                    <i class='bx bx-check hidden'></i>
                    </div>
                </label>`
            color_child.style.backgroundColor = enteries[0][1]
            colors.innerHTML += colorHtml;

        })

        var color_toggel = document.querySelectorAll(".color-toggel");
        for (let i = 0; i < color_toggel.length; i++) {
            color_toggel[i].onchange = (src) => {
                mess_color = src.srcElement.value;
                console.log(mess_color)
            }
        }


        data.product.options[1]?.values.map((sizes) => {
            const innertext = `<div class="size " + ${sizes + "-check-div"}>
                    <label for= ${"size-radio-" + sizes} class="size-lable">
                    <input type="radio" class="radio-check" name="size" id=${"size-radio-" + sizes}  value=${sizes} checked>
                    <span class="size-name">${sizes}</span>
                </label>
                </div>`
            size.innerHTML += innertext;
        })

        var size_toggel = document.querySelectorAll(".radio-check");
        for (let i = 0; i < size_toggel.length; i++) {
            size_toggel[i].onchange = (src) => {
                mess_size = src.srcElement.value;
            }
        }


        data.product.images.map((img, index) => {
            images = img.src;
            const imgText = `
            <label for= ${"img-radio-" + index} class="img-lable">
                    <input type="radio" name="image" checked id=${"img-radio-" + index} class="radio-img" value=${img.src}>
                    <div class="thumbnail-image2 "><img src=${img.src} alt="thumb-img" class="thum-img"></div>
                </label>`
            thumbnail_image.innerHTML += imgText;
        })

        var img_toggel = document.querySelectorAll(".radio-img");
        for (let i = 0; i < img_toggel.length; i++) {
            img_toggel[i].onchange = (src) => {
                images = src.srcElement.value;
                product_image.innerHTML = ` <img src=${images} alt="product image" class="product-image2">`
            }
        }

        product_desc.innerHTML = `<small>${data.product.description}</small>`
        product_image.innerHTML = ` <img src=${images} alt="product image" class="product-image2">`

    }
    )
    .catch(error => {
        console.log("Something went wrong" + error)
    })

document.querySelector(".dec-btn")
    .onclick = () => {
        decrement();
    }


function decrement() {
    let value = parseInt(document.querySelector(".text-input").value)
    if (value > 0) {
        value--;
    }
    document.querySelector(".text-input").value = value;
}



document.querySelector(".inc-btn")
    .onclick = () => {
        increment();
    }
function increment() {
    let value = parseInt(document.querySelector(".text-input").value)
    value++;
    document.querySelector(".text-input").value = value;
}

document.querySelector(".add-to-cart-btn")
    .onclick = () => {
        document.querySelector(".cart-add-message").innerHTML = `<p>${product_name} with color ${mess_color} and size ${mess_size} added to cart</p>`
    }
