const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Storing team members
const teamMembers = [];

//Initiate user input prompt to gather team makeup
getTeamInfo()

//Initial function to gather manager info and initially prompt user for additional team member type
function getTeamInfo() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your manager's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your manager's email?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your manager's office number?"
        },

    ]
    ).then(function (data) {
        //assigns role and adds user inputs to team member array
        data["role"] = "Manager";
        const manager = new Manager(data.name, data.id, data.email, data.officeNumber)
        teamMembers.push(manager);

    }).then(function () {
        //ask the user if he/she would like to add additional inputs.
        inquirer.prompt([
            {
                type: "list",
                message: "Which type of team member would you like to add?",
                name: "teamType",
                choices: [
                    "Engineer",
                    "Intern",
                    "I dont want to add any more team members"
                ]
            }
        ]).then(function (data) {
            if (data.teamType === "Engineer") {
                getEngineerInfo()

            }
            else if (data.teamType === "Intern") {
                getInternInfo()

            }
            else {
                exportTeam()
                return console.log(teamMembers)

            }
        })
    })
}

function getEngineerInfo() {
    //Prompts the user for Engineer Info
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your engineer's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your engineer's email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is your engineer's GitHub username?"
        },

    ]
    ).then(function (data) {
        //assigns role and adds user inputs to team member array
        data["role"] = "Engineer";
        const engineer = new Engineer(data.name, data.id, data.email, data.github)
        teamMembers.push(engineer);
    }).then(function () {
        inquirer.prompt([
            {
                type: "list",
                message: "Which type of team member would you like to add?",
                name: "teamType",
                choices: [
                    "Engineer",
                    "Intern",
                    "I dont want to add any more team members"
                ]
            }
        ]).then(function (data) {
            if (data.teamType === "Engineer") {
                getEngineerInfo()

            }
            else if (data.teamType === "Intern") {
                getInternInfo()

            }
            else {
                exportTeam()
                return console.log(teamMembers)


            }
        })
    })
};

function getInternInfo() {
    //prompts user for intern details
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your intern's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your intern's email?"
        },
        {
            type: "input",
            name: "school",
            message: "What is your intern's school?"
        },

    ]
    ).then(function (data) {
        //assigns role and adds user inputs to team member array
        data["role"] = "Intern";
        const intern = new Intern(data.name, data.id, data.email, data.school)
        teamMembers.push(intern);
    }).then(function () {
        inquirer.prompt([
            {
                type: "list",
                message: "Which type of team member would you like to add?",
                name: "teamType",
                choices: [
                    "Engineer",
                    "Intern",
                    "I dont want to add any more team members"
                ]
            }
        ]).then(function (data) {
            if (data.teamType === "Engineer") {
                getEngineerInfo()

            }
            else if (data.teamType === "Intern") {
                getInternInfo()

            }
            else {
                exportTeam()
                return console.log(teamMembers)

            }
        })
    })
};
//renders html file with team info
function exportTeam() {
    fs.writeFileSync(outputPath, render(teamMembers));
}
