#!/usr/bin/env node
'use strict';
const program = require('commander');
const { prompt } = require('inquirer');
const aws = require('./aws-commands');
const figlet = require('figlet');
const chalk = require('chalk');

// questions formatted with inquirer
// Config User Question
const configUserQ = require('./lassie-configure');

// Lambda Function Question
const createLFQs = require('./lassie-createLambda');

// Lamda Delete Function
const deleteLambda = require('./lassie-deleteLambda');

//DB related questions
const dbQ = require('./lassie-createDb'); 

// Modify Lambda Function: Questions and Code?
const modLambQuestions = require('./lassie-modLambQuest');
const modLambFunc = require('./lassie-modLambFunc');

console.log(chalk.cyanBright(figlet.textSync('Lassie', {
  font: 'Train',
  horizontalLayout: 'fitted',
  verticalLayout: 'fitted'
})));

program
  .version('0.0.1')
  .command('command', 'command description');

// CLI Command to list linked accounts with AWS
program
  .command('configure')
  .description('Configures account access to AWS')
  .action(() => {
    prompt(configUserQ).then((answers) => {
      console.log('my inputs are : ', answers);

      aws.configUser(answers);
      // aws.configureUserKey(answers);
      // aws.configureDefaultRegion(answers);

      return;
    });
  });

// CLI Command to list linked accounts with AWS
program
  .command('la')
  .description('Checking AWS listed linked accounts')
  .action(() => {
    return aws.listAccounts();
  });

// CLI Command to list user accounts with AWS
program
  .command('user')
  .description('Checking AWS listed user accounts')
  .action(() => {
    return aws.listUsers();
  });

// CLI Command to create an AWS Lamdbda Function
program
  .command('createLambda')
  .description('Creates a Lambda function')
  .action(() => {
    prompt(createLFQs).then((answers) => {
      return aws.createLF(answers);
    });
  });

// CLI command to list all current Lambda functions
program
  .command('listLambdas')
  .description('Lists all current Lambda functions')
  .action(() => {
    return aws.listLambdas();
  });

program
  .command('deleteLambda')
  .description('Deletes a Lambda function')
  .action(() => {
    prompt(deleteLambda).then((answer) => {
      return aws.deleteLambda(answer);
    })
    //return listLambda;
  })

program
  .command('createDb')
  .description('Creates a database for our metrics to write into')
  // .option('--global', 'creates a global table')
  .action(() => {
    prompt(dbQ.createDBQ).then((answer) => {
      return aws.createDB(answer);
    })
  })
  // .on('--global', () => {
    
  // })

program
  .command('addWrapper')
  .description('Add monitoring code to existing lambda function')
  .action(() => {
    prompt(modLambQuestions).then((answer) => {
      modLambFunc(answer);
    });
  });

program.parse(process.argv);
