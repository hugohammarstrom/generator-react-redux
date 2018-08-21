const Generator = require("yeoman-generator");
const askName = require('inquirer-npm-name');
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path")


module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        this.options.path = opts.d ? opts.d : typeof args[0] === "string" ? args[0] : undefined
        this.log(
            yosay(
                `Welcome to the ${chalk.red('react-redux')} generator!`
            )
        );
        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag
    }

    prompting() {
        return askName({
                name: 'name',
                message: 'Application name',
                default: "app",
                validate: str => {
                    return str.length > ''.length;
                }
            },
            this
        ).then(props => {
            this.options.name = props.name;
        });
    }

    writing() {
        this.destinationRoot(this.options.path ? this.options.path : this.options.name)
        this.fs.copyTpl(
            this.templatePath("config"),
            this.destinationPath("config")
        );

        this.fs.copyTpl(
            this.templatePath("public/favicon.ico"),
            this.destinationPath("public/favicon.ico")
        );

        this.fs.copyTpl(
            this.templatePath("public/manifest.json"),
            this.destinationPath("public/manifest.json")
        );

        this.fs.copyTpl(
            this.templatePath("public/index.html"),
            this.destinationPath("public/index.html"), {
                name: this.options.name
            }
        );

        this.fs.copyTpl(
            this.templatePath("scripts"),
            this.destinationPath("scripts")
        );

        this.fs.copyTpl(
            this.templatePath("src"),
            this.destinationPath("src"), {
                name: this.options.name
            }
        );


        this.fs.copyTpl(
            this.templatePath("package.json"),
            this.destinationPath("package.json")
        );

        this.fs.copyTpl(
            this.templatePath("package-lock.json"),
            this.destinationPath("package-lock.json")
        );

        this.fs.copyTpl(
            this.templatePath("tsconfig.json"),
            this.destinationPath("tsconfig.json")
        );

        this.fs.copyTpl(
            this.templatePath(".babelrc"),
            this.destinationPath(".babelrc")
        );

        this.fs.copyTpl(
            this.templatePath(".gitignore"),
            this.destinationPath(".gitignore")
        );

    }

    install(){
        this.installDependencies({
            bower: false,
            npm: true
        })
    }
    end() {
        this.log("\n")
        this.log("\n")
        this.log(chalk.green(`Successfully installed ${this.options.name}`))
        this.log(chalk.green(`cd ${this.options.path ? this.options.path : this.options.name} && npm start`))
        this.log("\n")
    }
};