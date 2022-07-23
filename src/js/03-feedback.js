import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = "feedback-form-state";

initForm();

form.addEventListener('input', throttle(collectData, 500));

function collectData(evt) {
    let persistedData = localStorage.getItem(LOCALSTORAGE_KEY);
    persistedData = persistedData ? JSON.parse(persistedData) : {};
    persistedData[evt.target.name] = evt.target.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(persistedData));
};

form.addEventListener('submit', evt => {
    evt.preventDefault();
    console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
    localStorage.removeItem(LOCALSTORAGE_KEY);
    form.reset();
});

function initForm() {
    let persistedData = localStorage.getItem(LOCALSTORAGE_KEY);
    if (persistedData) {
        persistedData = JSON.parse(persistedData);
        Object.entries(persistedData).forEach(([name, value]) => {
            form.elements[name].value = value;
        });
    };
};
