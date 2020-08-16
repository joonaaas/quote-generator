const quoteContainer = document.querySelector('#quote-container')
const quoteText = document.querySelector('#quote')
const authorText = document.querySelector('#author')
const twitterBtn = document.querySelector('#twitter')
const newQuoteBtn = document.querySelector('#new-quote')
const loader = document.querySelector('#loader')

const showLoadingSpinner = () => {
	loader.hidden = false
	quoteContainer.hidden = true
}

const stopLoadingSpinner = () => {
	if (!loader.hidden) {
		quoteContainer.hidden = false
		loader.hidden = true
	}
}

const getQuoteFromApi = async () => {
	// We have to use proxyUrl to make our api running
	const proxyUrl = 'https://rocky-earth-03441.herokuapp.com/'
	const apiUrl =
		'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

	try {
		showLoadingSpinner()
		const response = await fetch(proxyUrl + apiUrl)
		const data = await response.json()
		console.log(data)

		// If Author is blank, author is equal to Unknown
		data.quoteAuthor === ''
			? (authorText.textContent = 'Unknown')
			: (authorText.textContent = data.quoteAuthor)

		// Reduce font size if the quotes are long
		data.quoteText.length > 120
			? quoteText.classList.add('long-quote')
			: quoteText.classList.remove('long-quote')

		quoteText.textContent = data.quoteText

		stopLoadingSpinner()
	} catch (error) {
		getQuoteFromApi()
	}
}

// Tweet Quote
const tweetQuote = () => {
	const quote = quoteText.textContent
	const author = authorText.textContent

	// reference: https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
	window.open(twitterUrl, '_blank')
}

// Event Listener
newQuoteBtn.addEventListener('click', getQuoteFromApi)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuoteFromApi()
