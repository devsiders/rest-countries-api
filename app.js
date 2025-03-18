document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

const country = document.querySelector('.countries');
const input = document.querySelector('#search');
const select = document.querySelector('.form-select');
const detail = document.querySelector('.country');

const query = new URLSearchParams(window.location.search);
const params = query.get('name');

let api = [];

const fetchData = async () => {
    try {
        let data = localStorage.getItem("countriesData");

        if (data) {
            api = JSON.parse(data);
        }else{
            const res = await fetch('data.json');
            api = await res.json();
            localStorage.setItem("countriesData", JSON.stringify(api));
        }
        

        if (country) card(api);
        if (input) form(api);

        if (params) {
            const filterData = api.filter(item => item.name === params);
            if (filterData.length > 0) {
                search(filterData);
            }
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
};

const card = api => {
    if (!country) return;

    let content = '';
    api.forEach(item => {
        content += `
            <div class="col">
                <a href="page.html?name=${item.name}" class="text-decoration-none cursor-pointer">
                    <article class="card shadow-sm border-0 h-100">
                        <img src="${item.flag}" class="card-img-top" alt="${item.name}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title mb-3">${item.name}</h5>
                            <p class="mb-1 fs-6"><strong>Population:</strong> ${item.population ? item.population.toLocaleString('en-US') : 'N/A'}</p>
                            <p class="mb-1 fs-6"><strong>Region:</strong> ${item.region}</p>
                            <p class="fs-6"><strong>Capital:</strong> ${item.capital}</p>
                        </div>
                    </article>
                </a>
            </div>
        `;
    });

    country.innerHTML = content;
};

const form = api => {
    if (!input) return;

    input.addEventListener('keyup', () => {
        const searchText = input.value.toLowerCase();
        const filte = api.filter(item => item.name.toLowerCase().includes(searchText));
        card(filte);
    });

    input.addEventListener('search', () => {
        if (input.value === '') {
            card(api);
        }
    });
};

if (select) {
    select.addEventListener("change", (e) => {
        const option = e.target.value;
        const filte = option ? api.filter(item => item.region === option) : api;
        card(filte);
    });
}

const search = api => {
    if (!detail) return;

    let content = '';
    api.forEach(item => {
        content += `
            <div class="col-12 col-lg-5 col-md-5">
                <img src="${item.flag}" class="img-fluid" alt="${item.name}" loading="lazy">
            </div>
            <div class="col-12 col-lg-7 col-md-7">
                <h2 class="fs-4 fw-bold mb-4">${item.name}</h2>
                <div class="row">
                    <div class="col-12 col-lg-6 col-md-6">
                        <p class="mb-2"><strong>Native Name:</strong> ${item.nativeName}</p>
                        <p class="mb-2"><strong>Population:</strong> ${item.population ? item.population.toLocaleString('en-US') : ''}</p>
                        <p class="mb-2"><strong>Region:</strong> ${item.region}</p>
                        <p class="mb-2"><strong>Sub Region:</strong> ${item.subregion}</p>
                        <p><strong>Capital:</strong> ${item.capital}</p>
                    </div>
                    <div class="col-12 col-lg-6 col-md-6">
                        <p class="mb-2"><strong>Top Level Domain:</strong> ${item.topLevelDomain}</p>
                        <p class="mb-2"><strong>Currencies:</strong> ${item.currencies ? Object.values(item.currencies).map(c => c.name).join(', ') : ''}</p>
                        <p><strong>Languages:</strong> ${item.languages ? item.languages.map(lang => lang.name).join(', ') : ''}</p>
                    </div>
                </div>
                <div>
                    <div class="row mt-4 mt-lg-4">
                        <div class="col-12 col-lg-3 col-md-5">
                            <p><strong>Border Countries:</strong></p>
                        </div>
                        <div class="col-12 col-lg-6 col-md-10">
                            ${item.borders ? item.borders.map(border => `<span class="badge pt-2 pb-2 pe-3 ps-3 me-1 mb-1 shadow-sm">${border}</span>`).join(' ') : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    detail.innerHTML = content;
};
