#!/usr/bin/env node
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 17:16:56
 * @LastEditTime: 2019-09-07 13:43:42
 * @LastEditors: Please set LastEditors
 */
const program = require('commander');
const download = require('download-git-repo');
const handlebars = require('handlebars');
const inquirer = require('inquirer');
const fs = require('fs');//原生的
const ora = require('ora');
const chalk = require('chalk');
const logsymbos = require('log-symbols');
const shell = require('shelljs');

program.version('0.0.4');

const templates = {
    'cpp-windows': {
        url: 'https://github.com/Summuss/cmake-template',
        downloadUrl: 'https://github.com:Summuss/cmake-template#master',
        description: 'windows下的C++模板'
    },
    'cpp-linux': {
        url: 'https://github.com/Summuss/cmake-template-linux',
        downloadUrl: 'https://github.com:Summuss/cmake-template-linux#master',
        description: 'linux下的C++模板'
    },
    'vue': {
        url: 'https://github.com/Summuss/vue-template',
        downloadUrl: 'https://github.com:Summuss/vue-template',
        description: 'vue模板'
    }
}

program
    .command('list')
    .description('show all template')
    .action(() => {
        for (let key in templates) {
            console.log(chalk.green(key), ":  ", chalk.yellow(templates[key].description))
        }
    })

program
    .command('init <template> <project>]')
    .description('选择模板初始化')
    .action(function (templateName, projectName) {
        if (!(templateName in templates)) {
            console.log(logsymbos.error, chalk.red('不存在该模板\n'),
                '具体模板可用', chalk.yellow('summus-cli list'), '查看');
            return;
        }
        const download_spinner = ora('开始下载,请稍后').start()
        const { downloadUrl } = templates[templateName];
        download(downloadUrl, projectName, { clone: true }, (error) => {
            if (error) {
                download_spinner.fail();
                console.log(logsymbos.error, chalk.red('下载失败,请重新尝试'))
                return;
            }
            download_spinner.succeed()
            console.log(chalk.green('下载完成'));
            const config_spinner=ora('正在安装依赖模块...').start();
            switch (templateName) {
                case 'cpp-windows':
                    {
                        let filler = { 'projectName': projectName };
                        const cmakeLists_filePath = `${projectName}/config/CMakeLists.txt`;
                        const build_filepath = `${projectName}/config/build.bat`;
                        const cmakeLists_content = fs.readFileSync(cmakeLists_filePath, 'utf8')
                        const build_content = fs.readFileSync(build_filepath, "utf8");
                        const cmakeList_result = handlebars.compile(cmakeLists_content)(filler);
                        const build_result = handlebars.compile(build_content)(filler);
                        fs.writeFileSync(cmakeLists_filePath, cmakeList_result)
                        fs.writeFileSync(build_filepath, build_result);
                        config_spinner.succeed();
                        console.log(logsymbos.success, chalk.green('初始化成功'))
                    }
                case 'cpp-linux':
                    {
                        let filler = { 'projectName': projectName };
                        const cmakeLists_filePath = `${projectName}/config/CMakeLists.txt`;
                        const build_filepath = `${projectName}/config/build.bat`;;
                        const cmakeLists_content = fs.readFileSync(cmakeLists_filePath, 'utf8')
                        const build_content = fs.readFileSync(build_filepath, "utf8");
                        const cmakeList_result = handlebars.compile(cmakeLists_content)(filler);
                        const build_result = handlebars.compile(build_content)(filler);
                        fs.writeFileSync(cmakeLists_filePath, cmakeList_result)
                        fs.writeFileSync(build_filepath, build_result);
                        config_spinner.succeed();
                        console.log(logsymbos.success, chalk.green('初始化成功'))

                    }
                case 'vue': {
                    let filler = { 'projectName': projectName };
                    
                    const router_filepath=`${projectName}/src/config/router.js`
                    const package_filepath = `${projectName}/package.json`;
                    const vueconfig_filepath = `${projectName}/src/vue.config.js`;
                    
                    const router_content=fs.readFileSync(router_filepath,'utf8');
                    const package_content = fs.readFileSync(package_filepath, 'utf8');
                    const vueconfig_content = fs.readFileSync(vueconfig_filepath, 'utf8');

                    const router_result=handlebars.compile(router_content)(filler);
                    const package_result = handlebars.compile(package_content)(filler);
                    const vueconfig_result = handlebars.compile(vueconfig_content)(filler);

                    fs.writeFileSync(router_filepath,router_result);
                    fs.writeFileSync(package_filepath, package_result);
                    fs.writeFileSync(vueconfig_filepath, vueconfig_result);

                    shell.cd(projectName);
                    shell.exec('npm install');
                    config_spinner.succeed();
                    console.log(logsymbos.success, chalk.green('初始化成功'))

                }
            }


            // inquirer.prompt([{
            //     type: 'input',
            //     name: 'projectName',
            //     message: '输入项目名称'
            // }]).then((answers)=>{
            //     const cmakeLists_filePath=`${projectName}/config/CMakeLists.txt`;
            //     const build_filepath=`${projectName}/config/build.bat`;
            //     const cmakeLists_content= fs.readFileSync(cmakeLists_filePath,'utf8')
            //     const build_content=fs.readFileSync(build_filepath,"utf8");
            //     const cmakeList_result= handlebars.compile(cmakeLists_content)(answers);
            //     const build_result=handlebars.compile(build_content)(answers);
            //     fs.writeFileSync(cmakeLists_filePath,cmakeList_result)
            //     fs.writeFileSync(build_filepath,build_result);
            //     console.log(logsymbos.success, chalk.green('初始化成功'))
            // })
        })
    })
program.parse(process.argv)

