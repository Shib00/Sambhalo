# SAMBHALO
Sambhalo is an entry-management software catering to the requirements by Innovaccer's summergeeks program.   
Read the problem statement here: [Link](https://summergeeks.in/static/assignments/summergeeks%202020%20-%20SDE%20Assignment.pdf)


## Table of Contents

1. Setup and Installation
3. Tech Stack Used
4. Explanation
   1. Folder Structure and useful functions
   2. DFD Diagram
5. Working with the app
6. Contact Me 

## Installation
**NOTE:** These installation instructions assume that you have **nodejs**, **npm** and **mongodb** installed on your system.  
If not head over to the links below:
1. [nodejs](https://nodejs.org/en/download/)
2. [npm](https://www.npmjs.com/get-npm)
3. [mongoDB](https://docs.mongodb.com/manual/installation/)  
 
Please do make sure that these softwares are installed on your system otherwise the app wont work. Be sure to check out stack overflow if facing any errors.

Installation Steps:
1. clone or download this repository.
2. using your favourite file editor open the file called **sendEmail.js** inside the helper folder and wherever you see 'Enter email here' and 'Enter password here' just put your email id and password (dont worry it's safe :)) with which emails are to be sent. If using any other service than gmail make sure to change the 'service' from 'gmail' to whatever service you are using. [List of supported services](https://nodemailer.com/smtp/well-known/).
**Make sure that the account you use provides access to less secure sites.** 
3. now open **sendFbEmail.js** and repeat step 3.
4. open **sendText.js** and enter your twilio account-SID,authentication token and phone number wherever required.[Here's how to work with twilio](https://www.twilio.com/docs/sms/tutorials/how-to-send-sms-messages-node-js). Also this has to be noted that twilio works well with only registered phone numbers and [there are some government restrictions regarding sending text in India.](https://support.twilio.com/hc/en-us/articles/223134167-Limitations-sending-SMS-messages-to-Indian-mobile-devices).

5. open app.js and uncomment 'sendEmail' and 'sendText' and 'sendFbEmail' functions if you wish to send emails or text. These can be found :
    1. in `app.post("\")` route
    2. in `app.post("\newHost")` route
    3. in `app.post("\meeting")` route
    4. in `app.post("\verify")` route 
    5. in `app.post("\feedBack")` route 

6. **Optional**: uncomment `seedDB()` function in "app.js" which removes all existing data from the database and fills in some dummy hosts.

7. run `sudo service mongod start` or any other command you use to start the mongo server.
   1. you can check if the server is running using `sudo service mongod status`.

8. get into this directory (via terminal or your own native OS method).

9. run `npm install` (in another terminal not the mongo one) to install all the required dependencies.
   1. after this step you should see a node_modules folder if not something went wrong, check your steps.

10. run `node app.js` (while being in the same folder directory) and you should be good to go.
    1. if you see error like `Error: Cannot find module 'express'
` just do `npm install express` in the same directory(in some cases express needs to be installed locally). 

11. if everything went fine you should be able to see the website hosted at localhost:3000 :)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Tech Stack Used

Please make sure to update tests as appropriate.

## Explanation (Folder structure and Data flow diagram)
### Folder Structure 
![Alt text](/images/structure.png?raw=true "Folder Structure")

## License
[MIT](https://choosealicense.com/licenses/mit/)
