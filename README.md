# struts2-showcase
* [Struts Showcase Application source code](https://archive.apache.org/dist/struts/2.3.20/) packaged in version 2.3.20
* Exploits converted to Python3 from [immunio/apache-struts2-CVE-2017-5638](https://github.com/immunio/apache-struts2-CVE-2017-5638)

## Requirements
* **Java 8** (JDK 1.8) or higher
* **Apache Maven 3.x**

## Setup and Build

### Command Line
```bash
git clone https://github.com/COG-GTM/struts2-showcase.git
cd struts2-showcase
mvn clean package
```

### Setup for IntelliJ
* Download IntelliJ Community Edition
* Import from VCS
* File > Project Structure > Project SDK > JDK 1.8 
    * Install JDK 8 if it does not exist
* View > Maven > Toggle 'Skip Tests' Mode & Run Maven Build

### Running with Maven Jetty Plugin
```bash
mvn jetty:run
```
Access the application at [http://localhost:8080/struts2-showcase](http://localhost:8080/struts2-showcase)

### Dockerfile Run & Exploit
```bash
git clone https://github.com/COG-GTM/struts2-showcase.git && cd ./struts2-showcase
docker build -t struts2-showcase:latest ./
docker run --name struts2-showcase -d -p 8360:8080 struts2-showcase:latest
```

### Access to the [WebUI](http://localhost:8360/struts2-showcase/home)

### Exploit from outside the container on linux
```bash
apt update && apt install -y python3-pip
cd ./Exploits-CVE-2017-5638/
python3 ./exploit3.py 'touch pwned.txt'
python3 ./exploit3.py ls
```

### Example exploit on Windows:
```bash
python exploit3.py dir
```

## Java 8 Upgrade Notes

This project has been upgraded from Java 7 to Java 8. Key changes include:

- **Build Configuration**: Updated `maven-compiler-plugin` to target Java 8 (source/target 1.8)
- **Diamond Operator**: Replaced explicit generic type arguments with the diamond operator (`<>`)
- **Lambda Expressions**: Replaced anonymous inner classes and verbose loops with lambda expressions
- **Streams API**: Utilized `Stream` for more concise collection processing
- **`java.time` API**: Replaced `java.util.Date` with `java.time.Instant` and `DateTimeFormatter` in chat module
- **Try-with-Resources**: Applied try-with-resources for automatic resource management (InputStreams, Readers)
- **Autoboxing**: Replaced deprecated `new Long()`, `new Float()`, `new Character()` constructors with literal values and `valueOf()` methods
- **Enhanced For-Loops**: Replaced C-style indexed loops with enhanced for-each loops
- **Generics**: Added proper generic type parameters to raw types in interfaces and implementations
