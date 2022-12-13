const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');


class Decrypter {
    constructor(fPath=process.cwd(), key="panonaAlus"){
        this.fPath = fPath;
        this.key = this.setkey(key);
    }
    setPath(newPath){
        return this.fPath = newPath;
    }
    setkey(newKey){
        return this.key = crypto.createHash('sha256').update(newKey).digest();
    }

    decryptFile(file){
        const readInitVect = fs.createReadStream(file, {end : 15});
        let initVect;

        readInitVect.on("data", (chunk) => {
            initVect = chunk;
        })

        readInitVect.on("close", () => {
            const readStream = fs.createReadStream(file, { start: 16 });

            const decipher = crypto.createDecipheriv('aes256', this.key, initVect);
            const unzip = zlib.createUnzip();
            const writeStream = fs.createWriteStream(path.join(path.parse(file).dir, path.parse(file).name));

            readStream
            .pipe(decipher)
            .pipe(unzip)
            .on('error', (err) => {
                console.log("your secret key might be wrong");
                process.exit(1)
            })
            .pipe(writeStream);

            writeStream.on("finish", ()=>{
                fs.unlink(file, ()=> {
                    console.log(`[ok] decryption success:  ${path.basename(file)}`)
                })
            })

        })
    }

    start(currentPath=this.fPath){
        
        const whiteList = ['index.js', 'node_modules'];
        let files;
        try{
            files = fs.statSync(this.fPath);
        }catch(e){
            console.log(`[x] : ${this.fPath} not found`);
            process.exit(1);
        }

        if(files.isFile()){
            this.decryptFile(this.fPath);
        } else {
            const allPaths = fs.readdirSync(currentPath).filter((v) => whiteList.indexOf(v) === -1);
            
            allPaths.forEach((file) => {
                const oldPath = path.join(currentPath, file);
                const item = fs.statSync(oldPath);
                if(item.isDirectory()){
                    return this.start(oldPath)
                }
                this.decryptFile(oldPath)
            })
        }
    }
}

module.exports = Decrypter;