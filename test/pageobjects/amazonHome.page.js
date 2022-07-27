const Page = require('./page');

let header;
let handler=[];
let authorName;
let amazonNetPrice=0;
let foundFlag;
let publisherName;
let bookISBN=0;
const fs = require('fs');

class amazonHome extends Page {

    get pageTitleLable() {
        return $('//img[@title="Buy Books India"]');
    }

    get searchboxInputField() {
        return $('#twotabsearchtextbox');
    }

    get searchButton() {
        return $('#nav-search-submit-button');
    }

    get searchBooksHeaderLable() {
        return $('.a-color-state');
    }

    get bookTitleLable(){
        return $('//span[@id="productTitle"]');
    }

    get bookpriceLable(){
        return $('//span[@class="price"]');
    }

    get paperbackButton(){
        return $('//a[@class="a-button-text"]//span[contains(text(),"Paperback")]');
    }

    get bookPriceLable(){
        return $('//a[@class="a-button-text"]//span[text()="Paperback"]//following-sibling::span')
    }

    get quantityDropdown(){
        return $('[id="quantity"]');
    }

    get addToCartButton(){
        return $('#add-to-cart-button');
    }

    get totalPrice(){
        return $('.sw-subtotal-amount');
    }

    get signleBookPrice(){
        return $('#price');
    }

    get bookIcon(){
        return $('//span[text()="'+this.header+'"]');
    }

    get authorNameLable(){
        return $('//span[text()="'+this.header+'"]/parent::a/parent::h2//following-sibling::div//div//a');
    }

    get publisherNameLable(){
        return $('//span[@class="rpi-icon book_details-publisher"]/parent::div//following-sibling::div//span');
    }

    get isbnNumberLable(){
        return $('//span[contains(text(),"ISBN-13")]//following-sibling::span');
    }

   

    openAmazon() {
        return super.openAmazon('login');
    }


    searchBookWithTitle(title) {
        this.header=title;
        this.searchboxInputField.setValue(title);
        this.searchButton.click();
        
        this.searchBooksHeaderLable.waitForExist();
        expect(this.searchBooksHeaderLable).toBeDisplayed();
        this.authorName = this.authorNameLable.getText();
        this.handler = this.authorName.split(' ')
        // this.authorNameLable.getText();
        if(this.bookIcon.isDisplayed()){
        this.bookIcon.click();

        browser.switchWindow(this.handler[0]);
        expect(this.bookTitleLable.getText()).toEqual(title);
        this.foundFlag=true;
        }
        else{
            this.foundFlag=true;
            console.log("Book Is Not In Stock")
        }


    }

    fetchBookPrice(quantity) {
        this.paperbackButton.click();
        if(this.quantityDropdown.isDisplayed() && this.foundFlag)  //if dropdown is not present in amazon
            {
                this.quantityDropdown.selectByVisibleText(quantity);
                this.publisherName = this.publisherNameLable.getText();
                this.bookISBN = this.isbnNumberLable.getText();
                this.addToCartButton.click();
                this.amazonNetPrice = this.totalPrice.getText().slice(1,-3);
                parseInt(this.amazonNetPrice,quantity);
            }
        else{
                this.amazonNetPrice = parseInt(this.signleBookPrice.getText().slice(1))* parseInt(quantity);
            }

        var objAmazon = {
    
            Amazon :[]
        }
        objAmazon.Amazon.push({Book_Name:this.header,ISBN:this.bookISBN,Author:this.authorName,Publisher:this.publisherName,price:"Rs"+this.amazonNetPrice, Is_available : this.foundFlag});
        var AmzonJson = JSON.stringify(objAmazon,null,2);
        fs.appendFile('test/outputData/detail.json',AmzonJson+",\n",err =>{
            if (err){
                console.log('Error Occured While Writing', err);
            }
            else{
                console.log('Successfull');
            }
        });
        console.log(AmzonJson);


    }

}

module.exports = new amazonHome();
