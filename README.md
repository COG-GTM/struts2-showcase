# struts2-showcase
* [Struts Showcase Application source code](https://archive.apache.org/dist/struts/2.3.20/) packaged in version 2.3.20
* Exploits converted to Python3 from [immunio/apache-struts2-CVE-2017-5638](https://github.com/immunio/apache-struts2-CVE-2017-5638)

> ⚠️ This is an **intentionally vulnerable** application (Struts 2.3.20, CVE-2017-5638). Do not upgrade Struts and do not expose it to untrusted networks.

## Build & run

Requires **JDK 8** and **Maven 3.6+**.

### Build the WAR
```
export JAVA_HOME=/path/to/jdk-8
mvn clean package
```
This runs the unit tests and produces `target/struts2-showcase.war`.
(The JWebUnit integration tests under `src/test/java/it/...` are excluded from the
build — see [Integration tests](#integration-tests) below.)

### Run locally with Jetty
```
mvn jetty:run
```
Serves the app at context `/struts2-showcase` on port **8080**:
* Home page: http://localhost:8080/struts2-showcase/showcase.action
* http://localhost:8080/struts2-showcase/home

### Run with Docker
```
docker build -t struts2-showcase:latest ./
docker run --name struts2-showcase -d -p 8360:8080 struts2-showcase:latest
```
Access the [WebUI](http://localhost:8360/struts2-showcase/home) (host port **8360** → container port 8080):
* Home page: http://localhost:8360/struts2-showcase/showcase.action

### Integration tests
The JWebUnit integration tests in `src/test/java/it/...` drive a **running** instance and are
excluded from the default `mvn package` build (and from CI). They currently fail against this
app because the bundled JWebUnit/HtmlUnit 1.4.x cannot parse the showcase's HTML5 pages; they
are kept for reference. To attempt a run against a live server:
```
mvn jetty:run          # in one terminal
mvn surefire:test -Dtest='it/**/*Test' -Dsurefire.failIfNoSpecifiedTests=false   # in another
```

## Continuous integration
`.github/workflows/ci.yml` builds the WAR and runs the unit tests on JDK 8 for every pull request
(and on pushes to `master`/`main`), uploading the WAR as a build artifact.

## Setup for IntelliJ
* Download IntelliJ community
* Import from VCS
* File > Project Structure > Project SDK > JDK 1.8
    * Install JDK 8 if it does not exist
* View > Maven > Toggle 'Skip Tests' Mode & Run Maven Build

## Exploit (CVE-2017-5638)
### From outside the container on Linux
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
