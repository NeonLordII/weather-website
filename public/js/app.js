console.log('Client side JavaScript loaded!');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#one');
const messageTwo = document.querySelector('#two');

// messageOne.textContent = 'Hii';

weatherForm.addEventListener('submit', (em) => {
    EMSGSIZE.preventDefault();

    const location = search.value;

    console.log(location);

    messageOne.style.color = '#FFC107';
    messageOne.textContent = 'Loading, Please wait';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then(response => {
    
        response.json().then(data => {
            if(data.error) {
                messageOne.style.color = '#F44336';
                messageOne.textContent = data.error;
                return;
            }

            messageOne.style.color = '';
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast
            
        });
    });
});
