const program = require('commander');
const prompt = require('inquirer');
const exec = require('child_process');
const inquirer = require('inquirer');
const chalk = require('chalk');

const createDBQ = [
    {
        type : 'input',
        name : 'tableName',
        default: 'LassieLogs',
        message : chalk.greenBright('Enter name of table name for Lassie logs to be written in')
        
    }
]

module.exports = {
  'createDBQ': createDBQ
  };