module.exports = class Page {
   
    openAmazon(path) {
        return browser.url(`https://www.amazon.in/`)
    }
    openFlipkart(path) {
        return browser.url(`https://www.flipkart.com/`)
    }
    openBuybooksindia() {
        return browser.url(`https://www.buybooksindia.com/`)
    }
}
