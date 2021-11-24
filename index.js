const searchWrapper = document.querySelector(".search_wrapper")
const inputBox = searchWrapper.querySelector("input")
const lists = searchWrapper.querySelector(".lists")

inputBox.onkeyup = (e) => {
    doSomething(getData, 3000, e.target.value)()
}

let progress = 150
let timeoutId;

function getData(value) {
    if (value !== "") {
        let searchResults = []

        searchResults = products.filter(res => {
            return res.includes(value)
        })

        searchResults = searchResults.map(data => {
            return data = '<li>' + data + '</li>'
        })
        lists.classList.add("active")

        showList(searchResults)
    } else {
        lists.classList.remove("active")
    }

    let allList = lists.querySelectorAll('li')

    for (let i = 0; i < allList.length; i++) {
        allList[i].setAttribute("onmouseover", "hover(this)")
        allList[i].setAttribute("onclick", "select(this)")
    }
}

let timeoutHandle;

function doSomething(fn, delay, ...args) {

    return function () {
        if (timeoutHandle) {
            clearTimeout(timeoutHandle);
            timeoutHandle = null;

            clearInterval(timeoutId)
            progress = 150
        }

        timeoutId = setInterval(() => {
            progress = progress - 0.5
            document.querySelector(".dbounce-bar").style.width = `${progress}px`
            if (progress === 0) {
                clearInterval(timeoutId)
            }
        }, 10);

        timeoutHandle = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

function hover(element) {
    inputBox.value = ""
    let elementValue = element.textContent;
    inputBox.value = elementValue
}

function select(element) {
    let elementValue = element.textContent;
    inputBox.value = elementValue
    lists.classList.remove("active")
}

function showList(list) {
    if (list.length > 0) {
        lists.innerHTML = list.join("")
    } else {
        let inputValue = inputBox.value
        lists.innerHTML = '<li>' + inputValue + '</li>'
    }
}