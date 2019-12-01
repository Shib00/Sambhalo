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

## Tech Stack Used

Please make sure to update tests as appropriate.

## Explanation (Folder structure and Data flow diagram)
### Folder Structure 
![alt text](/images/structure?raw=true "Folder Structure")
1. helper - contains helper functions like sendEmail, sendFbEmail, sendText, tConvert (to convert time), genOTP (to generate a OTP).</li>
2. models - contains basic schemas of models used i.e. visitor, host, feedaback.</li>
3. node_modules - contains all the basic dependencies required to run app.</li>
4. public - contains all the stylesheets used</li>
5. views - contains all the ejs files that need to be rendered
   1. partials- contains the header and footer ejs files that need to be included in every document.</li></ul>
---
### Data flow diagram
![alt text](/images/dfd?raw=true "Data flow diagram")
---

## Working with the app

1. Enter your details and select your host
![](/images/homepage.gif)

2. To CheckOut you need to verify your OTP
![](/images/checkout.gif)

3. Feedback form page (fill the feedback form or press the home button)
![](/images/feedback.gif)

4. There is also an option to add new host
![](/images/newHost.gif)

### Screenshots
1. Text messages : first one is when visitor checks in and second one when visitor checks out.
![alt text](/images/text.jpeg?raw=true "Texts")

2. Emails messages : first one is when visitor checks in and second one when visitor checks out and third one is the OTP email.
![alt text](/images/mails.jpeg?raw=true "Emails")

3. Feedback Email : email recieved when visitor fills feedback form.
![alt text](/images/fb.jpeg?raw=true "Feedback" {width=40px height=400px})


## License
[MIT](https://choosealicense.com/licenses/mit/)
