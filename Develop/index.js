const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');
const inquirer = require('inquirer');

const questions = () => {
   return inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is your Github username?',
                name: 'user',
            },
            {
                type: 'input',
                message: 'What is your email?',
                name: 'email',
            },
            {
                type: 'input',
                message: 'What is the title of your project?',
                name: 'title',
            },
            {
                type: 'input',
                message: 'Please describe your project here.',
                name: 'description',
            },
            {
                type: 'list',
                message: 'Would you like to include a Table of Contents?',
                choices: ["yes", "no"],
                name: 'contents',
            },
            {
                type: 'input',
                message: 'What installations do you need for this project?',
                name: 'installation',
            },
            {
                type: 'input',
                message: "Describe to users how to use the application's functionalities.",
                name: 'usage',
            },
            {
                type: 'list',
                message: 'Choose a license.',
                choices: ["MIT", "ISC", "Apache", "Unlicensed", "None"],
                name: 'license',
            },
            {
                type: 'input',
                message:'List any contributors for the project.',
                name: 'contribution',
            },
            {
                type: 'input',
                message: 'Explain how to run any tests that you have for your project.',
                name: 'tests',
            },
        ])
        .then(input => {
            return input;
        }
        );
    }

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) throw err;
        console.log('README has been created!')
    })
}

function init() {
    questions()
        .then(input => {
            return generateMarkdown(input);
        })
        .then(markdown => {
            writeToFile('README.md', markdown);
        })
        .catch(err => {
            console.log(err);
        })
}

init();
