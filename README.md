# React Dynamic Dashboard Backend

## Technology used

This repository uses a number libraries to work:

- [NodeJs]
- [ExpressJs]
- [Cors]
- [Mongoose]

## Live URL

### https://tier-5-backend.herokuapp.com/

## Installation and Run

You can manually install all the dependencies by yourself Or you can use the below npm command to run the application automatically for you.

## Prerequisites

### Install NodeJS

Refer to https://nodejs.org/en/ to install nodejs

After installing latest NodeJs on your system simply open command prompt and type

```bash
node -v
```

Now,

## Clone and Run the application in local

Clone the application by copying below command and paste the line on the command prompt of which directory you want to save the application

```bash
git clone https://github.com/the-shahriar/react-dynamic-dashboard-backend.git
```

Go to the project directory using this command

```bash
cd react-dynamic-dashboard-backend
```

After that install all the npm packages

```bash
npm install
```

In order to run the both application Type the following command

```bash
npm run dev
```

The application runs on **localhost:8000**

## To deploy the system on heroku

You first need an account on Heroku;

Refer to https://signup.heroku.com/login/

After creating an acount open the command prompt from your project directory and paste the following command as like the screenshot,

![App Screenshot](https://drive.google.com/file/d/1K0dmwepKV7EHKY4V5In1hww2wrnclpSd/view?usp=sharing)

```bash
heroku login
```

After run this command you see the following page;
![App Screenshot](https://drive.google.com/file/d/1hLpmAH2Z9zBtlvNFDuJ0cQHXb-VcnlGX/view?usp=sharing)

Then you need to create a app on heroku just pasting the following command,

![App Screenshot](https://drive.google.com/file/d/1ylb0AzhMAv0U9dR9wyYLnni28yhFEIOn/view?usp=sharing)

```bash
heroku create -a example-app
```

After that paste the command and your system will be ready and you will see a link after all the process finish.

![App Screenshot](https://drive.google.com/file/d/1I2Id0tHa6HQNpMwpw1J2bkEPmY2GJJNM/view?usp=sharing)

```bash
git push heroku main
```

### Note: If you have any variable that is stored in .env, you need to put this variables in heroku project setting name reveal config vars--

![App Screenshot](https://drive.google.com/file/d/1j-IlawdkbWgS-q0S4XhL2uopR6PDmLus/view?usp=sharing)

**Thank You**
