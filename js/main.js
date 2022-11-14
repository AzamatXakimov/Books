// FORM 
const elSearchForm = document.querySelector(".js-search-form");
const elSearch = elSearchForm.querySelector(".js-search");
const elSortBy = elSearchForm.querySelector(".js-sort");
const elSearchYear = elSearchForm.querySelector(".js-search-year");
const elSearchAuthor = elSearchForm.querySelector(".js-search-author");
const elSearchAuthorDatalist = elSearchForm.querySelector(".js-author-datalist");
const elSearchLanguage = elSearchForm.querySelector(".js-language");

// BOOK LIST 
const elBooksList = document.querySelector(".js-books-list");
const elBooksTemp = document.querySelector(".js-books-template").content;

// AUTHORS 
const authors = [];
books.forEach(item => {
    if(!authors.includes(item.author)){
        authors.push(item.author);
    }
});
authors.sort((a,b) => a.toLowerCase().charCodeAt(0) - b.toLowerCase().charCodeAt(0));

// LANGUAGE 
const languages = [];
books.forEach(item => {
    if(!languages.includes(item.language)){
        languages.push(item.language);
    }
});
languages.sort((a,b) => a.toLowerCase().charCodeAt(0) - b.toLowerCase().charCodeAt(0));


function renderBooks(arrBooks, regex = ""){
    elBooksList.innerHTML = null;

    const BooksFrag = new DocumentFragment();
    arrBooks.forEach(item => {
        const elBooksTemoClone = elBooksTemp.cloneNode(true);

        elBooksTemoClone.querySelector(".js-book-img").src = item.imageLink;
        elBooksTemoClone.querySelector(".js-book-img").alt = item.title + " image";
        if(regex.source != "(?:)" && regex){
            elBooksTemoClone.querySelector(".js-book-title").innerHTML =item.title.replace(regex, 
                `<mark class="bg-warning">${regex.source.toLowerCase()}</mark>`
            );
        }
        else{
            elBooksTemoClone.querySelector(".js-book-title").textContent = item.title;
        }
        elBooksTemoClone.querySelector(".js-book-author").textContent = item.author;
        elBooksTemoClone.querySelector(".js-book-year").textContent = item.year;
        elBooksTemoClone.querySelector(".js-book-page").textContent = item.pages;
        elBooksTemoClone.querySelector(".js-book-language").textContent = item.language;
        elBooksTemoClone.querySelector(".js-book-wiki").href = item.link;

        BooksFrag.appendChild(elBooksTemoClone)
    });
    elBooksList.appendChild(BooksFrag)
}

function renderOption(arr, node){
    const elOptionFrag = new DocumentFragment()
    arr.forEach(item => {
        const elOption = document.createElement("option");
        elOption.value = item;
        elOption.textContent = item;
        elOptionFrag.appendChild(elOption);
    })

    node.appendChild(elOptionFrag);
}

function sortBy(arr, sortType){
    if(sortType == "a-z"){
        arr.sort((a,b) => a.title.toLowerCase().charCodeAt(0) - b.title.toLowerCase().charCodeAt(0));
    }
    if(sortType == "z-a"){
        arr.sort((a,b) => b.title.toLowerCase().charCodeAt(0) - a.title.toLowerCase().charCodeAt(0));
    }

    if(sortType == "new-old"){
        // arr.sort((a,b) => Math.abs(b.year) - Math.abs(a.year));
        arr.sort((a,b) => b.year - a.year);
    }
    if(sortType == "old-new"){
        // arr.sort((a,b) => Math.abs(a.year) - Math.abs(b.year));
        arr.sort((a,b) => a.year - b.year);
    }

    if(sortType == "many-pages"){
        arr.sort((a,b) => b.pages - a.pages);
    }
    if(sortType == "less-pages"){
        arr.sort((a,b) => a.pages - b.pages);
    }
}

elSearchForm.addEventListener("submit", evt => {
    evt.preventDefault();

    const SearchRegex = new RegExp(elSearch.value.trim(), "gi")

    const elSearchResut = books.filter(item => item.title.match(SearchRegex) && (item.year >= Number(elSearchYear.value) || elSearchYear.value == "") && (item.author == elSearchAuthor.value || elSearchAuthor.value == "") && (item.language == elSearchLanguage.value || elSearchLanguage.value == ""));

    if(elSearchResut.length > 0){
        sortBy(elSearchResut, elSortBy.value)
        renderBooks(elSearchResut, SearchRegex);
    }
    else{
        elBooksList.innerHTML = null
        const BookNotFoundText = document.createElement("h2")
        BookNotFoundText.textContent = "Not Found"
        elBooksList.appendChild(BookNotFoundText)
    }
})

renderOption(authors, elSearchAuthorDatalist)
renderOption(languages, elSearchLanguage)
// renderBooks(books.slice(0, 12))
renderBooks(books)