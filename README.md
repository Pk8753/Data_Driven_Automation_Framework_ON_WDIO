**EV_E Read.md**

*Instruction to install and run code*

**1 : Install Node.js to run this automation.**
>   "https://nodejs.org/en/download/"

---------------------------------------------------------------
**2 : Install dependencies**

*Open project "EV_E" and 
run below command in terminal. It will download all the dependencies with are present in package.json file*

example *EV_E /> npm install*
>npm install

---------------------------------------------------------------
**3 : Run test and generate allure report**

To run all the test present in project please run below command from root folder .

example *EV_E /> npm run test*

>npm run test



To generate report once test are complete,please run below command from root folder .

example *EV_E /> npm run generate-report*
>npm run generate-report

---------------------------------------------------------------
**4 : Allure reporting tool**

Once user run the test allure result will get generated in "allure-result" folder. Which generally consist of json and xml.

To generate allure report from allure results you would need allure command line tool. Its already added in package.json as dependency and will get install as soon as you run "npm install" as mention above.

Run below command

example *EV_E /> npm install -g allure-commandline --save-dev*

>npm install -g allure-commandline --save-dev

if you encouter permission issue while running above command, change permission of node module with below command.

Change permission
>sudo chown -R $USER /usr/local/lib/node_modules


generate Report
>allure generate allure-results --clean && allure open