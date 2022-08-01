module.exports = class Page {
   
    openAmazon() {
        return browser.url(`https://www.amazon.in/`)
    }
    openFlipkart() {
        return browser.url(`https://www.flipkart.com/`)
    }
    openBuybooksindia() {
        return browser.url(`https://www.buybooksindia.com/`)
    }
}
