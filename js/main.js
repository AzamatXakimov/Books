// FORM 
const elSearchForm = document.querySelector(".js-search-form");
const elSearch = elSearchForm.querySelector(".js-search");
const elSortBy = elSearchForm.querySelector(".js-sort");
const elSearchYear = elSearchForm.querySelector(".js-search-year");
const elSearchAuthor = elSearchForm.querySelector(".js-search-author");
const elSearchLanguage = elSearchForm.querySelector(".js-language");

// BOOK LIST 
const elBooksList = document.querySelector(".js-books-list");
const elBooksTemp = document.querySelector(".js-books-template").content;

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

elSearchForm.addEventListener("submit", evt => {
    evt.preventDefault();

    const SearchRegex = new RegExp(elSearch.value.trim(), "gi")

    const elSearchResut = books.filter(item => item.title.match(SearchRegex));

    if(elSearchResut.length > 0){
        renderBooks(elSearchResut, SearchRegex);
    }
    else{
        elBooksList.innerHTML = null
        const BookNotFoundText = document.createElement("h2")
        BookNotFoundText.textContent = "Not Found"
        elBooksList.appendChild(BookNotFoundText)
    }
})

// renderBooks(books.slice(0, 12))
renderBooks(books)