const Page = require('./page');

let foundFlag;
let buyBookPrice;
let singleBookPrice;
let author;
let publisher;
let bookISBN;
const fs = require('fs');


class buybooksindiaHome extends Page {

    
    get pageTitle() {
        return $('//img[@title="Buy Books India"]');
    }

    get searchbox() {
        return $('#keyword');
    }

    get findBooks() {
        return $('#find-books');
    }

    get searchBooksHeader() {
        return $('.search-title');
    }

    get bookTitle(){
        return $('//h2[@class="product-name"]');
    }

    get authorNameLable() {
        return $('//div[@id="author"]//h3');
    }

    get publisherNameLable(){
        return $('//div[@id="publisher"]//h3');
    }

    get bookprice(){
        return $('//span[@class="price"]');
    }

    get isbnLable(){
        return $('//td[text()="ISBN-13"]//following-sibling::td//h4');
    }

    get productDetailTab(){
        return $('[href="#product-detail"]');
    }

    get noResultFoundLable(){
        return $('//h2[text()="No results to show"]');
    }

    get addToCartButton(){
        return $('//a[@id="cartadd"]');
    }

    get productContainerLable(){
        return $('[class="product-container"]');
    }

    get shoppingPageTitle(){
        return $('.page-heading-title2');
    }
    get addQuntityButton(){
        return $('//button[text()="+"]');
    }

    get goToCartButton(){
        return $('.fa-shopping-cart');
    }

    get calculatedPrice(){
        return $('//td[text()="Sub Total"]//following-sibling::td');
    }

    get bookIcon(){
        return $('a[title="'+this.header+'"]');
    }


    openBuybooksindia() {
        return super.openBuybooksindia();
    }

    searchBookWithTitle(title) {
        this.header=title;
        this.searchbox.setValue(title);
        this.findBooks.click();
        this.searchBooksHeader.waitForExist();
        browser.pause(6000);
        if (this.productContainerLable.isDisplayed() && this.bookIcon.isExisting())
        {
        this.bookIcon.click();

        expect(this.bookTitle.getText()).toEqual(title);

        this.authorName = this.authorNameLable.getText();
        this.publisherName = this.publisherNameLable.getText();

        browser.waitUntil(() => (this.productDetailTab.isDisplayed()),
            {
                timeout: 5000,
                timeoutMsg: 'ProductDetail Tab is not visible'
            }
        );
        this.productDetailTab.click();
        this.bookISBN = this.isbnLable.getText();
        this.foundFlag = true ;
        }
        else
        {
            this.foundFlag = false;
            console.log(`No Book With Title ${title} Found`)
        }
    
    }
    fetchBookPrice(quantity) {
        this.buyBookPrice=0;
        if (this.foundFlag)
        {
            this.addToCartButton.click();
            browser.pause(1000)
            this.goToCartButton.click();
            expect(this.shoppingPageTitle.getText()).toEqual('SHOPPING CART SUMMARY');
            if (parseInt(quantity) <= 3){
                
                for(let i = 1 ; i<quantity; i++)
                    {
                    
                        this.addQuntityButton.click();
                        browser.pause(1000);
                    }
                this.buyBookPrice = this.calculatedPrice.getText().slice(2);
            }
            else{
                this.buyBookPrice = parseInt(this.calculatedPrice.getText().slice(2)) * parseInt(quantity)
            }

        } 

        var objBookIndia = {
    
            BookIndia :[]
        }
        objBookIndia.BookIndia.push({Book_Name:this.header,ISBN:this.bookISBN,Author:this.authorName,Publisher:this.publisherName,price:"Rs"+this.buyBookPrice, Is_available : this.foundFlag});
        var BookIndiajson = JSON.stringify(objBookIndia,null,2);
        fs.appendFile('test/outputData/detail.json',BookIndiajson+",\n",err =>{
            if (err){
                console.log('Error Occured While Writing', err);
            }
            else{
                console.log('Successfull');
            }
        });
        console.log(BookIndiajson)


    }

}

module.exports = new buybooksindiaHome();
