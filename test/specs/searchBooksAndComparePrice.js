const flipkartHomePage = require('../pageobjects/flipkartHome.page');
const amazonHomePage = require('../pageobjects/amazonHome.page');
const buybooksindiaHomePage = require('../pageobjects/buybooksindiaHome.page');
const fs = require('fs');
let detail=[];






describe('User journey to search book on various online platform and fetch price :', () => {

    beforeEach('Reloading browser session to avoid stale element',function () {
        browser.reloadSession();
    });

    before('Clear output json file before test esxecution',function () {

        fs.unlink('test/outputData/detail.json',function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
       });  
    });

    function calculateBetterWebsiteToBuy(){
        if (amazonHomePage.amazonNetPrice < buybooksindiaHomePage.buyBookPrice){
            if(amazonHomePage.amazonNetPrice<flipkartHomePage.netBookPrice){
                fs.appendFile('test/outputData/detail.json',"Amazon IS BETTER",err =>{
                    if (err){
                        console.log('Error Occured While Writing', err);
                    }
                });
            }else{
                fs.appendFile('test/outputData/detail.json',"FLIPKART IS BETTER",err =>{
                    if (err){
                        console.log('Error Occured While Writing', err);
                    }
                });
            }
        }
        else
        {
            fs.appendFile('test/outputData/detail.json',"BOOKINDIA IS BETTER",err =>{
                if (err){
                    console.log('Error Occured While Writing', err);
                }
            });
            }
    
        }
   
    var listOfBookArray=[];
    var csvData = require('fs').readFileSync("test/testData/bookAndQuantity.csv", "utf8")
    csvData = csvData.split("\n")
    for (let i of csvData) 
    { 
        listOfBookArray.push(i.split(",")) 
    }

    listOfBookArray.forEach((rowOfData) => {
        let title = rowOfData[0];
        let quantity = rowOfData[1];
            it(`Search ${title} book on Buybooksindia`,  () => {
                buybooksindiaHomePage.openBuybooksindia();
                buybooksindiaHomePage.searchBookWithTitle(title);
                buybooksindiaHomePage.fetchBookPrice(quantity);
            });

            it(`Search ${title} book on Flipkart`,  () => {
                flipkartHomePage.openFlipkart();
                flipkartHomePage.searchBookWithTitle(title);
                flipkartHomePage.fetchBookPrice(quantity);
            });
               
            it(`Search ${title} book on Amazon`,  () => {
                amazonHomePage.openAmazon();
                amazonHomePage.searchBookWithTitle(title);
                amazonHomePage.fetchBookPrice(quantity);
            });

            it(`Find best website to buy`,  () => {
                calculateBetterWebsiteToBuy();

            });
        
    });

});
