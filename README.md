# struts2-showcase
* [Struts Showcase Application source code](https://archive.apache.org/dist/struts/2.3.20/) packaged in version 2.3.20
* Exploits converted to Python3 from [immunio/apache-struts2-CVE-2017-5638](https://github.com/immunio/apache-struts2-CVE-2017-5638)

## Prerequisites
* **Java 8 (JDK 1.8)** or later is required to build and run this project.
* **Apache Maven 3.x** is required for building.

## Setup and Build

### Command Line
```bash
# Clone the repository
git clone https://github.com/COG-GTM/struts2-showcase.git
cd struts2-showcase

# Build the project
mvn clean package

# Run tests
mvn test

# Run the application using Jetty
mvn jetty:run
# Access the app at http://localhost:8080/struts2-showcase
```

### Setup for IntelliJ
* Download IntelliJ Community Edition
* Import from VCS
* File > Project Structure > Project SDK > JDK 1.8
    * Install JDK 8 if it does not exist
* View > Maven > Toggle 'Skip Tests' Mode & Run Maven Build

## Java 8 Upgrade Notes
This project has been upgraded from Java 7 to Java 8. Key changes include:
* **Build configuration**: `maven-compiler-plugin` configured for source/target 1.8
* **Lambda expressions and method references**: Used in place of anonymous inner classes and verbose iterator patterns
* **Streams API**: Applied for collection processing (e.g., filtering, mapping, collecting)
* **Diamond operator (`<>`)**: Used to reduce generic type verbosity
* **Try-with-resources**: Applied for automatic resource management of streams and readers
* **`Map.computeIfAbsent()`**: Used for cleaner map initialization patterns
* **Removal of deprecated constructors**: Replaced `new Long()`, `new Float()`, `new Character()` with literals and autoboxing

### Dockerfile Run & exploit
```
git clone https://github.com/samqbush/struts2-showcase.git && cd ./struts2-showcase
docker build -t struts2-showcase:latest ./
docker run --name struts2-showcase -d -p 8360:8080 struts2-showcase:latest
```
### Access to the [WebUI](http://localhost:8360/struts2-showcase/home)

### Exploit from outside the container on linux
```
apt update && apt install -y python3-pip
cd ./Exploits-CVE-2017-5638/
python3 ./exploit3.py 'touch pwned.txt'
python3 ./exploit3.py ls
```

### Example exploit on Windows:
```
python exploit3.py dir
```
