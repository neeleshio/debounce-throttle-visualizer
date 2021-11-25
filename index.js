const searchWrapper = document.querySelector(".search_wrapper")
const inputBox = searchWrapper.querySelector("input")
const searchBtn = document.querySelector(".search-btn")
const lists = searchWrapper.querySelector(".lists")

inputBox.onkeyup = (e) => {
    debounce(getData, 3000, e.target.value)()
}

searchBtn.onclick = (e) => {
    throttle(handleSearch, 3000)()
}

let timeoutHandle;
let progress = 150
let throttleProgress = 150
let timeoutId;
let intervalId;

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

function handleSearch() {
    document.querySelector(".snackbar").classList.add("snackbar-enabled")
    setTimeout(() => {
        document.querySelector(".snackbar").classList.remove("snackbar-enabled")
    }, 500);
}

function debounce(fn, delay, ...args) {

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

let flag = true;

function throttle(fn, delay) {
    return function () {
        if (flag) {
            throttleProgress = 150
            fn();

            intervalId = setInterval(() => {
                throttleProgress = throttleProgress - 0.5
                document.querySelector(".throttle-bar").style.width = `${throttleProgress}px`
                if (throttleProgress === 0) {
                    clearInterval(intervalId)
                }
            }, 10);

            flag = false
            setTimeout(() => {
                flag = true
            }, delay);
        }
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