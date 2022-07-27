const Page = require('./page');
const BookIndia = require('../pageobjects/buybooksindiaHome.page')
const fs = require('fs');
let header;
let handler=[];
let authorName;
let foundFlag;
let netBookPrice=0;
let publisherName;
let bookISBN;

class flipkartHome extends Page {
    get pageTitle() {
        return $('//h2[contains(text(),"Pet")]');
    }

    get closeLoginPageButton() {
        return $('//button[text()="✕"]');
        // return $('/html/body/div[2]/div/div/button');
    }

    get searchInputBox() {
        return $('[name="q"]');
    }

    get searchButton() {
        return $('[type="submit"]');
    }

    get searchBooksHeader() {
        return $('//span[text()="'+this.header+'"]');
    }

    get bookTitleLable(){
        return $('.B_NuCI');
    }

    get bookIcon(){
        return $('//a[@title="'+this.header+'"]');
    }

    get bookprice(){
        return $('//span[@class="price"]');
    }

    get addToCartButton(){
        return $('//button[text()="Add to Cart"]');
    }

    get addQauntityButton(){
        return $('//button[text()="+"]');
    }

    get cartPagePriceDetail(){
        return $('//span[text()="Price details"]');
    }

    get calculatedPrice(){
        return $('//div[text()="Total Amount"]/parent::div//following-sibling::span//div//div//div//following-sibling::span');
    }

    get publisherLable(){
        return $('//li[contains(text(),"Publisher")]');
    }

    get authorLable(){
        return $('//div[contains(text(),"Author")]//following-sibling::div//a');
    }

    get isbnLable(){
        return $('//li[contains(text(),"ISBN")]');
    }

    

    openFlipkart() {
        return super.openFlipkart('login');
    }


    searchBookWithTitle(title) {
        this.header=title;
        
        this.closeLoginPageButton.click();
        this.searchInputBox.click();

        this.searchInputBox.setValue(title);
        this.searchButton.click();

        browser.pause(5000);
        if (this.searchBooksHeader.isDisplayed() && this.bookIcon.isDisplayed())
        {
            expect(this.searchBooksHeader).toBeDisplayed();
            this.bookIcon.click();
            browser.pause(2000);
            this.handler= browser.getWindowHandles();
            browser.switchWindow(this.header+":");
            this.publisherName = this.publisherLable.getText().slice(10);
            this.authorName= this.authorLable.getText();
            this.bookISBN = this.isbnLable.getText().slice(6);
            this.addToCartButton.click();
            this.foundFlag = true ;
        }
        else{
            this.foundFlag = false;
            console.log("Book Is Not In Stock");

        }


    }
    fetchBookPrice(quantity) {
        if (this.foundFlag)
        {
            expect(this.cartPagePriceDetail.getText()).toEqual('PRICE DETAILS');
            browser.pause(5000);
            if (parseInt(quantity) <= 3){
                for(let i = 1 ; i<quantity; i++)
                    {
                        this.addQauntityButton.click();
                        browser.pause(1000);
                    }
                this.netBookPrice = this.calculatedPrice.getText().slice(1);
                console.log(this.netBookPrice)
            }
            else{
                this.netBookPrice = parseInt(this.calculatedPrice.getText().slice(1)) * parseInt(quantity);
                console.log(this.netBookPrice);
            }
        } 

        var objFlipkart= {
    
            Flipkart :[]
        }
        objFlipkart.Flipkart.push({Book_Name:this.header,ISBN:this.bookISBN,Author:this.authorName,Publisher:this.publisherName,Price:"Rs"+this.netBookPrice, Is_available : this.foundFlag});
        const FlipkartJson = JSON.stringify(objFlipkart,null,2);
        fs.appendFile('test/outputData/detail.json',FlipkartJson+",\n",err =>{
            if (err){
                console.log('Error Occured While Writing', err);
            } 
            else{
                console.log('Successfull');
            }
        });
        console.log(FlipkartJson,"Flipkart json");

        
    }

}

module.exports = new flipkartHome();
