const Encrypter = require("./lib/encrypt");
const Decrypter = require("./lib/decrypt");
const {program} = require("commander");

program
    .name("rungkad-enc")
    .description("Program to encrypt and decrypt file within a folder");

program.command("enc")
    .description("encrypt a file or files within a folder")
    .argument("<file or folder>", "target file/folder that you want to be encrypted")
    .option('-k, --key <char>', 'set key or password for encrypter program', "panonaAlus")
    .option('-e, -extension <char>', 'set encrypter extension', ".rungkad")
    .action((str, option)=>{
        const enc = new Encrypter(fpath=str);
        const {key, Extension} = option;

        if(key) enc.setkey(key);
        if(Extension) enc.setExtension(Extension);

        enc.start()
    })

    
program.command("dec")
    .description("decrypt a file or files within a folder")
    .argument("<file or folder>", "target file/folder that you want to be decrypted")
    .option('-k, --key <char>', 'set key or password to decrypt file', "panonaAlus")
    .action((str, option)=>{
        const enc = new Decrypter(fpath=str);
        const {key} = option;

        if(key) enc.setkey(key);

        enc.start()
    })


program.parse();