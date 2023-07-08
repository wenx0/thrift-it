// creates a submit button to start the search
const createButton= document.createElement('button');
createButton.innerText= 'Find';
let butDiv = document.getElementById("search");
butDiv.appendChild(createButton);
createButton.onclick = function () {
    fetchData();
};

// calls the Real Time Product Search API
async function fetchData() {
    let input = document.getElementById("in").value;
    input = input.replace(/ /g, '%20');
    // fetch data to json
    const url = 'https://real-time-product-search.p.rapidapi.com/search?q=' + 
        input + '&country=us&language=en&product_condition=USED';
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': '[INSERT API KEY]',
		    'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com'
	    }
    };
	const response = await fetch(url, options);
	let result = await response.json();
    // parse results into list
    let str = '<div class = "links">';
    for (let i = 0; i < 30; i++) {
        const productUrl = result.data[i].offer.offer_page_url;
        const imageUrl = result.data[i].product_photos[0];
        const price = result.data[i].offer.price;
        str += '<li><p><a href="' + productUrl + '" target = "_blank"><img src="' + imageUrl + 
            '" width = "175" height = "auto"></a> <br> ' + price + '</p></li>';
    }
    str += '</div>';
    // insert results into HTML
    let link = document.querySelector('.links');
    let html = link.outerHTML;
    link.outerHTML = str;
}