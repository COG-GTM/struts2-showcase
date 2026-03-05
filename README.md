# struts2-showcase
* [Struts Showcase Application](https://struts.apache.org/) upgraded to Struts 6.8.0 with Java 21
* Originally based on Struts 2.3.20 showcase — migrated to Java 21
* Exploits converted to Python3 from [immunio/apache-struts2-CVE-2017-5638](https://github.com/immunio/apache-struts2-CVE-2017-5638)

## Requirements
* **Java 21** (JDK 21 or later)
* **Maven 3.9+**
* **Docker** (optional, for containerized deployment)

## Setup for IntelliJ
* Download IntelliJ Community
* Import from VCS
* File > Project Structure > Project SDK > JDK 21
    * Install JDK 21 if it does not exist
* View > Maven > Toggle 'Skip Tests' Mode & Run Maven Build

## Build
```bash
mvn clean package
```

### Dockerfile Run
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

## Migration Notes (Java 8 → 21)
* Upgraded from Struts 2.3.20 to Struts 6.8.0
* Added explicit Java 21 compiler configuration (`maven-compiler-plugin` 3.13.0)
* Removed parent POM (`struts2-apps:2.3.20`), made standalone project with Struts BOM
* Updated web.xml: Servlet 4.0 schema, Struts 6.x filter classes (`dispatcher.filter.*` instead of `dispatcher.ng.filter.*`)
* Removed deprecated plugins: struts2-struts1-plugin, struts2-dojo-plugin, struts2-jsf-plugin
* Removed associated integration and JSF showcase code
* Updated Docker image from `tomcat:8.5-jdk8` to multi-stage build with `maven:3.9-eclipse-temurin-21` / `tomcat:10.1-jdk21-temurin`
* Upgraded logging from Log4j 1.x to Log4j 2.x
* Upgraded Spring Framework to 5.3.x
* Replaced removed `com.opensymphony.xwork2.util.logging` with Log4j2 API
* Updated `ActionContext.SESSION` access to use `getSession()` method
* Updated Struts XML DTD references from 2.3 to 6.0
