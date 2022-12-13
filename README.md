  # Rungkad-enc
 FIle Encryptor and Decryptor based on [this website](https://brandonstilson.com/encrypting-files-with-node/)

### How To Use
#### Pre-use
before you use this program, you need to install a package called [commander](https://www.npmjs.com/package/commander)
```bash
npm install
```
#### Help for more on `how to use`
```bash
node index.js --help
```
result:
```
Usage: rungkad-enc [options] [command]

Program to encrypt and decrypt file within a folder

Options:
  -h, --help                      display help for command

Commands:
  enc [options] <file or folder>  encrypt a file or files within a folder
  dec [options] <file or folder>  decrypt a file or files within a folder
  help [command]                  display help for command
```

#### detail enc command

```bash
node index.js --help enc
```
```
Usage: rungkad-enc enc [options] <file or folder>

encrypt a file or files within a folder

Arguments:
  file or folder         target file/folder that you want to be encrypted

Options:
  -k, --key <char>       set key or password for encrypter program (default: "panonaAlus")
  -e, -extension <char>  set encrypter extension (default: ".rungkad")
  -h, --help             display help for command
```

##### how to use `enc`
```bash
node index.js enc -k key123 -e haha ./detailku-sija/
```
result:

```
[ok] encryption success: About_lt.jsx
[ok] encryption success: About_map.jsx
[ok] encryption success: About_grade.jsx
[ok] encryption success: AuthModal.jsx
[ok] encryption success: index
[ok] encryption success: CertModal.jsx
[ok] encryption success: About_Teacher.jsx
[ok] encryption success: PrivateMessage.jsx
```
#### detail dec command

```bash
node index.js --help dec
```
```
Usage: rungkad-enc [options] [command]

Program to encrypt and decrypt file within a folder

Options:
  -h, --help                      display help for command

Commands:
  enc [options] <file or folder>  encrypt a file or files within a folder
  dec [options] <file or folder>  decrypt a file or files within a folder
  help [command]                  display help for command
```

##### how to use `dec`

```
node index.js dec -k key123 ./detailku-sija/
```

result:
```
[ok] decryption success:  About_lt.jsx.haha
[ok] decryption success:  AuthModal.jsx.haha
[ok] decryption success:  About_map.jsx.haha
[ok] decryption success:  CertModal.jsx.haha
[ok] decryption success:  ProjectModal.jsx.haha
[ok] decryption success:  PrivateMessage.jsx.haha
```
